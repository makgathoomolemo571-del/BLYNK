const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Rules = require("../rules");

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, UPLOAD_DIR);

    },

    filename(req, file, cb) {

        const ext = path.extname(file.originalname);

        const filename =
            `${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 10)}${ext}`;

        cb(null, filename);

    }

});

const fileFilter = (req, file, cb) => {

    try {

        const user = req.user;

        const fileRule =
            Rules.File.validate(file);
console.log("FILE RULE:", fileRule);

        if (!fileRule.allowed) {
            return cb(new Error(fileRule.message), false);
        }

        const mediaRule =
            Rules.Media.validate(file);

        if (!mediaRule.allowed) {
            return cb(new Error(mediaRule.message), false);
        }

        const storageRule =
            Rules.Storage.canUpload(user, file);

        if (!storageRule.allowed) {
            return cb(new Error(storageRule.message), false);
        }

        cb(null, true);

    } catch (err) {

        cb(err, false);

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 500 * 1024 * 1024,
        files: 10

    }

});

module.exports = upload;