const SearchRules = {

    canSearch(user) {

        if (!user)
            return {
                allowed: false,
                code: "NOT_AUTHENTICATED"
            };

        if (user.status !== "active")
            return {
                allowed: false,
                code: "ACCOUNT_INACTIVE"
            };

        return {
            allowed: true,
            code: "OK"
        };
    },

    canSearchUsers(user) {
        return this.canSearch(user);
    },

    canSearchCreators(user) {
        return this.canSearch(user);
    },

    canSearchBusinesses(user) {
        return this.canSearch(user);
    },

    canSearchPosts(user) {
        return this.canSearch(user);
    },

    canSearchMarketplace(user) {
        return this.canSearch(user);
    },

    canSearchEvents(user) {
        return this.canSearch(user);
    },

    canSearchHashtags(user) {
        return this.canSearch(user);
    },

    canSearchPodcasts(user) {
        return this.canSearch(user);
    },

    canSearchWatchParties(user) {
        return this.canSearch(user);
    },

    canUseAdvancedSearch(user) {

        const result = this.canSearch(user);

        if (!result.allowed)
            return result;

        return {
            allowed: [
                "creator",
                "business",
                "admin",
                "superadmin"
            ].includes(user.role),
            code: [
                "creator",
                "business",
                "admin",
                "superadmin"
            ].includes(user.role)
                ? "OK"
                : "ADVANCED_SEARCH_NOT_ALLOWED"
        };
    }

};

module.exports = SearchRules;