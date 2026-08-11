// src/rules/security/device.rules.js

const MAX_DEVICES_PER_ACCOUNT = 10;
const MAX_UNVERIFIED_DEVICES = 3;

const TRUST_DAYS = 30;

const DEVICE_STATUS = {
  PENDING: "PENDING",
  TRUSTED: "TRUSTED",
  BLOCKED: "BLOCKED",
  REMOVED: "REMOVED"
};

const DEVICE_TYPES = {
  WEB: "WEB",
  MOBILE: "MOBILE",
  TABLET: "TABLET",
  POS: "POS",
  API: "API"
};

const DeviceRules = {

  

  canAccess(device) {
    if (!device) {
      return {
        allowed: true,
        code: "OK"
      };
    }

    if (device.status === DEVICE_STATUS.BLOCKED) {
      return {
        allowed: false,
        code: "DEVICE_BLOCKED"
      };
    }

    return {
      allowed: true,
      code: "OK"
    };
  },


  canRegisterDevice(user, devices = []) {
    if (!user) return false;

    return devices.length < MAX_DEVICES_PER_ACCOUNT;
  },

  canLogin(device) {
    if (!device) return true;

    return device.status !== DEVICE_STATUS.BLOCKED;
  },

  requiresVerification(device) {
    if (!device) return true;

    return device.status !== DEVICE_STATUS.TRUSTED;
  },

  canTrust(device) {
    if (!device) return false;

    return (
      device.status === DEVICE_STATUS.PENDING &&
      device.emailVerified === true
    );
  },

  isTrusted(device) {
    if (!device) return false;

    return device.status === DEVICE_STATUS.TRUSTED;
  },

  isBlocked(device) {
    if (!device) return false;

    return device.status === DEVICE_STATUS.BLOCKED;
  },

  canRemove(device) {
    if (!device) return false;

    return device.status !== DEVICE_STATUS.REMOVED;
  },

  canAccessSensitiveAction(device) {
    if (!device) return false;

    return device.status === DEVICE_STATUS.TRUSTED;
  },

  exceedsDeviceLimit(devices = []) {
    return devices.length >= MAX_DEVICES_PER_ACCOUNT;
  },

  hasTooManyPendingDevices(devices = []) {
    return (
      devices.filter(
        d => d.status === DEVICE_STATUS.PENDING
      ).length >= MAX_UNVERIFIED_DEVICES
    );
  },

  trustExpires(device) {
    if (!device?.trustedAt) return true;

    const expires =
      new Date(device.trustedAt).getTime() +
      TRUST_DAYS * 24 * 60 * 60 * 1000;

    return Date.now() > expires;
  }

};

module.exports = DeviceRules;

// optional exports if other files need constants
module.exports.DEVICE_STATUS = DEVICE_STATUS;
module.exports.DEVICE_TYPES = DEVICE_TYPES;
module.exports.MAX_DEVICES_PER_ACCOUNT = MAX_DEVICES_PER_ACCOUNT;
module.exports.MAX_UNVERIFIED_DEVICES = MAX_UNVERIFIED_DEVICES;
module.exports.TRUST_DAYS = TRUST_DAYS;