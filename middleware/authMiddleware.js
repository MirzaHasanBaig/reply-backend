const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Invalid token format");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjFkMDEzZmEwOTU5OWNmNzBmOTYxNCIsImlhdCI6MTczOTcyOTg2MCwiZXhwIjoxNzM5NzI5ODYwfQ.KPghQJc3STgdWM6eFUgM7DCbVIFtcA6CUCDUdqz9Pw4
module.exports = authMiddleware;
