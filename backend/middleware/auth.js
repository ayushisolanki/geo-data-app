const jwt = require('jsonwebtoken');

// JWT secret key, ideally stored in .env
const JWT_SECRET = '7c78e86954ad92e8ea3d910435a13655c4ae525b55c18ec3a63395101811beb819585322e8dd017a2380ec215866a2d7c803fc23228d2d739978c57e7b5b81a6';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach decoded user info to the request object
    next();  // Pass the request to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
