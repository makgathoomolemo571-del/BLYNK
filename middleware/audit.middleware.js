const Audit = require("../modules/audit/audit.model");

module.exports = (action) => {

    return async (req, res, next) => {

        try {

            await Audit.create({

                user: req.user?._id || null,

                action,

                module: req.baseUrl,

                endpoint: req.originalUrl,

                method: req.method,

                ip: req.ip,

                userAgent: req.get("User-Agent"),

                status: "SUCCESS",

                requestBody: req.method === "GET"
                    ? undefined
                    : req.body,

                createdAt: new Date()

            });

        } catch (err) {

            console.error("Audit Error:", err);

            // Never block the request because audit logging failed.
        }

        next();

    };

};