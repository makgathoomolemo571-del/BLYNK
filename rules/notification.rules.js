/**
 * ==========================================================
 * BLYNK SOCIAL PLATFORM
 * Notification Rules
 * ==========================================================
 * This file determines:
 * - when notifications are sent
 * - who receives them
 * - which channel is used
 * - user preferences
 * * Controllers should NEVER decide this.
 * They only call NotificationRules.
 * ==========================================================
 */

const NotificationRules = {};

/**
 * ----------------------------------------------------------
 * Global Settings
 * ----------------------------------------------------------
 */

NotificationRules.channels = {
  EMAIL: "EMAIL",
  PUSH: "PUSH",
  SMS: "SMS",
  IN_APP: "IN_APP",
  WEBHOOK: "WEBHOOK"
};

NotificationRules.types = {
  SYSTEM: "SYSTEM",
  ACCOUNT: "ACCOUNT",
  SECURITY: "SECURITY",
  PAYMENT: "PAYMENT",
  SUBSCRIPTION: "SUBSCRIPTION",
  BUSINESS: "BUSINESS",
  CREATOR: "CREATOR",
  SOCIAL: "SOCIAL",
  MARKETING: "MARKETING"
};


NotificationRules.canReceive = (user) => {

    if (!user) {
        return {
            allowed: false,
            code: "NOT_AUTHENTICATED"
        };
    }

    if (
        user.status === "suspended" ||
        user.status === "banned"
    ) {
        return {
            allowed: false,
            code: "ACCOUNT_BLOCKED"
        };
    }

    return {
        allowed: true
    };

};

/**
 * ----------------------------------------------------------
 * Account Notifications
 * ----------------------------------------------------------
 */

NotificationRules.accountCreated = () => ({
  send: true,
  channels: ["EMAIL"],
  priority: "HIGH"
});

NotificationRules.emailVerified = () => ({
  send: true,
  channels: ["EMAIL", "IN_APP"]
});

NotificationRules.passwordChanged = () => ({
  send: true,
  channels: ["EMAIL", "PUSH"],
  priority: "CRITICAL"
});

NotificationRules.phoneChanged = () => ({
  send: true,
  channels: ["EMAIL"],
  priority: "HIGH"
});

NotificationRules.accountDeleted = () => ({
  send: true,
  channels: ["EMAIL"]
});

/**
 * ----------------------------------------------------------
 * Login Security
 * ----------------------------------------------------------
 */

NotificationRules.newDeviceLogin = () => ({
  send: true,
  channels: ["EMAIL", "PUSH"],
  priority: "HIGH"
});

NotificationRules.failedLogin = (attempts) => ({
  send: attempts >= 5,
  channels: ["EMAIL"],
  priority: "HIGH"
});

NotificationRules.accountLocked = () => ({
  send: true,
  channels: ["EMAIL", "SMS"],
  priority: "CRITICAL"
});

/**
 * ----------------------------------------------------------
 * Subscription
 * ----------------------------------------------------------
 */

NotificationRules.subscriptionActivated = () => ({
  send: true,
  channels: ["EMAIL", "IN_APP"]
});

NotificationRules.subscriptionUpgraded = () => ({
  send: true,
  channels: ["EMAIL", "PUSH", "IN_APP"]
});

NotificationRules.subscriptionDowngraded = () => ({
  send: true,
  channels: ["EMAIL", "IN_APP"]
});

NotificationRules.subscriptionRenewed = () => ({
  send: true,
  channels: ["EMAIL"]
});

NotificationRules.subscriptionCancelled = () => ({
  send: true,
  channels: ["EMAIL"]
});

NotificationRules.subscriptionExpiring = (daysLeft) => ({
  send: daysLeft <= 7,
  channels: ["EMAIL", "PUSH"]
});

/**
 * ----------------------------------------------------------
 * Payments
 * ----------------------------------------------------------
 */

NotificationRules.paymentSuccess = () => ({
  send: true,
  channels: ["EMAIL", "IN_APP"]
});

NotificationRules.paymentFailed = () => ({
  send: true,
  channels: ["EMAIL", "PUSH"]
});

NotificationRules.refundProcessed = () => ({
  send: true,
  channels: ["EMAIL"]
});

NotificationRules.invoiceCreated = () => ({
  send: true,
  channels: ["EMAIL"]
});

/**
 * ----------------------------------------------------------
 * Wallet
 * ----------------------------------------------------------
 */

NotificationRules.walletTopUp = () => ({
  send: true,
  channels: ["PUSH", "IN_APP"]
});

NotificationRules.walletSpent = () => ({
  send: true,
  channels: ["PUSH"]
});

NotificationRules.lowWalletBalance = (balance) => ({
  send: balance <= 20,
  channels: ["PUSH"]
});

/**
 * ----------------------------------------------------------
 * Social
 * ----------------------------------------------------------
 */

NotificationRules.newFollower = (settings) => ({
  send: settings.followers,
  channels: ["PUSH", "IN_APP"]
});

NotificationRules.newComment = (settings) => ({
  send: settings.comments,
  channels: ["PUSH", "IN_APP"]
});

NotificationRules.newLike = (settings) => ({
  send: settings.likes,
  channels: ["IN_APP"]
});

NotificationRules.newMessage = () => ({
  send: true,
  channels: ["PUSH", "IN_APP"]
});

NotificationRules.mention = () => ({
  send: true,
  channels: ["PUSH", "IN_APP"]
});

/**
 * ----------------------------------------------------------
 * Creator
 * ----------------------------------------------------------
 */

NotificationRules.newSubscriber = () => ({
  send: true,
  channels: ["PUSH", "IN_APP"]
});

NotificationRules.creatorPayout = () => ({
  send: true,
  channels: ["EMAIL"]
});

/**
 * ----------------------------------------------------------
 * Business
 * ----------------------------------------------------------
 */

NotificationRules.newOrder = () => ({
  send: true,
  channels: ["PUSH", "EMAIL"]
});

NotificationRules.newBooking = () => ({
  send: true,
  channels: ["EMAIL", "PUSH"]
});

NotificationRules.newReview = () => ({
  send: true,
  channels: ["IN_APP"]
});

/**
 * ----------------------------------------------------------
 * Moderation
 * ----------------------------------------------------------
 */

NotificationRules.contentRemoved = () => ({
  send: true,
  channels: ["EMAIL"]
});

NotificationRules.accountReported = () => ({
  send: false
});

NotificationRules.accountSuspended = () => ({
  send: true,
  channels: ["EMAIL"],
  priority: "CRITICAL"
});

/**
 * ----------------------------------------------------------
 * Marketing
 * ----------------------------------------------------------
 */

NotificationRules.sendMarketing = (user) => ({
  send: user.preferences?.marketing === true,
  channels: ["EMAIL"]
});

/**
 * ----------------------------------------------------------
 * Maintenance
 * ----------------------------------------------------------
 */

NotificationRules.systemMaintenance = () => ({
  send: true,
  channels: ["IN_APP", "EMAIL"]
});

NotificationRules.newFeature = () => ({
  send: true,
  channels: ["IN_APP"]
});

module.exports = NotificationRules;