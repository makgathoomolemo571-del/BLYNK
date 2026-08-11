const ACCOUNT_STATUS = {
    PENDING: "PENDING",
    EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
    PHONE_VERIFICATION: "PHONE_VERIFICATION",
    ACTIVE: "ACTIVE",
    SUSPENDED: "SUSPENDED",
    LOCKED: "LOCKED",
    BANNED: "BANNED",
    DELETED: "DELETED"
};

class AccountRules {

    static isActive(user) {
        return user.accountStatus === ACCOUNT_STATUS.ACTIVE;
    }

    static isPending(user) {
        return user.accountStatus === ACCOUNT_STATUS.PENDING;
    }

    static isSuspended(user) {
        return user.accountStatus === ACCOUNT_STATUS.SUSPENDED;
    }

    static isLocked(user) {
        return user.accountStatus === ACCOUNT_STATUS.LOCKED;
    }

    static isBanned(user) {
        return user.accountStatus === ACCOUNT_STATUS.BANNED;
    }

    static isDeleted(user) {
        return user.accountStatus === ACCOUNT_STATUS.DELETED;
    }

    static canLogin(user) {

        if (!user)
            return {
                allowed: false,
                reason: "ACCOUNT_NOT_FOUND"
            };

        if (this.isDeleted(user))
            return {
                allowed: false,
                reason: "ACCOUNT_DELETED"
            };

        if (this.isBanned(user))
            return {
                allowed: false,
                reason: "ACCOUNT_BANNED"
            };

        if (this.isLocked(user))
            return {
                allowed: false,
                reason: "ACCOUNT_LOCKED"
            };

        if (this.isSuspended(user))
            return {
                allowed: false,
                reason: "ACCOUNT_SUSPENDED"
            };

        if (!user.emailVerified)
            return {
                allowed: false,
                reason: "EMAIL_NOT_VERIFIED"
            };

        return {
            allowed: true
        };

    }

    static canAccessApp(user) {

    if (!user)
        return {
            allowed: false,
            reason: "ACCOUNT_NOT_FOUND"
        };

    if (this.isDeleted(user))
        return {
            allowed: false,
            reason: "ACCOUNT_DELETED"
        };

    if (this.isBanned(user))
        return {
            allowed: false,
            reason: "ACCOUNT_BANNED"
        };

    if (this.isLocked(user))
        return {
            allowed: false,
            reason: "ACCOUNT_LOCKED"
        };

    if (this.isSuspended(user))
        return {
            allowed: false,
            reason: "ACCOUNT_SUSPENDED"
        };

    return {
        allowed: true
    };

}

    static canReceivePayments(user){

        return (
            this.isActive(user) &&
            user.emailVerified
        );

    }

    static canCreateBusiness(user){

        return (
            this.isActive(user) &&
            user.emailVerified
        );

    }

    static canCreateStore(user){

        return (
            this.isActive(user) &&
            user.emailVerified
        );

    }

    static canCreateCreatorChannel(user){

        return (
            this.isActive(user) &&
            user.emailVerified
        );

    }

}

module.exports = {
    ACCOUNT_STATUS,
    AccountRules
};