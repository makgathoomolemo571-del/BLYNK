const Rules = require("../rules");

const clients = new Map();

module.exports = (limit = 60, windowMs = 60000) => {

    return (req, res, next) => {

        const key =
            req.user?._id?.toString() ||
            req.ip;

        const now = Date.now();

        let client = clients.get(key);

        if (!client) {

            client = {
                requests: 0,
                startedAt: now
            };

        }

        if (now - client.startedAt >= windowMs) {

            client.requests = 0;
            client.startedAt = now;

        }

        client.requests++;

        clients.set(key, client);

        if (
            Rules.Security?.canMakeRequest &&
            !Rules.Security.canMakeRequest(
                client.requests,
                limit
            )
        ) {

            return res.status(429).json({

                success: false,

                code: "RATE_LIMIT_EXCEEDED",

                message: "Too many requests.",

                retryAfter: Math.ceil(
                    (windowMs - (now - client.startedAt)) / 1000
                )

            });

        }

        next();

    };

};