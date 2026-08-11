const AIRules = {

    canUseAI(user) {

        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };
        }

        if (user.status !== "active") {
            return {
                allowed: false,
                code: "ACCOUNT_INACTIVE"
            };
        }

        return {
            allowed: true
        };
    },

    canGenerateContent(user) {

        if (!this.canUseAI(user).allowed)
            return this.canUseAI(user);

        return {
            allowed: true
        };
    },

    canUseAIChat(user) {

        if (!this.canUseAI(user).allowed)
            return this.canUseAI(user);

        return {
            allowed: true
        };
    },

    canUseRecommendations(user) {

        if (!this.canUseAI(user).allowed)
            return this.canUseAI(user);

        return {
            allowed: true
        };
    },

    canModerateContent(user) {

        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };
        }

        if (!["admin", "superadmin"].includes(user.role)) {
            return {
                allowed: false,
                code: "INSUFFICIENT_ROLE"
            };
        }

        return {
            allowed: true
        };
    },

    canTrainModels(user) {

        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };
        }

        if (user.role !== "superadmin") {
            return {
                allowed: false,
                code: "SUPERADMIN_ONLY"
            };
        }

        return {
            allowed: true
        };
    },

    canAccessAIAnalytics(user) {

        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };
        }

        if (!["admin", "superadmin"].includes(user.role)) {
            return {
                allowed: false,
                code: "INSUFFICIENT_ROLE"
            };
        }

        return {
            allowed: true
        };
    }

};

module.exports = AIRules;