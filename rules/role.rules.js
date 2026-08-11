/**
 * ============================================================================
 * BLYNK Role Rules
 * ============================================================================
 * Roles define WHAT a user is.
 * Subscriptions define WHAT they pay for.
 * ============================================================================
 */

const ROLES = Object.freeze({

  // Platform
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  SUPPORT: "SUPPORT",
  STAFF: "STAFF",

  // User Types
  MEMBER: "MEMBER",
  CREATOR: "CREATOR",
  BUSINESS: "BUSINESS",

  // System
  BOT: "BOT",
  API: "API"

});

const DEFAULT_ROLE = ROLES.MEMBER;

const ROLE_HIERARCHY = Object.freeze({

  BOT: 0,
  API: 0,

  MEMBER: 1,
  CREATOR: 2,
  BUSINESS: 3,

  STAFF: 4,
  SUPPORT: 5,
  MODERATOR: 6,

  ADMIN: 7,
  SUPER_ADMIN: 8

});

function isValid(role) {
  return Object.values(ROLES).includes(role);
}

function isAdmin(role) {
  return [
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ].includes(role);
}

function isModerator(role) {
  return [
    ROLES.MODERATOR,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ].includes(role);
}

function isStaff(role) {
  return [
    ROLES.STAFF,
    ROLES.SUPPORT,
    ROLES.MODERATOR,
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN
  ].includes(role);
}

function isMember(role) {
  return role === ROLES.MEMBER;
}

function isCreator(role) {
  return role === ROLES.CREATOR;
}

function isBusiness(role) {
  return role === ROLES.BUSINESS;
}

function hasRole(userRole, requiredRole) {

  return (
    ROLE_HIERARCHY[userRole] >=
    ROLE_HIERARCHY[requiredRole]
  );

}

module.exports = {

  ROLES,

  DEFAULT_ROLE,

  ROLE_HIERARCHY,

  isValid,

  isAdmin,

  isModerator,

  isStaff,

  isMember,

  isCreator,

  isBusiness,

  hasRole

};