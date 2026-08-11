// src/modules/messages/utils/upload.js

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");

const ROOT = path.join(process.cwd(), "uploads");
const MESSAGE_DIR = path.join(ROOT, "messages");

if (!fs.existsSync(ROOT)) {
  fs.mkdirSync(ROOT);
}

if (!fs.existsSync(MESSAGE_DIR)) {
  fs.mkdirSync(MESSAGE_DIR, { recursive: true });
}

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, MESSAGE_DIR);

  },

  filename(req, file, cb) {

    const ext = path.extname(file.originalname);

    const filename =
      `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;

    cb(null, filename);

  }

});

const fileFilter = (req, file, cb) => {

  const allowed = [

    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",

    "video/mp4",
    "video/webm",
    "video/quicktime",

    "audio/mpeg",
    "audio/mp3",
    "audio/mp4",
    "audio/wav",
    "audio/ogg",

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "application/vnd.ms-powerpoint",

    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    "application/zip",

    "application/x-rar-compressed"

  ];

  if (allowed.includes(file.mimetype)) {

    return cb(null, true);

  }

  cb(
    new Error("Unsupported file type"),
    false
  );

};

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 100 * 1024 * 1024 //100MB

  }

});

exports.single = upload.single("file");

exports.multiple = upload.array(
  "files",
  20
);

exports.fields = upload.fields([

  {
    name: "image",
    maxCount: 10
  },

  {
    name: "video",
    maxCount: 5
  },

  {
    name: "audio",
    maxCount: 5
  },

  {
    name: "document",
    maxCount: 10
  }

]);

exports.getFileUrl = filename => {

  if (!filename) return null;

  return `/uploads/messages/${filename}`;

};

exports.deleteFile = filename => {

  if (!filename) return;

  const filepath =
    path.join(
      MESSAGE_DIR,
      filename
    );

  if (fs.existsSync(filepath)) {

    fs.unlinkSync(filepath);

  }

};

exports.storage = storage;
exports.upload = upload;