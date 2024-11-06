const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const knexConfig = require('../knexfile');  // Adjust the path if necessary
const knex = require('knex')(knexConfig.development);// Adjust path based on where knex is configured
const router = express.Router();

//TODO: move to .env
const JWT_SECRET = '7c78e86954ad92e8ea3d910435a13655c4ae525b55c18ec3a63395101811beb819585322e8dd017a2380ec215866a2d7c803fc23228d2d739978c57e7b5b81a6'; // Store this in a secure location (e.g., env variable)

// Register Route
router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  console.log("checkpoint 1")
  if (!errors.isEmpty()) {
    console.log("ERRORRR")
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("checkpoint 2")
  const { username, email, password } = req.body;

  console.log("checkpoint 3")
  try {
    // Check if user exists
    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    console.log("checkpoint 4")
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("checkpoint 5")
    // Insert new user
    console.log({ username, email, password: hashedPassword })
    await knex('users').insert({ username, email, password: hashedPassword });
    console.log("checkpoint 6")
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log("checkpoint 7", error)
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user
    const user = await knex('users').where({ email }).first();
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

