// rules/auth/01-auth.rules.js
const { loginValidator, registerValidator } = require("../modules/auth/auth.validator");

const AuthRules = {

    async validateRegister(data) {

        const { error } = registerValidator.validate(data);

        if (error) {
            throw new Error(error.details[0].message);
        }

        return true;
    },

    async validateLogin(data) {

        const { error } = loginValidator.validate(data);

        if (error) {
            throw new Error(error.details[0].message);
        }

        return true;
    },

    canRegister() {
        return { allowed: true };
    },

    canLogin(user) {

        if (!user)
            return {
                allowed: false,
                code: "USER_NOT_FOUND"
            };

        if (user.deletedAt)
            return {
                allowed: false,
                code: "ACCOUNT_DELETED"
            };

        if (user.status === "BANNED")
            return {
                allowed: false,
                code: "ACCOUNT_BANNED"
            };

        if (user.status === "SUSPENDED")
            return {
                allowed: false,
                code: "ACCOUNT_SUSPENDED"
            };

        if (user.status === "LOCKED")
            return {
                allowed: false,
                code: "ACCOUNT_LOCKED"
            };

        if (!user.emailVerified)
            return {
                allowed: false,
                code: "EMAIL_NOT_VERIFIED"
            };

        return {
            allowed: true
        };

    },

    canAccessApp(user) {

        if (!user)
            return false;

        return (
            user.status === "ACTIVE" &&
            user.emailVerified === true
        );

    },

    canResetPassword(user) {

        if (!user)
            return false;

        if (user.status !== "ACTIVE")
            return false;

        return true;

    },

    canChangeEmail(user) {

        if (!user)
            return false;

        return user.status === "ACTIVE";

    },

    canDeleteAccount(user) {

        if (!user)
            return false;

        if (user.status === "BANNED")
            return false;

        return true;

    }

};

module.exports = AuthRules;