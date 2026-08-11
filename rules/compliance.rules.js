const Compliance = {

    validate(user, req) {

        if (!user) {

            return {
                allowed:false,
                code:"NOT_AUTHENTICATED"
            };

        }


        if (user.acceptTerms !== true) {

            return {
                allowed:false,
                code:"TERMS_NOT_ACCEPTED"
            };

        }


        if (user.acceptPrivacy !== true) {

            return {
                allowed:false,
                code:"PRIVACY_NOT_ACCEPTED"
            };

        }


        return {
            allowed:true,
            code:"OK"
        };

    },

    canAcceptTerms(user) {

        return !!user;

    },

    canAcceptPrivacy(user) {

        return !!user;

    },

    canAccessPersonalData(user, targetUser) {

        if (!user)
            return false;

        if (["admin", "superadmin"].includes(user.role))
            return true;

        return String(user._id) === String(targetUser._id);

    },

    canExportPersonalData(user) {

        if (!user)
            return false;

        return user.emailVerified === true;

    },

    canDeletePersonalData(user) {

        if (!user)
            return false;

        if (user.status !== "active")
            return false;

        return true;

    },

    canViewAuditLogs(user) {

        if (!user)
            return false;

        return ["admin", "superadmin"].includes(user.role);

    },

    canProcessPayments(user) {

        if (!user)
            return false;

        if (!user.emailVerified)
            return false;

        return user.status === "active";

    },

    canStoreMedia(user) {

        if (!user)
            return false;

        return user.status === "active";

    },

    canShareUserData(user) {

        return ["admin", "superadmin"].includes(user.role);

    },

    canReceiveMarketing(user) {

        return user?.marketingConsent === true;

    }

};

module.exports = Compliance;