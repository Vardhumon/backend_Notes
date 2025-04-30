const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || authHeader === 'Bearer null') {
      return res.status(401).json({ message: 'Please login to access this resource' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(401).json({ message: 'Session expired. Please login again.' });
  }
};