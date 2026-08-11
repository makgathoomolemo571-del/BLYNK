const EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  JOIN_WATCHPARTY: "watchparty:join",
  LEAVE_WATCHPARTY: "watchparty:leave",

  START_STREAM: "stream:start",
  STOP_STREAM: "stream:stop",

  OFFER: "webrtc:offer",
  ANSWER: "webrtc:answer",
  ICE_CANDIDATE: "webrtc:ice-candidate",

  PRODUCER_CREATED: "producer:created",
  CONSUMER_CREATED: "consumer:created",

  CHAT_MESSAGE: "chat:message",

  VIEWER_COUNT: "viewer:count",

  ERROR: "watchparty:error"
};

module.exports = EVENTS;