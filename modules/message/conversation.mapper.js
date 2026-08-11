// src/modules/messages/conversation.mapper.js

const ConversationDTO =
require("./conversation.dto");

exports.toDTO = (conversation) =>
  new ConversationDTO({

    id: conversation._id,

    type: conversation.type,

    title: conversation.title,

    description: conversation.description,

    avatar: conversation.avatar,

    participants: conversation.participants,

    admins: conversation.admins,

    owner: conversation.owner,

    lastMessage: conversation.lastMessage,

    lastSender: conversation.lastSender,

    lastMessageAt: conversation.lastMessageAt,

    unreadCount: conversation.unreadCount || 0,

    isPinned: conversation.isPinned,

    isArchived: conversation.isArchived,

    isMuted: conversation.isMuted,

    isLocked: conversation.isLocked,

    createdAt: conversation.createdAt,

    updatedAt: conversation.updatedAt

  });

exports.toDTOList = (conversations = []) =>
  conversations.map(exports.toDTO);