const allowedOrigins = [
   "http://localhost:5173",
    "http://127.0.0.1:5173",

    "http://localhost:3000",
    "http://127.0.0.1:3000",

    "http://localhost:4000",
    "http://127.0.0.1:4000",

    "https://blynk.co.za",
    "https://www.blynk.co.za"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS policy"));
    }
  },

  credentials: true,

  methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS"
    ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],

  exposedHeaders: ["Authorization"]
};

module.exports = corsOptions;