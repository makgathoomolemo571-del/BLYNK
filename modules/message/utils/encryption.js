// src/modules/messages/utils/encryption.js

const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";

const SECRET =
process.env.MESSAGE_ENCRYPTION_KEY ||
"blynk-super-secret-message-key";

const KEY = crypto
.createHash("sha256")
.update(SECRET)
.digest();

const IV_LENGTH = 16;

exports.encrypt = (plainText = "") => {

  if (!plainText)
    return "";

  const iv =
  crypto.randomBytes(
    IV_LENGTH
  );

  const cipher =
  crypto.createCipheriv(
    ALGORITHM,
    KEY,
    iv
  );

  let encrypted =
  cipher.update(
    plainText,
    "utf8",
    "hex"
  );

  encrypted +=
  cipher.final("hex");

  const tag =
  cipher.getAuthTag();

  return [
    iv.toString("hex"),
    tag.toString("hex"),
    encrypted
  ].join(":");

};

exports.decrypt = (cipherText = "") => {

  if (!cipherText)
    return "";

  const parts =
  cipherText.split(":");

  if (parts.length !== 3)
    return cipherText;

  const iv =
  Buffer.from(
    parts[0],
    "hex"
  );

  const tag =
  Buffer.from(
    parts[1],
    "hex"
  );

  const encrypted =
  parts[2];

  const decipher =
  crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    iv
  );

  decipher.setAuthTag(
    tag
  );

  let decrypted =
  decipher.update(
    encrypted,
    "hex",
    "utf8"
  );

  decrypted +=
  decipher.final(
    "utf8"
  );

  return decrypted;

};

exports.hash = (value = "") => {

  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");

};

exports.compareHash = (
value,
hash
) => {

  return (
    exports.hash(value) ===
    hash
  );

};

exports.randomToken = (
length = 32
) => {

  return crypto
    .randomBytes(length)
    .toString("hex");

};