const bcrypt = require("bcryptjs");

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;

const SPECIAL_CHARACTERS =
/[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/;

const UPPERCASE = /[A-Z]/;
const LOWERCASE = /[a-z]/;
const NUMBER = /[0-9]/;

const COMMON_PASSWORDS = [
    "password",
    "password123",
    "12345678",
    "123456789",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
    "iloveyou",
    "abc123"
];

class PasswordRules {

    static validate(password, user = {}) {

        const errors = [];

        if (!password) {
            errors.push("Password is required.");
            return {
                valid: false,
                errors
            };
        }

        if (password.length < MIN_LENGTH) {
            errors.push(`Password must be at least ${MIN_LENGTH} characters.`);
        }

        if (password.length > MAX_LENGTH) {
            errors.push(`Password cannot exceed ${MAX_LENGTH} characters.`);
        }

        if (!UPPERCASE.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }

        if (!LOWERCASE.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }

        if (!NUMBER.test(password)) {
            errors.push("Password must contain at least one number.");
        }

        if (!SPECIAL_CHARACTERS.test(password)) {
            errors.push("Password must contain at least one special character.");
        }

        if (
            user.username &&
            password.toLowerCase().includes(user.username.toLowerCase())
        ) {
            errors.push("Password cannot contain your username.");
        }

        if (
            user.email &&
            password.toLowerCase().includes(user.email.toLowerCase())
        ) {
            errors.push("Password cannot contain your email.");
        }

        if (
            COMMON_PASSWORDS.includes(password.toLowerCase())
        ) {
            errors.push("Password is too common.");
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    static async hash(password) {
        return bcrypt.hash(password, 12);
    }

    static async compare(password, hash) {
        return bcrypt.compare(password, hash);
    }

    static generateRandom(length = 16) {

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

        let password = "";

        for (let i = 0; i < length; i++) {
            password += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );
        }

        return password;
    }

}

module.exports = PasswordRules;