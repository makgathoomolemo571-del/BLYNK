const plans = require("../config/plans.config");

class BusinessRules {

   static canAccessStudio(user) {

    return {
        allowed: true,
        code: "OK"
    };

}



    /*
    ==========================================
    ACCOUNT
    ==========================================
    */

    static canCreateBusiness(user) {

        if (!user) {
            return {
                allowed: false,
                reason: "NOT_AUTHENTICATED"
            };
        }

        if (!user.emailVerified) {
            return {
                allowed: false,
                reason: "EMAIL_NOT_VERIFIED"
            };
        }

        if (user.accountStatus !== "ACTIVE") {
            return {
                allowed: false,
                reason: "ACCOUNT_NOT_ACTIVE"
            };
        }

        return {
            allowed: true
        };
    }

    /*
    ==========================================
    SUBSCRIPTION
    ==========================================
    */

    static canAccessBusinessDashboard(subscription) {

        const allowedPlans = [

            "FREE_BUSINESS",

            "BUSINESS_BASIC",

            "BUSINESS_PRO",

            "BUSINESS_ENTERPRISE"

        ];

        return {

            allowed: allowedPlans.includes(subscription.plan)

        };

    }

    /*
    ==========================================
    STAFF LIMITS
    ==========================================
    */

    static maxEmployees(plan) {

        switch (plan) {

            case "FREE_BUSINESS":
                return 1;

            case "BUSINESS_BASIC":
                return 5;

            case "BUSINESS_PRO":
                return 25;

            case "BUSINESS_ENTERPRISE":
                return Infinity;

            default:
                return 0;
        }

    }

    static canInviteEmployee(plan, currentEmployees) {

        return {

            allowed:
                currentEmployees <
                this.maxEmployees(plan),

            limit:
                this.maxEmployees(plan)

        };

    }

    /*
    ==========================================
    BRANCHES
    ==========================================
    */

    static maxBranches(plan) {

        switch (plan) {

            case "FREE_BUSINESS":
                return 1;

            case "BUSINESS_BASIC":
                return 2;

            case "BUSINESS_PRO":
                return 10;

            case "BUSINESS_ENTERPRISE":
                return Infinity;

            default:
                return 0;
        }

    }

    /*
    ==========================================
    PRODUCTS
    ==========================================
    */

    static maxProducts(plan) {

        switch (plan) {

            case "FREE_BUSINESS":
                return 20;

            case "BUSINESS_BASIC":
                return 500;

            case "BUSINESS_PRO":
                return 5000;

            case "BUSINESS_ENTERPRISE":
                return Infinity;

            default:
                return 0;
        }

    }

    /*
    ==========================================
    ANALYTICS
    ==========================================
    */

    static canUseAdvancedAnalytics(plan) {

        return [

            "BUSINESS_PRO",

            "BUSINESS_ENTERPRISE"

        ].includes(plan);

    }

    /*
    ==========================================
    EXPORTS
    ==========================================
    */

    static canExportReports(plan) {

        return [

            "BUSINESS_BASIC",

            "BUSINESS_PRO",

            "BUSINESS_ENTERPRISE"

        ].includes(plan);

    }

    /*
    ==========================================
    API
    ==========================================
    */

    static canUseAPI(plan) {

        return [

            "BUSINESS_ENTERPRISE"

        ].includes(plan);

    }

    /*
    ==========================================
    CUSTOM DOMAIN
    ==========================================
    */

    static canUseCustomDomain(plan) {

        return [

            "BUSINESS_PRO",

            "BUSINESS_ENTERPRISE"

        ].includes(plan);

    }

    /*
    ==========================================
    ADS
    ==========================================
    */

    static canRunAdvertisements(plan) {

        return [

            "BUSINESS_BASIC",

            "BUSINESS_PRO",

            "BUSINESS_ENTERPRISE"

        ].includes(plan);

    }

}

module.exports = BusinessRules;