/**
 * ==========================================================
 * BLYNK API RULES
 * Global API Security & Request Rules
 * ==========================================================
 */


const ApiRules = {
    
canAccess(req) {

        return {
            allowed: true,
            code: "OK"
        };

    },


    /**
     * Public Routes
     * No authentication required.
     */
    PUBLIC_ROUTES: [
        "/login",
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/reset-password",
        "/auth/verify-email",
        "/health",
        "/status"

    ],

    /**
     * Authentication Required
     */
    REQUIRE_AUTH: true,

    /**
     * JWT Rules
     */
    JWT: {

        required: true,

        expiresIn: "7d",

        refreshToken: true,

        refreshExpiry: "30d"

    },

    /**
     * API Version
     */
    VERSION: "v1",

    /**
     * Maximum Request Size
     */
    MAX_BODY_SIZE: "10mb",

    /**
     * Pagination
     */
    PAGINATION: {

        defaultLimit: 20,

        maxLimit: 100

    },

    /**
     * Rate Limiting
     */
    RATE_LIMIT: {

        login: {

            window: 15 * 60 * 1000,

            max: 5

        },

        register: {

            window: 60 * 60 * 1000,

            max: 5

        },

        forgotPassword: {

            window: 60 * 60 * 1000,

            max: 3

        },

        verifyEmail: {

            window: 15 * 60 * 1000,

            max: 5

        },

        api: {

            window: 60 * 1000,

            max: 300

        }

    },

    /**
     * Allowed HTTP Methods
     */
    METHODS: [

        "GET",

        "POST",

        "PUT",

        "PATCH",

        "DELETE"

    ],

    /**
     * File Upload Limits
     */
    FILES: {

        imageMaxMB: 10,

        videoMaxMB: 500,

        audioMaxMB: 100,

        documentMaxMB: 20

    },

    /**
     * Supported Content Types
     */
    CONTENT_TYPES: [

        "application/json",

        "multipart/form-data"

    ],

    /**
     * CORS
     */
    CORS: {

        credentials: true,

        methods: [

            "GET",

            "POST",

            "PUT",

            "PATCH",

            "DELETE"

        ]

    },

    /**
     * Audit Logging
     */
    AUDIT: {

        logRequests: true,

        logErrors: true,

        logPayments: true,

        logSubscriptions: true,

        logAuthentication: true

    }

};

module.exports = ApiRules;