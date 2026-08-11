const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../user/user.model");
const RefreshToken = require("../auth/refreshToken.model");

class AdminAuthService {

  async login(email, password) {

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    if (user.isDeleted) {
      throw new Error("Account has been deleted");
    }

    if (user.status === "banned") {
      throw new Error("Account has been banned");
    }

    if (user.status === "suspended") {
      throw new Error("Account has been suspended");
    }

    if (
      user.role !== "admin" &&
      user.role !== "superadmin"
    ) {
      throw new Error("Admin access denied");
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d"
      }
    );

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      )
    });

    return {

      success: true,

      accessToken,

      refreshToken,

      user: {

        _id: user._id,

        username: user.username,

        firstName: user.firstName,

        lastName: user.lastName,

        displayName: user.displayName,

        email: user.email,

        role: user.role,

        permissions: user.permissions

      }

    };

  }

  async me(userId) {

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    if (
      user.role !== "admin" &&
      user.role !== "superadmin"
    ) {
      throw new Error("Access denied");
    }

    return user;

  }

  async logout(refreshToken) {

    await RefreshToken.deleteOne({
      token: refreshToken
    });

    return {
      success: true,
      message: "Logged out successfully"
    };

  }

}

module.exports = new AdminAuthService();