const Roles = require("../config/roles");

class AdminRules {

    static canAccess(user) {
    if (this.isAdmin(user)) {
        return {
            allowed: true
        };
    }

    return {
        allowed: false,
        message: "Administrator access required"
    };
}

    static isAdmin(user){

        if(!user) return false;

        return [

            Roles.SUPER_ADMIN,

            Roles.ADMIN

        ].includes(user.role);

    }

    static isSuperAdmin(user){

        return user?.role===Roles.SUPER_ADMIN;

    }

    static canManageUsers(user){

        return this.isAdmin(user);

    }

    static canDeleteUsers(user){

        return this.isSuperAdmin(user);

    }

    static canSuspendUsers(user){

        return this.isAdmin(user);

    }

    static canApprovePayments(user){

        return this.isAdmin(user);

    }

    static canManagePlans(user){

        return this.isSuperAdmin(user);

    }

    static canViewRevenue(user){

        return this.isAdmin(user);

    }

    static canAccessAuditLogs(user){

        return this.isAdmin(user);

    }

}

module.exports=AdminRules;