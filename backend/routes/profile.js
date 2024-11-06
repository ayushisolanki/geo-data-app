const authenticate = require('./middleware/auth');
router.get('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;  // Get user ID from JWT payload
    const user = await knex('users').where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});