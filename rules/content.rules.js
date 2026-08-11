// rules/content.rules.js

const ContentRules = {

canAccess(user) {
        if (!user) {
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED",
                message: "Please login first."
            };
        }

        if (user.isDeleted) {
            return {
                allowed: false,
                code: "ACCOUNT_DELETED",
                message: "Account has been deleted."
            };
        }

        if (user.status !== "active") {
            return {
                allowed: false,
                code: "ACCOUNT_INACTIVE",
                message: "Account is inactive."
            };
        }

        return {
            allowed: true,
            code: "OK"
        };
    },


    /**
     * Can user create content?
     */
    canCreate(user) {

    if (!user) {
        return {
            allowed: false,
            code: "NOT_AUTHENTICATED"
        };
    }

    if (!user.emailVerified) {
        return {
            allowed: false,
            code: "EMAIL_NOT_VERIFIED"
        };
    }

    if (user.accountStatus !== "ACTIVE") {
        return {
            allowed: false,
            code: "ACCOUNT_NOT_ACTIVE"
        };
    }

    return {
        allowed: true
    };
},

canView(user) {

    if (!user) {
        return {
            allowed: false,
            code: "NOT_AUTHENTICATED"
        };
    }

    return {
        allowed: true
    };
},

    /**
     * Can user edit this content?
     */
    canEdit(user, content) {
        if (!user || !content) return false;

        if (user.role === "SUPER_ADMIN") return true;

        return String(content.owner) === String(user._id);
    },

    /**
     * Can user delete content?
     */
    canDelete(user, content) {
        if (!user || !content) return false;

        if (["SUPER_ADMIN", "ADMIN"].includes(user.role))
            return true;

        return String(content.owner) === String(user._id);
    },

    /**
     * Can comment?
     */
    canComment(user) {
        if (!user) return false;

        return (
            user.accountStatus === "ACTIVE" &&
            user.emailVerified
        );
    },

    /**
     * Can like?
     */
    canLike(user) {
        if (!user) return false;

        return (
            user.accountStatus === "ACTIVE" &&
            user.emailVerified
        );
    },

    /**
     * Can share?
     */
    canShare(user) {
        if (!user) return false;

        return (
            user.accountStatus === "ACTIVE" &&
            user.emailVerified
        );
    },

    /**
     * Can upload image?
     */
    canUploadImage(user) {
        if (!this.canCreate(user))
            return false;

        return true;
    },

    /**
     * Can upload video?
     */
    canUploadVideo(user) {
        if (!this.canCreate(user))
            return false;

        return true;
    },

    /**
     * Can livestream?
     */
    canLivestream(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.subscription?.status === "ACTIVE"
        );
    },

    /**
     * Can create podcast?
     */
    canCreatePodcast(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.accountType === "CREATOR" ||
            user.accountType === "BUSINESS"
        );
    },

    /**
     * Can create article?
     */
    canCreateArticle(user) {
        return this.canCreate(user);
    },

    /**
     * Can report content?
     */
    canReport(user) {
        if (!user) return false;

        return user.accountStatus === "ACTIVE";
    },

    /**
     * Can pin post?
     */
    canPinPost(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.subscription?.status === "ACTIVE"
        );
    },

    /**
     * Can schedule content?
     */
    canSchedule(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.subscription?.plan !==
            "FREE_MEMBER"
        );
    },

    /**
     * Can monetize content?
     */
    canMonetize(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.accountType === "CREATOR" &&
            user.subscription?.status === "ACTIVE"
        );
    },

    /**
     * Can boost content?
     */
    canBoost(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.accountType === "BUSINESS"
        );
    },

    /**
     * Can access analytics?
     */
    canViewAnalytics(user) {
        if (!this.canCreate(user))
            return false;

        return (
            user.subscription?.status === "ACTIVE"
        );
    }
};

module.exports = ContentRules;