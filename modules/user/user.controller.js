const userService = require("./user.service");
const { toUserDTO } = require("./user.mapper");

exports.createUser = async (req, res) => {
  try {

    const user =
      await userService.createUser(
        req.body,
      );

    res.status(201).json(
      toUserDTO(user)
    );

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.getUser = async (req, res) => {
  try {

    const user =
      await userService.getUserById(
        req.params.id
      );

    res.json(
      toUserDTO(user)
    );

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.getUsers = async (req, res) => {
  try {

    const users =
      await userService.getUsers();

    res.json(
      users.map(toUserDTO)
    );

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};