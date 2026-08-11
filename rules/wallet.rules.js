class WalletRules {

    static canAccess(user) {

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
            allowed: true,
            code: "OK"
        };
    }

    static canUseWallet(user) {
        return this.canAccess(user);
    }

    static canViewWallet(user) {
        return this.canAccess(user);
    }

    static canDeposit(user) {
        return this.canAccess(user);
    }

    static canWithdraw(user) {

        const access = this.canAccess(user);

        if (!access.allowed) return access;

        return {
            allowed: true,
            code: "OK"
        };
    }

    static canTransfer(user) {

        const access = this.canAccess(user);

        if (!access.allowed) return access;

        return {
            allowed: true,
            code: "OK"
        };
    }

    static canViewTransactions(user) {
        return this.canAccess(user);
    }

}

module.exports = WalletRules;