const VerificationRules = {

    canAccess(user) {

        if (!user) {
            return {
                allowed: false,
                code: "USER_NOT_FOUND"
            };
        }

        // Temporary bypass for development
        if (process.env.REQUIRE_EMAIL_VERIFICATION === "false") {
            return {
                allowed: true
            };
        }

        if (!user.emailVerified) {
            return {
                allowed: false,
                code: "EMAIL_NOT_VERIFIED"
            };
        }

        return {
            allowed: true
        };
    }

};

module.exports = VerificationRules;