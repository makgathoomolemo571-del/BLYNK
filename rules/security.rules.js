class SecurityRules {

   static canAccess(user) {

    if (!user) {
        return {
            allowed: false,
            code: "NOT_AUTHENTICATED"
        };
    }

    if (user.isDeleted === true) {
        return {
            allowed: false,
            code: "ACCOUNT_DELETED"
        };
    }

    const status = (
        user.accountStatus ||
        user.status ||
        "ACTIVE"
    ).toUpperCase();

    if (status !== "ACTIVE") {
        return {
            allowed: false,
            code: "ACCOUNT_INACTIVE"
        };
    }

    return {
        allowed: true
    };
}

    // Password

    static validatePassword(password){}

    static isCommonPassword(password){}

    static passwordStrength(password){}

    // Email

    static validateEmail(email){}

    static isDisposableEmail(email){}

    static normalizeEmail(email){}

    // Username

    static validateUsername(username){}

    static normalizeUsername(username){}

    // Phone

    static validatePhone(phone){}

    // Device

    static validateDevice(device){}

    static isTrustedDevice(device){}

    // Session

    static validateSession(session){}

    static sessionExpired(session){}

    // Login

    static loginAttemptsAllowed(user){}

    static accountLocked(user){}

    // Token

    static validateJWT(token){}

    static validateRefreshToken(token){}

    // Request

    static validateOrigin(req){}

    static validateIPAddress(req){}

    static validateUserAgent(req){}

    // API

    static rateLimitAllowed(req){}

    static verifySignature(req){}

    // Uploads

    static validateImage(file){}

    static validateVideo(file){}

    static validateDocument(file){}

    // General

    static sanitizeInput(data){}

    static detectInjection(data){}

    static detectXSS(data){}

    static detectSQLInjection(data){}

    static detectMongoInjection(data){}

    static detectCommandInjection(data){}

    static detectSpam(data){}

    static detectProfanity(data){}

}

module.exports = SecurityRules;