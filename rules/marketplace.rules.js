const MarketplaceRules = {
    /*
    |--------------------------------------------------------------------------
    | General Access
    |--------------------------------------------------------------------------
    */

    canAccess(user) {
         if (!user) {
        return {
            allowed: false,
            code: "USER_NOT_FOUND"
        };
    }

    const active =
        user.status === "active" ||
        user.status === "ACTIVE" ||
        user.accountStatus === "ACTIVE";
console.log("MARKETPLACE USER:", {
    status: user.status,
    accountStatus: user.accountStatus,
    role: user.role
});
    

    return {
        allowed: true
    };
    },

    /*
    |--------------------------------------------------------------------------
    | Buy Products
    |--------------------------------------------------------------------------
    */

    canBuy(user) {
        return (
            this.canAccessMarketplace(user) &&
            !user.isBanned &&
            !user.wallet?.isFrozen
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Sell Products
    |--------------------------------------------------------------------------
    */

    canSell(user) {
        return (
            this.canAccessMarketplace(user) &&
            (
                user.role === "BUSINESS" ||
                user.role === "CREATOR"
            )
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Create Store
    |--------------------------------------------------------------------------
    */

    canCreateStore(user) {
        return (
            this.canSell(user) &&
            user.subscription.permissions.includes("CREATE_STORE")
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Manage Store
    |--------------------------------------------------------------------------
    */

    canManageStore(user, store) {
        if (!store) return false;

        return (
            this.canSell(user) &&
            store.owner.toString() === user.id.toString()
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Upload Products
    |--------------------------------------------------------------------------
    */

    canCreateProduct(user) {
        return (
            this.canSell(user) &&
            user.subscription.permissions.includes("CREATE_PRODUCT")
        );
    },

    canEditProduct(user, product) {
        if (!product) return false;

        return (
            this.canSell(user) &&
            product.owner.toString() === user.id.toString()
        );
    },

    canDeleteProduct(user, product) {
        if (!product) return false;

        return (
            this.canSell(user) &&
            product.owner.toString() === user.id.toString()
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Promotions
    |--------------------------------------------------------------------------
    */

    canPromoteProduct(user) {
        return (
            this.canSell(user) &&
            user.subscription.permissions.includes("PROMOTE_PRODUCTS")
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Coupons
    |--------------------------------------------------------------------------
    */

    canCreateCoupons(user) {
        return (
            this.canSell(user) &&
            user.subscription.permissions.includes("COUPONS")
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Inventory
    |--------------------------------------------------------------------------
    */

    canManageInventory(user) {
        return (
            this.canSell(user) &&
            user.subscription.permissions.includes("INVENTORY")
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Orders
    |--------------------------------------------------------------------------
    */

    canReceiveOrders(user) {
        return (
            this.canSell(user)
        );
    },

    canCancelOrder(user, order) {
        if (!order) return false;

        return (
            order.seller.toString() === user.id.toString()
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Analytics
    |--------------------------------------------------------------------------
    */

    canViewMarketplaceAnalytics(user) {
        return (
            this.canSell(user) &&
            user.subscription.permissions.includes("MARKETPLACE_ANALYTICS")
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Withdraw Earnings
    |--------------------------------------------------------------------------
    */

    canWithdraw(user) {
        return (
            this.canSell(user) &&
            !user.wallet.isFrozen &&
            user.subscription.permissions.includes("WITHDRAW")
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Reviews
    |--------------------------------------------------------------------------
    */

    canLeaveReview(user) {
        return (
            this.canBuy(user)
        );
    },

    /*
    |--------------------------------------------------------------------------
    | Reports
    |--------------------------------------------------------------------------
    */

    canReportListing(user) {
        return (
            this.canAccessMarketplace(user)
        );
    }
};

module.exports = MarketplaceRules;