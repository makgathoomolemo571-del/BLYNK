const eventBus = require("../../shared/eventBus");

const emitUserRegistered = (payload) => {
  eventBus.emit(
    "USER_REGISTERED",
    payload
  );
};

const emitUserLoggedIn = (payload) => {
  eventBus.emit(
    "USER_LOGGED_IN",
    payload
  );
};

module.exports = {
  emitUserRegistered,
  emitUserLoggedIn
};