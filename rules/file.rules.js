const path = require("path");

const FileRules = {

    allowedExtensions: [

        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",

        ".mp4",
        ".mov",
        ".avi",

        ".mp3",
        ".wav",

        ".pdf",

        ".doc",
        ".docx",

        ".xls",
        ".xlsx",

        ".ppt",
        ".pptx"

    ],

    maxFileSize: {

        image: 10 * 1024 * 1024,

        video: 500 * 1024 * 1024,

        audio: 100 * 1024 * 1024,

        document: 20 * 1024 * 1024

    },

    isAllowedExtension(filename) {

        const ext = path.extname(filename).toLowerCase();

        return this.allowedExtensions.includes(ext);

    },

   canUpload(user, file) {

    if (!file) {
        return {
            allowed:false,
            message:"No file received"
        };
    }

    return {
        allowed:true,
        code:"OK"
    };
},


    canDelete(user, ownerId) {

        if (!user) return false;

        if (
            String(user._id) === String(ownerId)
        ) return true;

        return [
            "admin",
            "superadmin"
        ].includes(user.role);

    },

    canDownload(user) {

        if (!user) return false;

        return user.status === "active";

    },

    validateSize(type, size) {

        return size <= this.maxFileSize[type];

    },
    validate(file) {

    if (!file) {
        return {
            allowed: false,
            message: "No file uploaded"
        };
    }

    if (!this.isAllowedExtension(file.originalname)) {
        return {
            allowed: false,
            message: "Invalid file type"
        };
    }

    return {
        allowed: true,
        code: "OK"
    };
},
};

module.exports = FileRules;