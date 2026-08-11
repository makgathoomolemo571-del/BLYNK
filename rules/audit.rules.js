/**
 * ==========================================================
 * BLYNK SOCIAL PLATFORM
 * Audit Rules
 * ==========================================================
 * Every important system action MUST be logged.
 * Nothing changes without an audit record.
 * ==========================================================
 */

const Audit = require("../modules/audit/audit.model");

const AUDIT_ACTIONS = {

    // Authentication
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    VERIFY_EMAIL: "VERIFY_EMAIL",
    VERIFY_PHONE: "VERIFY_PHONE",
    RESET_PASSWORD: "RESET_PASSWORD",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",

    // Account
    UPDATE_PROFILE: "UPDATE_PROFILE",
    UPDATE_SETTINGS: "UPDATE_SETTINGS",
    DELETE_ACCOUNT: "DELETE_ACCOUNT",
    DEACTIVATE_ACCOUNT: "DEACTIVATE_ACCOUNT",
    REACTIVATE_ACCOUNT: "REACTIVATE_ACCOUNT",

    // Subscription
    SUBSCRIBE: "SUBSCRIBE",
    UPGRADE_PLAN: "UPGRADE_PLAN",
    DOWNGRADE_PLAN: "DOWNGRADE_PLAN",
    CANCEL_PLAN: "CANCEL_PLAN",
    RENEW_PLAN: "RENEW_PLAN",
    EXPIRE_PLAN: "EXPIRE_PLAN",

    // Payments
    PAYMENT_CREATED: "PAYMENT_CREATED",
    PAYMENT_PENDING: "PAYMENT_PENDING",
    PAYMENT_SUCCESS: "PAYMENT_SUCCESS",
    PAYMENT_FAILED: "PAYMENT_FAILED",
    PAYMENT_REFUNDED: "PAYMENT_REFUNDED",

    // Wallet
    WALLET_CREATED: "WALLET_CREATED",
    WALLET_TOPUP: "WALLET_TOPUP",
    WALLET_DEBIT: "WALLET_DEBIT",
    WALLET_CREDIT: "WALLET_CREDIT",

    // Business
    BUSINESS_CREATED: "BUSINESS_CREATED",
    BUSINESS_UPDATED: "BUSINESS_UPDATED",
    BUSINESS_DELETED: "BUSINESS_DELETED",

    // Creator
    CREATOR_PROFILE_CREATED: "CREATOR_PROFILE_CREATED",
    CREATOR_PROFILE_UPDATED: "CREATOR_PROFILE_UPDATED",

    // Content
    POST_CREATED: "POST_CREATED",
    POST_UPDATED: "POST_UPDATED",
    POST_DELETED: "POST_DELETED",

    COMMENT_CREATED: "COMMENT_CREATED",
    COMMENT_UPDATED: "COMMENT_UPDATED",
    COMMENT_DELETED: "COMMENT_DELETED",

    MEDIA_UPLOAD: "MEDIA_UPLOAD",

    STORY_CREATED: "STORY_CREATED",
    REEL_CREATED: "REEL_CREATED",

    // Marketplace
    PRODUCT_CREATED: "PRODUCT_CREATED",
    PRODUCT_UPDATED: "PRODUCT_UPDATED",
    PRODUCT_DELETED: "PRODUCT_DELETED",
    PRODUCT_PURCHASED: "PRODUCT_PURCHASED",

    // Admin
    USER_BANNED: "USER_BANNED",
    USER_UNBANNED: "USER_UNBANNED",
    ROLE_CHANGED: "ROLE_CHANGED",
    PERMISSION_CHANGED: "PERMISSION_CHANGED",

    // Security
    MFA_ENABLED: "MFA_ENABLED",
    MFA_DISABLED: "MFA_DISABLED",
    DEVICE_ADDED: "DEVICE_ADDED",
    DEVICE_REMOVED: "DEVICE_REMOVED",

    // Notifications
    EMAIL_SENT: "EMAIL_SENT",
    PUSH_SENT: "PUSH_SENT",
    SMS_SENT: "SMS_SENT"
};

const AUDIT_LEVEL = {

    INFO: "INFO",
    WARNING: "WARNING",
    CRITICAL: "CRITICAL"

};

const AuditRules = {

    actions: AUDIT_ACTIONS,

    levels: AUDIT_LEVEL,
    
    /**
     * Every audit log must contain these fields.
     */
    requiredFields(log) {

        const required = [

            "action",
            "userId",
            "timestamp"

        ];

        return required.every(field => log[field] !== undefined);

    },

    /**
     * Actions that MUST always be recorded.
     */
    mustAudit(action) {

        return Object.values(AUDIT_ACTIONS).includes(action);

    },

    /**
     * Determine severity.
     */
    level(action) {

        switch (action) {

            case AUDIT_ACTIONS.PAYMENT_FAILED:
            case AUDIT_ACTIONS.USER_BANNED:
            case AUDIT_ACTIONS.DELETE_ACCOUNT:
            case AUDIT_ACTIONS.PERMISSION_CHANGED:

                return AUDIT_LEVEL.CRITICAL;

            case AUDIT_ACTIONS.LOGIN:
            case AUDIT_ACTIONS.LOGOUT:
            case AUDIT_ACTIONS.UPDATE_PROFILE:
            case AUDIT_ACTIONS.UPGRADE_PLAN:
            case AUDIT_ACTIONS.DOWNGRADE_PLAN:

                return AUDIT_LEVEL.INFO;

            default:

                return AUDIT_LEVEL.WARNING;
        }

    },

    /**
     * Every audit record should capture these values.
     */
    create(data) {
    return {
        module: data.module,

        action: data.action,
        level: this.level(data.action),

        userId: data.userId,

        targetId: data.targetId || null,

        previousValue: data.previousValue || null,
        newValue: data.newValue || null,

        description: data.description || "",

        ip: data.ip || null,
        userAgent: data.userAgent || null,

        device: data.device || null,
        browser: data.browser || null,
        platform: data.platform || null,
        location: data.location || null,

        metadata: data.metadata || {},

        success: data.success !== false,

        timestamp: new Date()
    };
},
    async log(data) {

    const record = this.create(data);

    console.log("AUDIT LOG:", record);

    // TODO:
    await Audit.create(record);

    return {
        allowed: true,
        record
    };

},

};

module.exports = AuditRules;