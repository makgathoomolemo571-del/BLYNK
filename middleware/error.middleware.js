module.exports = (err, req, res, next) => {

    console.error("========================================");
    console.error("ERROR:", err);
    console.error("URL:", req.originalUrl);
    console.error("METHOD:", req.method);
    console.error("USER:", req.user?._id || "Guest");
    console.error("========================================");

    let status = err.status || 500;
    let message = err.message || "Internal Server Error";

    // Joi Validation
    if (err.isJoi) {
        status = 400;
        message = err.details[0].message;
    }

    // Mongo Duplicate Key
    if (err.code === 11000) {
        status = 409;

        const field = Object.keys(err.keyPattern)[0];

        message = `${field} already exists`;
    }

    // Invalid Mongo ObjectId
    if (err.name === "CastError") {
        status = 400;
        message = "Invalid resource ID";
    }

    // Mongoose Validation
    if (err.name === "ValidationError") {
        status = 400;
        message = Object.values(err.errors)
            .map(e => e.message)
            .join(", ");
    }

    // JWT
    if (err.name === "JsonWebTokenError") {
        status = 401;
        message = "Invalid access token";
    }

    if (err.name === "TokenExpiredError") {
        status = 401;
        message = "Access token expired";
    }

    // Multer Upload
    if (err.name === "MulterError") {
        status = 400;
        message = err.message;
    }

    res.status(status).json({

        success: false,

        status,

        message,

        timestamp: new Date(),

        path: req.originalUrl,

        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack
        })

    });

};