const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {

  console.log("HEADERS:", req.headers);
console.log("AUTH:", req.headers.authorization);

  const header = req.headers.authorization;

  if (!header) {
    console.log("USER:", req.user);
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1]; // Bearer token

  console.log("TOKEN:", token);

  try {
    console.log("JWT SECRET:", process.env.JWT_SECRET);
    console.log("VERIFY SECRET:", process.env.JWT_SECRET);
    console.log("AUTH HEADER:", req.headers.authorization);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded.userId,
      userId: decoded.userId,
      role: decoded.role,
      token: token,
    };

    console.log("DECODED USER:", req.user);
    console.log("DECODED:", decoded);

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};