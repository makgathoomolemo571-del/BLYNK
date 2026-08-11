const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "app.log");

function write(level, message, data = null) {
  const timestamp = new Date().toISOString();

  const log = {
    timestamp,
    level,
    message,
    data
  };

  const line = JSON.stringify(log) + "\n";

  fs.appendFileSync(logFile, line);
  
  console.log(`[${level}] ${message}`);
}

// ======================
// LOGGER API
// ======================

module.exports = {

  info: (msg, data) => write("INFO", msg, data),

  warn: (msg, data) => write("WARN", msg, data),

  error: (msg, data) => write("ERROR", msg, data),

  debug: (msg, data) => write("DEBUG", msg, data)

};