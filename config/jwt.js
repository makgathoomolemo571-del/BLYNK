const jwt = require("jsonwebtoken");

// ACCESS TOKEN
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

// REFRESH TOKEN
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// VERIFY TOKEN
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};