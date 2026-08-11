const Report = {

    canCreate(user) {
    return {
        allowed: !!user,
        code: !!user ? "OK" : "UNAUTHORIZED"
    };
},

    canView(user, report) {

        if (!user)
            return false;

        if (["admin", "superadmin"].includes(user.role))
            return true;

        return String(report.createdBy) === String(user._id);

    },

    canUpdate(user, report) {

        if (!user)
            return false;

        if (report.status === "closed")
            return false;

        return String(report.createdBy) === String(user._id);

    },

    canDelete(user, report) {

        if (!user)
            return false;

        if (["admin", "superadmin"].includes(user.role))
            return true;

        return String(report.createdBy) === String(user._id);

    },

    canResolve(user) {

        if (!user)
            return false;

        return [
            "admin",
            "superadmin",
            "moderator"
        ].includes(user.role);

    },

    canAssign(user) {

        if (!user)
            return false;

        return [
            "admin",
            "superadmin"
        ].includes(user.role);

    },

    canEscalate(user) {

        if (!user)
            return false;

        return [
            "admin",
            "superadmin",
            "moderator"
        ].includes(user.role);

    },

    canViewAnalytics(user) {

        if (!user)
            return false;

        return [
            "admin",
            "superadmin"
        ].includes(user.role);

    }

};

module.exports = Report;