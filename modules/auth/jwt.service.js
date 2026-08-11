// modules/auth/jwt.service.js

const jwt = require("jsonwebtoken");

class JWTService {

    generateAccessToken(user) {

        return jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES || "1d"
            }
        );

    }

    generateRefreshToken(user) {

        return jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn:
                    process.env.JWT_REFRESH_EXPIRES || "30d"
            }
        );

    }

    verifyAccessToken(token) {

        return jwt.verify(
            token,
            process.env.JWT_SECRET
        );

    }

    verifyRefreshToken(token) {

        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

    }

}

module.exports = new JWTService();