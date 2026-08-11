const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL
});

// CONNECTION EVENTS
client.on("connect", () => {
  console.log("Redis connecting...");
});

client.on("ready", () => {
  console.log("Redis ready");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

// CONNECT
(async () => {
  await client.connect();
})();

// CACHE HELPERS
const setCache = async (key, value, ttl = 3600) => {
  await client.setEx(key, ttl, JSON.stringify(value));
};

const getCache = async (key) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

module.exports = {
  client,
  setCache,
  getCache
};