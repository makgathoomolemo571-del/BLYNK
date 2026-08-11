const StorageRules = {

    canUpload(user) {
        if (!user) return false;

         return {
            allowed: true,
            code: "OK"
        };
    },

    canDelete(user, file) {
        if (!user || !file) return false;

        if (user.role === "admin" || user.role === "superadmin")
            return true;

        return String(file.owner) === String(user._id);
    },

    canDownload(user, file) {
        if (!user || !file) return false;

        if (user.role === "admin" || user.role === "superadmin")
            return true;

        return (
            String(file.owner) === String(user._id) ||
            file.visibility === "public"
        );
    },

    canMove(user, file) {
        if (!user || !file) return false;

        if (user.role === "admin" || user.role === "superadmin")
            return true;

        return String(file.owner) === String(user._id);
    },

    canRename(user, file) {
        if (!user || !file) return false;

        if (user.role === "admin" || user.role === "superadmin")
            return true;

        return String(file.owner) === String(user._id);
    },

    maxStorage(user) {

        switch (user.subscription) {

            case "FREE_MEMBER":
                return 1024;

            case "MEMBER_BASIC":
                return 5 * 1024;

            case "MEMBER_PLUS":
                return 20 * 1024;

            case "CREATOR_BASIC":
                return 50 * 1024;

            case "CREATOR_PLUS":
                return 100 * 1024;

            case "CREATOR_PRO":
                return 500 * 1024;

            case "BUSINESS_BASIC":
                return 250 * 1024;

            case "BUSINESS_PRO":
                return 1024 * 1024;

            case "BUSINESS_ENTERPRISE":
                return Infinity;

            default:
                return 1024;
        }

    }

};

module.exports = StorageRules;