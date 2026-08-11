const UserDTO = require("./user.dto");

const toUserDTO = (user) =>
  UserDTO({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    verified: user.verified,
    status: user.status,
    createdAt: user.createdAt
  });

module.exports = {
  toUserDTO
};