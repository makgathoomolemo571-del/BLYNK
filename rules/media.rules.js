const MediaRules = {

  canUpload(user) {

        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };
        }

        return {
            allowed: true,
            code: "OK"
        };

    },


    canUploadImage(user) {

        if (!user) return false;

        return user.status === "active";

    },

    canUploadVideo(user) {

        if (!user) return false;

        return user.status === "active";

    },

    canUploadAudio(user) {

        if (!user) return false;

        return user.status === "active";

    },

    canDeleteMedia(user, media) {

        if (!user || !media) return false;

        if (
            user.role === "admin" ||
            user.role === "superadmin"
        )
            return true;

        return String(media.owner) === String(user._id);

    },

    canEditMedia(user, media) {

        if (!user || !media) return false;

        if (
            user.role === "admin" ||
            user.role === "superadmin"
        )
            return true;

        return String(media.owner) === String(user._id);

    },

    maxImageSize(user) {

        switch (user.subscription) {

            case "FREE_MEMBER":
                return 10;

            case "MEMBER_BASIC":
                return 20;

            case "MEMBER_PLUS":
                return 30;

            case "CREATOR_BASIC":
                return 50;

            case "CREATOR_PLUS":
                return 100;

            case "CREATOR_PRO":
                return 250;

            case "BUSINESS_BASIC":
                return 100;

            case "BUSINESS_PRO":
                return 250;

            case "BUSINESS_ENTERPRISE":
                return 500;

            default:
                return 10;

        }

    },

    maxVideoSize(user) {

        switch (user.subscription) {

            case "FREE_MEMBER":
                return 100;

            case "MEMBER_BASIC":
                return 250;

            case "MEMBER_PLUS":
                return 500;

            case "CREATOR_BASIC":
                return 1024;

            case "CREATOR_PLUS":
                return 5 * 1024;

            case "CREATOR_PRO":
                return 10 * 1024;

            case "BUSINESS_BASIC":
                return 5 * 1024;

            case "BUSINESS_PRO":
                return 20 * 1024;

            case "BUSINESS_ENTERPRISE":
                return 50 * 1024;

            default:
                return 100;

        }

    },

    maxDuration(user) {

        switch (user.subscription) {

            case "FREE_MEMBER":
                return 60;

            case "MEMBER_BASIC":
                return 180;

            case "MEMBER_PLUS":
                return 300;

            case "CREATOR_BASIC":
                return 1800;

            case "CREATOR_PLUS":
                return 3600;

            case "CREATOR_PRO":
                return 10800;

            case "BUSINESS_BASIC":
                return 3600;

            case "BUSINESS_PRO":
                return 10800;

            case "BUSINESS_ENTERPRISE":
                return Infinity;

            default:
                return 60;

        }

    },
    validate(file) {
    if (!file) {
        return {
            allowed: false,
            message: "No file uploaded"
        };
    }

    const mime = file.mimetype || "";

    if (
        mime.startsWith("image/") ||
        mime.startsWith("video/") ||
        mime.startsWith("audio/") ||
        mime === "application/pdf"
    ) {
        return {
            allowed: true,
            code: "OK"
        };
    }

    return {
        allowed: false,
        message: "Unsupported media type"
    };
}

};

module.exports = MediaRules;