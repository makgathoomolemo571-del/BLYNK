const userService = require("../user/user.service");
const profileService = require("../profile/profile.service");
const walletService = require("../wallet/wallet.service");
const subscriptionService = require("../subscription/subscription.service");
const revenueService = require("../revenue/revenue.service");
const notificationService = require("../notification/notification.service");
const moderationService = require("../moderation/moderation.service");
const supportService = require("../support/support.service");
const verificationService = require("../verification/verification.service");
const analyticsService = require("../analytics/analytics.service");
const marketplaceService = require("../marketplace/marketplace.service");
const creatorHireService = require("../creatorHire/creatorHire.service");
const businessFindService = require("../businessFind/businessFind.service");
const recommendationService = require("../recommendation/recommendation.service");
const searchService = require("../search/search.service");
const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {

    const user = await User.findOne({
        email: email.toLowerCase()
    });

    if (!user)
        throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid)
        throw new Error("Invalid credentials");

    if (
        user.role !== "admin" &&
        user.role !== "superadmin"
    ) {
        throw new Error("Administrator access required");
    }

    const accessToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    const refreshToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "30d"
        }
    );

    return {
        user,
        accessToken,
        refreshToken
    };
};

exports.me = async (userId) => {

    return await User.findById(userId)
        .select("-password");

};

exports.logout = async () => {

    return {
        success: true,
        message: "Logged out"
    };

};

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

exports.dashboard = async () => {

  const [
    users,
    profiles,
    wallets,
    subscriptions,
    revenue,
    notifications,
    reports,
    tickets,
    verifications,
    analytics,
    marketplaces,
    creatorHires,
    businessFinds,
    recommendations,
    searches
  ] = await Promise.all([

    userService.stats(),
    profileService.stats(),
    walletService.stats(),
    subscriptionService.stats(),
    revenueService.stats(),
    notificationService.stats(),
    moderationService.stats(),
    supportService.stats(),
    verificationService.stats(),
    analyticsService.stats(),
    marketplaceService.stats(),
    creatorHireService.stats(),
    businessFindService.stats(),
    recommendationService.stats(),
    searchService.stats()

  ]);

  return {

    users,
    profiles,
    wallets,
    subscriptions,
    revenue,
    notifications,
    reports,
    tickets,
    verifications,
    analytics,
    marketplaces,
    creatorHires,
    businessFinds,
    recommendations,
    searches

  };

};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

exports.users = async () =>
await userService.getUsers();

exports.user = async (id) =>
await userService.getById(id);

exports.suspendUser = async (id) =>
await userService.suspend(id);

exports.unsuspendUser = async (id) =>
await userService.unsuspend(id);

exports.changeRole = async (id, role) =>
await userService.changeRole(id, role);

/*
|--------------------------------------------------------------------------
| Reports
|--------------------------------------------------------------------------
*/

exports.reports = async () =>
await moderationService.getReports();

/*
|--------------------------------------------------------------------------
| Support
|--------------------------------------------------------------------------
*/

exports.support = async () =>
await supportService.getAllTickets();

/*
|--------------------------------------------------------------------------
| Verification
|--------------------------------------------------------------------------
*/

exports.verification = async () =>
await verificationService.getAllRequests();

/*
|--------------------------------------------------------------------------
| Wallets
|--------------------------------------------------------------------------
*/

exports.wallets = async () => {

    const wallets = await walletService.getAll();
    const stats = await walletService.stats();

    return {
        stats,
        wallets
    };

};

/*
|--------------------------------------------------------------------------
| Revenues
|--------------------------------------------------------------------------
*/

exports.revenues = async () =>
await revenueService.summary();

/*
|--------------------------------------------------------------------------
| Subscriptions
|--------------------------------------------------------------------------
*/

exports.subscriptions = async () =>
await subscriptionService.getAll();

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

exports.analytics = async () =>
await analyticsService.stats();

/*
|--------------------------------------------------------------------------
| Audit
|--------------------------------------------------------------------------
*/

exports.audit = async () =>
await require("../audit/audit.service").getAll();

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

exports.health = async () => ({

  status: "OK",

  database: "CONNECTED",

  uptime: process.uptime(),

  timestamp: new Date()

});

/*
|--------------------------------------------------------------------------
| Announcement
|--------------------------------------------------------------------------
*/

exports.announcement = async (body) => {

  return await notificationService.broadcast({

    title: body.title,

    message: body.message

  });

};

