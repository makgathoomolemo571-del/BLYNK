const corsOptions = {
    origin: function (origin, callback) {

        const allowedOrigins = [
            "https://blynk.co.za",
            "https://www.blynk.co.za",

            "http://localhost:5173",
            "http://127.0.0.1:5173",

            "http://localhost:3000",
            "http://127.0.0.1:3000",

            "http://localhost:4000",
            "http://127.0.0.1:4000"
        ];

        // Allow requests with no Origin
        // e.g. Postman, Render health checks, server-to-server
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.log("❌ CORS BLOCKED ORIGIN:", origin);

        return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept"
    ],

    exposedHeaders: [
        "Authorization"
    ],

    optionsSuccessStatus: 204
};

module.exports = corsOptions;