// modules/auth/token.service.js

const crypto = require("crypto");

const EmailVerification = require("./emailVerification.model");
const PasswordReset = require("./passwordReset.model");

class TokenService {

    /**
     * Generate secure random token
     */
    generate(length = 32) {

        return crypto
            .randomBytes(length)
            .toString("hex");

    }

    /**
     * Generate numeric OTP
     */
    generateOTP(length = 6) {

        let otp = "";

        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10);
        }

        return otp;

    }

    /**
     * Generate expiry date
     */
    expires(minutes = 30) {

        return new Date(
            Date.now() + minutes * 60 * 1000
        );

    }

    /**
     * Create email verification token
     */
    async createEmailVerificationToken(userId) {

        await EmailVerification.deleteMany({
            userId
        });

        const token = this.generate(32);

        await EmailVerification.create({

            userId,

            token,

            expiresAt: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            )

        });

        return token;

    }

    /**
     * Create password reset token
     */
    async createPasswordResetToken(userId) {

        await PasswordReset.deleteMany({
            userId
        });

        const token = this.generate(32);

        await PasswordReset.create({

            userId,

            token,

            expiresAt: new Date(
                Date.now() + 60 * 60 * 1000
            )

        });

        return token;

    }

}

module.exports = new TokenService();