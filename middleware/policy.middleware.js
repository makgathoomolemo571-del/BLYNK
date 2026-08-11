// middleware/policy.middleware.js
const User = require("../modules/user/user.model");
const Rules = require("../rules");
const Subscription = require("../modules/subscription/subscription.model");

module.exports = (policy = {}) => {

    return async (req, res, next) => {

        try {

            let user = req.user;

if (user?.userId) {

    user = await User.findById(user.userId)

        .populate("wallet")
        .populate("profile")
        .populate("creator")
        .populate("business");

        const subscription = await Subscription.findOne({
    user: user._id,
    status: "active"
});

user.subscription = subscription;

    if (!user) {
        return res.status(401).json({
            success: false,
            code: "USER_NOT_FOUND"
        });
    }

    req.user = user;
}

            // -------------------------
            // AUTH
            // -------------------------

            if (policy.auth) {
    console.log("AUTH CHECK");
    if (!user) {
        
        return res.status(401).json({
            success: false,
            code: "NOT_AUTHENTICATED"
        });
    }
    console.log("AUTH PASSED");
}

            // -------------------------
            // ACCOUNT
            // -------------------------

           if (policy.account) {
    console.log("ACCOUNT CHECK");

    const result = Rules.Account.AccountRules.canAccessApp(user);

    console.log(result);

    if (!result.allowed) {
        console.log("ACCOUNT FAILED");
        return res.status(403).json(result);
    }

    console.log("ACCOUNT PASSED");
}
            

            // -------------------------
            // EMAIL VERIFIED
            // -------------------------

            if (policy.verified) {

    const requireVerification =
        process.env.REQUIRE_EMAIL_VERIFICATION === "true";

    if (
        requireVerification &&
        !user.emailVerified
    ) {

        return res.status(403).json({
            success: false,
            code: "EMAIL_NOT_VERIFIED"
        });

    }

}
            // -------------------------
            // ROLE
            // -------------------------

           if (policy.role) {

    console.log("ROLE CHECK");

    const roles = Array.isArray(policy.role)
        ? policy.role
        : [policy.role];

    console.log("USER ROLE:", user.role);
    console.log("REQUIRED:", roles);

    if (!roles.includes(user.role)) {
        console.log("ROLE FAILED");
        return res.status(403).json({
            success: false,
            code: "INVALID_ROLE"
        });
    }

    console.log("ROLE PASSED");

            }

            // -------------------------
            // PERMISSION
            // -------------------------

          if (policy.permission) {

    console.log("PERMISSION CHECK");
console.log("Rules.Permission =", Rules.Permission);
console.log("Type =", typeof Rules.Permission);
console.log("Keys =", Object.keys(Rules.Permission));
    const result = Rules.Permission.PermissionRules.can(
        user,
        policy.permission
    );

    console.log(result);

    if (!result.allowed) {
        console.log("PERMISSION FAILED");
        return res.status(403).json(result);
    }

    console.log("PERMISSION PASSED");

            }

            // -------------------------
            // SUBSCRIPTION
            // -------------------------

           if (policy.subscription) {
    console.log("SUBSCRIPTION CHECK");

    const plans = Array.isArray(policy.subscription)
        ? policy.subscription
        : [policy.subscription];

    console.log("Required Plans:", plans);
    console.log("User Subscription:", user.subscription);

    const result = Rules.Subscription.canUse(
        user.subscription,
        plans
    );

    console.log("Subscription Result:", result);

    if (!result.allowed) {
        console.log("403 BECAUSE:", result);
        return res.status(403).json(result);
    }
}

            // -------------------------
            // FEATURE
            // -------------------------

           if (policy.feature) {
    console.log("FEATURE CHECK:", policy.feature);

    const allowed = Rules.Feature.canUse(user, policy.feature);

    console.log("FEATURE RESULT:", allowed);

    if (!allowed) {
        console.log("FEATURE FAILED");
        return res.status(403).json({
            success: false,
            code: "FEATURE_NOT_ALLOWED"
        });
    }

    console.log("FEATURE PASSED");
}
            // -------------------------
            // CREATOR
            // -------------------------

            if (policy.creator) {
console.log("CREATOR CHECK");
                const result =
                    Rules.Creator.canAccessDashboard(user);

                if (!result.allowed)
                    return res.status(403).json(result);

            }

            // -------------------------
            // BUSINESS
            // -------------------------

           if (policy.business) {

    console.log("BUSINESS CHECK");

    const result = Rules.Business.canAccessStudio(user);

    console.log(result);

    if (!result.allowed) {
        console.log("BUSINESS FAILED");
        return res.status(403).json(result);
    }

    console.log("BUSINESS PASSED");
}

            // -------------------------
            // WALLET
            // -------------------------

         if (policy.wallet) {

console.log("WALLET CHECK");

console.log("USER FOR WALLET:", user);

const result =
    Rules.Wallet.canUseWallet(user);

console.log("WALLET RESULT:", result);

if (!result.allowed)
    return res.status(403).json(result);

}

            // -------------------------
            // PAYMENT
            // -------------------------

           console.log("AFTER WALLET");

if (policy.payment) {
    console.log("PAYMENT CHECK");

    const result = Rules.Payment.canPay(user);

    console.log(result);

    if (!result.allowed)
        return res.status(403).json(result);

    console.log("PAYMENT PASSED");
}

console.log("AFTER PAYMENT");

            // -------------------------
            // MARKETPLACE
            // -------------------------

           if (policy.marketplace) {

    console.log("MARKETPLACE CHECK");

    const result = Rules.Marketplace.canAccess(user);

    console.log(result);

    if (!result.allowed) {

        console.log("MARKETPLACE FAILED");

        return res.status(403).json(result);

    }

    console.log("MARKETPLACE PASSED");

}

            // -------------------------
            // CONTENT
            // -------------------------

           if (policy.content === "view") {

    const result = Rules.Content.canAccess(user);

    if (!result.allowed) {
        return res.status(403).json(result);
    }

}

            // -------------------------
            // NOTIFICATION
            // -------------------------
if (policy.notification) {

    console.log("NOTIFICATION CHECK");

    const result = Rules.Notification.canReceive(user);

    console.log(result);

    if (!result.allowed) {
        console.log("NOTIFICATION FAILED");
        return res.status(403).json(result);
    }

    console.log("NOTIFICATION PASSED");
}

            // -------------------------
            // ADMIN
            // -------------------------

            if (policy.admin) {

                const result =
                    Rules.Admin.canAccess(user);

                if (!result.allowed)
                    return res.status(403).json(result);

            }

            // -------------------------
            // SYSTEM
            // -------------------------

            if (policy.system) {

                const result =
                    Rules.System.canAccessPlatform(
                        user,
                        req.system || {}
                    );

                if (!result.allowed)
                    return res.status(503).json(result);

            }

            



// -------------------------
// EMAIL
// -------------------------

if (policy.email) {

    const result =
        Rules.Email.validate(user);

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// PASSWORD
// -------------------------

if (policy.password) {

    const result =
        Rules.Password.canUse(user);

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// SECURITY
// -------------------------

if (policy.security) {

    console.log("SECURITY CHECK");

    const result = Rules.Security.canAccess(user);

    console.log(result);

    if (!result.allowed) {
        console.log("SECURITY FAILED");
        return res.status(403).json(result);
    }

    console.log("SECURITY PASSED");
}

// -------------------------
// AUDIT
// -------------------------
console.log("BEFORE AUDIT");
if (policy.audit) {

    Rules.Audit.log({
    action: policy.audit,
    module: "media",
    userId: user._id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    metadata: {
        method: req.method,
        url: req.originalUrl
    }
});
console.log("AFTER AUDIT");
}

// -------------------------
// API
// -------------------------

if (policy.api) {
console.log("Rules.Api =", Rules.Api);
console.log("Type =", typeof Rules.Api);
console.log("Keys =", Object.keys(Rules.Api || {}));
    const result =
        Rules.Api.canAccess(req);

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// DEVICE
// -------------------------

if (policy.device) {

    const result =
        Rules.Device.canAccess(
            user,
            req
        );

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// SESSION
// -------------------------

if (policy.session) {

    console.log("SESSION CHECK");

    const result = Rules.Session.validate(
        req.session,
        user
    );

    console.log(result);

    if (!result.allowed) {
        console.log("SESSION FAILED");
        return res.status(401).json(result);
    }

    console.log("SESSION PASSED");
}

// -------------------------
// PRIVACY
// -------------------------

if (policy.privacy) {

    const result = await Rules.Privacy.canAccess(user, req);

console.log("Privacy Result:", result);

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// COMPLIANCE
// -------------------------

if (policy.compliance) {

    const result =
        Rules.Compliance.validate(
            user,
            req
        );

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// REPORT
// -------------------------

if (policy.report) {

    const result =
        Rules.Report.canCreate(
            user
        );

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// SEARCH
// -------------------------

if (policy.search) {

    const result =
        Rules.Search.canSearch(
            user
        );

    if (!result.allowed)
        return res.status(403).json(result);

}

// -------------------------
// FILE
// -------------------------

if (policy.file) {

    console.log("FILE CHECK");

    const result = Rules.File.canUpload(user, req.file);

    console.log(result);

    if (!result.allowed) {
        console.log("FILE FAILED");
        return res.status(403).json(result);
    }

    console.log("FILE PASSED");
}

// -------------------------
// STORAGE
// -------------------------

if (policy.storage) {

    console.log("STORAGE CHECK");

    const result = Rules.Storage.canUpload(user);

    console.log(result);

    if (!result.allowed) {
        console.log("STORAGE FAILED");
        return res.status(403).json(result);
    }

    console.log("STORAGE PASSED");
}

// -------------------------
// MEDIA
// -------------------------

if (policy.media) {

    console.log("MEDIA CHECK");

    const result = Rules.Media.canUpload(user);

    console.log(result);

    if (!result.allowed) {
        console.log("MEDIA FAILED");
        return res.status(403).json(result);
    }

    console.log("MEDIA PASSED");
}

// -------------------------
// AI
// -------------------------

if (policy.ai) {

    const result =
        Rules.AI.canUseAI(
            user,
            policy.ai
        );

    if (!result.allowed)
        return res.status(403).json(result);

}

if (policy.verified) {

    console.log("VERIFIED CHECK");

    const result = Rules.Verification.canAccess(user);

    console.log(result);

    if (!result.allowed) {
        console.log("VERIFIED FAILED");
        return res.status(403).json(result);
    }

    console.log("VERIFIED PASSED");
}

 console.log("POLICY PASSED");
next();

        } catch (err) {

            next(err);

        }

    };

};
