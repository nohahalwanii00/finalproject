const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  
  const authHeader = req.header('Authorization');

  let token = authHeader;
  if (token) {
    token = token.replace(/Bearer\s+/gi, '');
    
    if (token.startsWith('"') || token.startsWith("'")) {
      token = token.slice(1, -1);
    }
    
    token = token.trim();
  }
 
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
   
    res.status(401).json({ message: 'Token is not valid', error: err.message });
  }
};

module.exports = authMiddleware;