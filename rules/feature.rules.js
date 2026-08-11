const plans = require("../config/plans.config");

class FeatureRules {

    // ===================================================
    // MEMBERSHIP
    // ===================================================

    static getPlan(user) {
        return user?.subscription?.plan || "FREE_MEMBER";
    }

    static getRole(user) {
        return user?.role || "MEMBER";
    }

    static isVerified(user) {
        return user?.emailVerified === true;
    }

    static isSubscriptionActive(user) {

        return (
            user?.subscription &&
            user.subscription.status === "ACTIVE"
        );

    }

    // ===================================================
    // FEATURE CHECK
    // ===================================================

    static canUse(user, feature) {

        const plan = this.getPlan(user);

        const rules = {

            //--------------------------------------------------
            // MEMBER
            //--------------------------------------------------

            CREATE_POST: [

                "FREE_MEMBER",
                "MEMBER_BASIC",
                "MEMBER_PLUS",

                "FREE_CREATOR",
                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO",

                "FREE_BUSINESS",
                "BUSINESS_BASIC",
                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

             FEED: [

                "*"

            ],

            POSTS: [
    "*"
],

ADVERTISEMENT_VIEW: [
    "*"
],
            COMMENT: [

                "*"

            ],

            LIKE: [

                "*"

            ],

            REELS: ["*"],

            WATCHPARTY_VIEW: [
    "*"
],

NOTIFICATTIONS_VIEW: [
    "*"
],

MARKETPLACE_VIEW: [
    "*"
],
ADVERTISEMENT_VIEW: [
    "*"
],
VIEW_PODCASTS_HUB: ["*"],
VIEW_EPISODES_HUB: ["*"],
VIEW_BUSINESS_HUB: ["*"],

VIEW_CREATOR_HUB: ["*"],

VIEW_WALLET: ["*"],

VIEW_SUBSCRIPTIONS: ["*"],

MONETIZATION_DASHBOARD: ["*"],

VIEW_SOCIAL_SOCIALS: ["*"],

VIEW_SUPPORT: ["*"],

            FOLLOW: [

                "*"

            ],

            CHAT: [

                "*"

            ],

        APPLICATION_CREATE: [

                "*"

            ],

            VIDEO_UPLOAD: [

                "MEMBER_PLUS",

                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO",

                "BUSINESS_BASIC",
                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

            LIVE_STREAM: [

                "CREATOR_PLUS",
                "CREATOR_PRO",

                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

            //--------------------------------------------------
            // CREATOR
            //--------------------------------------------------

            CREATOR_STUDIO: [

                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO"

            ],
   

   

   SPONSORSHIP_APPLY: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",





],


            EPISODE_CREATE: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",





],

             CREATOR_HIRE_CREATE: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",



],



WATCHPARTY_CREATE: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",


],
EPISODE_DELETE: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",


],
PODCAST_DELETE: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",


],
APPLICATION_UPDATE: [

    "FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",

],

            MONETIZATION: [

                "CREATOR_PLUS",
                "CREATOR_PRO"

            ],

            AI_CONTENT: [

                "CREATOR_PRO"

            ],

            PODCASTS: [
                 "FREE_CREATOR",

                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO",
                
                

            ],

            //--------------------------------------------------
            // BUSINESS
            //--------------------------------------------------

            BUSINESS_PROFILE: [

                "FREE_BUSINESS",
                "BUSINESS_BASIC",
                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

          
            SPONSORSHIP_CREATE: [
 "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
            ],

            
ADVERTISEMENT_CREATE: [
 "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
            ],
            MARKETPLACE: [
 "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
            ],

             BUSINESSFIND_CREATE: [

    

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
WATCHPARTY_CREATE: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
EPISODE_CREATE: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
EPISODE_DELETE: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
PODCAST_DELETE: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
 
APPLICATION_UPDATE: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],

SPONSORSHIP_ACCEPT: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
SPONSORSHIP_REJECT: [

    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"


],
            ONLINE_STORE: [

                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

             PODCASTS: [
                
                "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"

            ],

            INVENTORY: [

                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

            STAFF: [

                "BUSINESS_ENTERPRISE"

            ],

            ANALYTICS: [

                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

            ADS_MANAGER: [

                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"

            ],

            API_ACCESS: [

                "BUSINESS_ENTERPRISE"

            ]

        };

        if (!rules[feature]) {

            return false;

        }

        if (rules[feature].includes("*")) {

            return true;

        }

        return rules[feature].includes(plan);

    }

}

module.exports = FeatureRules;