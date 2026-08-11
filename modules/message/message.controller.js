const service = require("./message.service");

/**
 * CREATE
 */
exports.create = async (req, res, next) => {
  try {
    res.status(201).json(
      await service.create(req.user._id, req.body)
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET CONVERSATION
 */
exports.getConversationMessages = async (req, res, next) => {
  try {
    res.json(
      await service.getConversationMessages(
        req.params.conversationId,
        req.user._id,
        req.query
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET ONE
 */
exports.getById = async (req, res, next) => {
  try {
    res.json(
      await service.getById(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE
 */
exports.update = async (req, res, next) => {
  try {
    res.json(
      await service.update(
        req.params.id,
        req.user._id,
        req.body
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE
 */
exports.delete = async (req, res, next) => {
  try {
    res.json(
      await service.delete(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE FOR EVERYONE
 */
exports.deleteForEveryone = async (req, res, next) => {
  try {
    res.json(
      await service.deleteForEveryone(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * READ
 */
exports.markRead = async (req, res, next) => {
  try {
    res.json(
      await service.markRead(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * REACT
 */
exports.react = async (req, res, next) => {
  try {
    res.json(
      await service.react(
        req.params.id,
        req.user._id,
        req.body
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * REMOVE REACTION
 */
exports.removeReaction = async (req, res, next) => {
  try {
    res.json(
      await service.removeReaction(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * REPLY
 */
exports.reply = async (req, res, next) => {
  try {
    res.status(201).json(
      await service.reply(
        req.user._id,
        req.params.id,
        req.body
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * FORWARD
 */
exports.forward = async (req, res, next) => {
  try {
    res.status(201).json(
      await service.forward(
        req.user._id,
        req.params.id,
        req.body
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * PIN
 */
exports.pin = async (req, res, next) => {
  try {
    res.json(
      await service.pin(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * UNPIN
 */
exports.unpin = async (req, res, next) => {
  try {
    res.json(
      await service.unpin(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * STAR
 */
exports.star = async (req, res, next) => {
  try {
    res.json(
      await service.star(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * UNSTAR
 */
exports.unstar = async (req, res, next) => {
  try {
    res.json(
      await service.unstar(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * SHARE
 */
exports.share = async (req, res, next) => {
  try {
    res.json(
      await service.share(
        req.params.id,
        req.user._id
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * UPLOAD
 */
exports.uploadAttachment = async (req, res, next) => {
  try {
    res.json(
      await service.upload(
        req.user._id,
        req.file
      )
    );
  } catch (err) {
    next(err);
  }
};

/**
 * SEARCH
 */
exports.search = async (req, res, next) => {
  try {
    res.json(
      await service.search(
        req.params.conversationId,
        req.user._id,
        req.query
      )
    );
  } catch (err) {
    next(err);
  }
};