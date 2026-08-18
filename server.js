require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// const cron = require("./jobs/cron");
const corsOptions = require("./config/cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/database");

const userRoutes =
require("./modules/user/user.routes");
const authRoutes =
require("./modules/auth/auth.routes");
const profileRoutes =
require("./modules/profile/profile.routes");
const notificationRoutes =
require("./modules/notification/notification.routes");
const subscriptionRoutes =
require("./modules/subscription/subscription.routes");
const walletRoutes =
require("./modules/wallet/wallet.routes");
const socialRoutes =
require("./modules/social/social.routes");
const postRoutes =
require("./modules/post/post.routes");
const reelRoutes =
require("./modules/reel/reel.routes");
const storyRoutes =
require("./modules/story/story.routes");
const podcastRoutes =
require("./modules/podcast/podcast.routes");
const episodeRoutes =
require("./modules/episode/episode.routes");
const watchPartyRoutes =
require("./modules/watchparty/watchparty.routes");
const marketplaceRoutes =
require("./modules/marketplace/marketplace.routes");
const creatorHireRoutes =
require("./modules/creatorHire/creatorHire.routes");
const businessFindRoutes =
require("./modules/businessFind/businessFind.routes");
const applicationRoutes =
require("./modules/application/application.routes");
const searchRoutes =
require("./modules/search/search.routes");
const analyticsRoutes =
require("./modules/analytics/analytics.routes");
const mediaRoutes =
require("./modules/media/media.routes");
const verificationRoutes =
require("./modules/verification/verification.routes");
const revenueRoutes =
require("./modules/revenue/revenue.routes");
const moderationRoutes = 
require("./modules/moderation/moderation.routes");
const supportRoutes = 
require("./modules/support/support.routes");
const recommendationRoutes =
require("./modules/recommendation/recommendation.routes");
const adminRoutes =
require("./modules/admin/admin.routes");
const advertisementRoutes =
require("./modules/advertisement/advertisement.routes");
const auditRoutes =
require("./modules/audit/audit.routes");
const paymentRoutes =
require("./modules/payment/payment.routes");
const referralRoutes =
require("./modules/referral/referral.routes");
const rewardRoutes =
require("./modules/reward/reward.routes");
const studioRoutes =
require("./modules/studio/studio.routes");
const monetizationRoutes =
require("./modules/monetization/monetization.routes");
const conversationRoutes =
require("./modules/message/conversation.routes");
const messageRoutes =
require("./modules/message/message.routes");
const sponsorshipRoutes =
require("./modules/sponsorship/sponsorship.routes");



require("./shared/listeners/subscription.listener");

require("./shared/listeners/wallet.listener");

const app = express();
const server = http.createServer(app);

// SOCKET ENGINE (REAL TIME SOCIAL LAYER)
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});
// ======================
// SECURITY LAYER
// ======================
app.use(helmet());

app.use(cors(corsOptions));
app.use((req, res, next) => {

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("REQUEST:", req.method, req.originalUrl);
    console.log("ORIGIN:", req.headers.origin);
    console.log("CONTENT-TYPE:", req.headers["content-type"]);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    next();
});

 app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));


app.use(morgan("combined"));

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "BLYNK API is alive",
        timestamp: new Date().toISOString()
    });
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "BLYNK API"
    });
});

// ======================
// SOCKET CORE (CHAT + LIVE)
// ======================
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/subscriptions",subscriptionRoutes);
app.use("/api/wallet",walletRoutes);
app.use("/api/social",socialRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/reels",reelRoutes);
app.use("/api/story",storyRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/episodes", episodeRoutes);
app.use("/api/watchparties", watchPartyRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/creator-hire", creatorHireRoutes);
app.use("/api/business-find", businessFindRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/verifications", verificationRoutes);
app.use("/api/revenues", revenueRoutes);
app.use("/api/moderation", moderationRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/studio", studioRoutes);
app.use("/api/monetization",monetizationRoutes);
app.use("/api/conversations",conversationRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/sponsorships", sponsorshipRoutes);

// ======================
// DATABASE + SERVER START
// ======================


const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🔥 Server running on ${PORT}`);
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();