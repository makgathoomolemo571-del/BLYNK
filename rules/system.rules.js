// rules/30-system.rules.js

const SystemRules = {

    isMaintenanceMode(system) {

        return system?.maintenance === true;

    },

    canAccessPlatform(user, system) {

        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };
        }

        if (system?.maintenance !== true) {
            return {
                allowed: true
            };
        }

        if (["admin", "superadmin"].includes(user.role)) {
            return {
                allowed: true
            };
        }

        return {
            allowed: false,
            code: "SYSTEM_MAINTENANCE"
        };

    },

    canRegister(system) {

        if (system?.registrationDisabled) {
            return {
                allowed: false,
                code: "REGISTRATION_DISABLED"
            };
        }

        return {
            allowed: true
        };

    },

    canLogin(system) {

        if (system?.loginDisabled) {
            return {
                allowed: false,
                code: "LOGIN_DISABLED"
            };
        }

        return {
            allowed: true
        };

    },

    canCreateContent(system) {

        if (system?.readOnlyMode) {
            return {
                allowed: false,
                code: "READ_ONLY_MODE"
            };
        }

        return {
            allowed: true
        };

    },

    canUploadMedia(system) {

        if (system?.uploadsDisabled) {
            return {
                allowed: false,
                code: "UPLOADS_DISABLED"
            };
        }

        return {
            allowed: true
        };

    },

    canProcessPayments(system) {

        if (system?.paymentsDisabled) {
            return {
                allowed: false,
                code: "PAYMENTS_DISABLED"
            };
        }

        return {
            allowed: true
        };

    },

    canCreateEvents(system) {

        if (system?.eventsDisabled) {
            return {
                allowed: false,
                code: "EVENTS_DISABLED"
            };
        }

        return {
            allowed: true
        };

    },

    canUseMarketplace(system) {

        if (system?.marketplaceDisabled) {
            return {
                allowed: false,
                code: "MARKETPLACE_DISABLED"
            };
        }

        return {
            allowed: true
        };

    },

    canSendMessages(system) {

        if (system?.messagingDisabled) {
            return {
                allowed: false,
                code: "MESSAGING_DISABLED"
            };
        }

        return {
            allowed: true
        };

    }

};

module.exports = SystemRules;