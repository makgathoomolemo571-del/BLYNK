/**
 * ==========================================================
 * BLYNK PLATFORM
 * Email Rules
 * ==========================================================
 */

const disposableDomains = [
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "tempmail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "trashmail.com",
  "yopmail.com"
];

const EmailRules = {

  /**
   * Normalize email
   */
  normalize(email = "") {
    return email.trim().toLowerCase();
  },

  /**
   * Required
   */
  isRequired(email) {
    return typeof email === "string" && email.trim().length > 0;
  },

  /**
   * Format validation
   */
  isValidFormat(email) {

    const regex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return regex.test(email);

  },

  /**
   * Length
   */
  isValidLength(email) {

    return email.length >= 6 &&
           email.length <= 254;

  },

  /**
   * Disposable email detection
   */
  isDisposable(email) {

    const domain = email.split("@")[1];

    if (!domain) return false;

    return disposableDomains.includes(
      domain.toLowerCase()
    );

  },

  /**
   * Company email
   */
  isBusinessEmail(email) {

    const domain = email.split("@")[1];

    const publicDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com"
    ];

    return !publicDomains.includes(domain);

  },

  /**
   * Gmail
   */
  isGmail(email) {

    return email.endsWith("@gmail.com");

  },

  /**
   * Microsoft
   */
  isMicrosoft(email) {

    return (
      email.endsWith("@outlook.com") ||
      email.endsWith("@hotmail.com") ||
      email.endsWith("@live.com")
    );

  },

  /**
   * Domain extraction
   */
  getDomain(email) {

    return email.split("@")[1] || "";

  },

  /**
   * Local part
   */
  getUsername(email) {

    return email.split("@")[0] || "";

  },

  /**
   * Verification required
   */
  requiresVerification() {

    return true;

  },

  /**
   * Login allowed?
   */
  canLogin(user) {

    return user.emailVerified === true;

  },

  /**
   * Registration validation
   */
  validate(email) {

    email = this.normalize(email);

    if (!this.isRequired(email)) {

      return {
        valid: false,
        message: "Email is required."
      };

    }

    if (!this.isValidLength(email)) {

      return {
        valid: false,
        message: "Email length is invalid."
      };

    }

    if (!this.isValidFormat(email)) {

      return {
        valid: false,
        message: "Invalid email address."
      };

    }

    if (this.isDisposable(email)) {

      return {
        valid: false,
        message: "Disposable email addresses are not allowed."
      };

    }

    return {

      valid: true,

      email

    };

  }

};

module.exports = EmailRules;