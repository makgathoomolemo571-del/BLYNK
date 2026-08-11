const Profile = require("../modules/profile/profile.model");

const PrivacyRules = {

async canAccess(user, req) {

    if (!user) {

        return {
            allowed: false,
            message: "Not authenticated"
        };

    }


    const profileId =
        req.params?.id ||
        req.params?.userId;


    // No profile target = not a profile request
    // Allow advertisements, marketplace, etc.
    if (!profileId) {

        return {
            allowed: true,
            code: "NO_PROFILE_TARGET"
        };

    }


    const targetProfile =
        await Profile.findOne({
            user: profileId
        }).populate("user");


    if (!targetProfile) {

        return {
            allowed: false,
            message: "Profile not found"
        };

    }


    if (
        targetProfile.visibility === "public"
    ) {

        return {
            allowed:true
        };

    }


    if (
        String(user._id) === String(profileId)
    ) {

        return {
            allowed:true
        };

    }


    return {
        allowed:true,
        message:"public profile"
    };

},

    canViewProfile(viewer, owner) {

        if (!viewer || !owner) {
            return false;
        }

        if (
            viewer.role === "admin" ||
            viewer.role === "superadmin"
        ) {
            return true;
        }

        return (
            String(viewer._id) ===
            String(owner._id)
        );

    },

    canEditProfile(user, owner) {

        if (!user || !owner) {
            return false;
        }

        if (
            user.role === "admin" ||
            user.role === "superadmin"
        ) {
            return true;
        }

        return (
            String(user._id) ===
            String(owner._id)
        );

    },

    canViewEmail(user, owner) {

        if (!user || !owner) {
            return false;
        }

        return (
            user.role === "admin" ||
            String(user._id) ===
            String(owner._id)
        );

    },

    canViewPhone(user, owner) {

        if (!user || !owner) {
            return false;
        }

        return (
            user.role === "admin" ||
            String(user._id) ===
            String(owner._id)
        );

    },

    canViewLocation(user, owner) {

        if (!user || !owner) {
            return false;
        }

        return (
            String(user._id) ===
            String(owner._id)
        );

    },

    canDownloadPersonalData(user) {

        if (!user) {
            return false;
        }

        return true;

    },

    canDeletePersonalData(user) {

        if (!user) {
            return false;
        }

        return (
            user.status === "active"
        );

    },

    canUseMarketing(user) {

        if (!user) {
            return false;
        }

        return (
            user.marketingConsent === true
        );

    }

};

module.exports = PrivacyRules;