const User = require("./user.model");
const mapper = require("./user.mapper");


exports.list = async () => {

  const users = await User.find({});

  return users.map(u => mapper.toDTO(u));

};

const createUser = async (data) => {
  return User.create(data);
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUsers = async () => {
  return User.find({
    isDeleted: false
  });
};
const stats = async () => {

  const total = await User.countDocuments();

  const creators = await User.countDocuments({ role: "creator" });

  const businesses = await User.countDocuments({ role: "business" });

  const admins = await User.countDocuments({ role: "admin" });

  return {
    total,
    creators,
    businesses,
    admins
  };

};

const suspend = async (id) => {

    const user = await User.findById(id);

    if (!user)
        throw new Error("User not found");

    user.status = "suspended";

    await user.save();

    return {
        success: true,
        message: "User suspended"
    };

};

const unsuspend = async (id) => {

    const user = await User.findById(id);

    if (!user)
        throw new Error("User not found");

    user.status = "active";

    await user.save();

    return {
        success: true,
        message: "User restored"
    };

};


const changeRole = async (
  userId,
  role
) => {

  const user = await User.findById(userId);

  if (!user)
    throw new Error("User not found");

  user.role = role;

  await user.save();

  return user;

};

module.exports = {

  createUser,
  getUserById,
  getUsers,
  stats,
  suspend,
  unsuspend,
  changeRole
};