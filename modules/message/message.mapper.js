// src/modules/messages/message.mapper.js

const MessageDTO = require("./message.dto");

exports.toDTO = (message) =>
  new MessageDTO({
    id: message._id,

    conversation: message.conversation,

    sender: message.sender,

    text: message.text,

    attachments: message.attachments || [],

    replyTo: message.replyTo || null,

    forwardedFrom: message.forwardedFrom || null,

    reactions: message.reactions || [],

    mentions: message.mentions || [],

    status: message.status,

    edited: message.edited,

    editedAt: message.editedAt,

    deletedForEveryone: message.deletedForEveryone,

    createdAt: message.createdAt,

    updatedAt: message.updatedAt
  });

exports.toDTOList = (messages = []) =>
  messages.map(exports.toDTO);