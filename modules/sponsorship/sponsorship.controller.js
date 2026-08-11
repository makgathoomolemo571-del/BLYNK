// modules/sponsorship/sponsorship.controller.js

const service = require("./sponsorship.service");

/**
 * ==========================================
 * CREATE SPONSORSHIP
 * POST /sponsorships
 * ==========================================
 */
exports.create = async (req, res, next) => {
   console.log("CONTROLLER REACHED");

  try {
    const result = await service.create(
      req.user._id,
      req.body
    );

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
    try {
        const sponsorships = await Sponsorship.find({
            business: req.user._id
        }).sort({ createdAt: -1 });

        res.json(sponsorships);
    } catch (err) {
        next(err);
    }
};

/**
 * ==========================================
 * GET ALL SPONSORSHIPS
 * GET /sponsorships
 * ==========================================
 */
exports.getAll = async (req, res, next) => {
  try {

    const result = await service.getAll(
      req.query
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * GET MY SPONSORSHIPS
 * GET /sponsorships/my
 * ==========================================
 */
exports.getMine = async (req, res, next) => {
  try {

    const result = await service.getMine(
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * GET RECEIVED SPONSORSHIPS
 * GET /sponsorships/received
 * ==========================================
 */
exports.getReceived = async (req, res, next) => {
  try {

    const result = await service.getReceived(
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * GET SINGLE SPONSORSHIP
 * GET /sponsorships/:id
 * ==========================================
 */
exports.getById = async (req, res, next) => {
  try {

    const result = await service.getById(
      req.params.id,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * UPDATE SPONSORSHIP
 * PATCH /sponsorships/:id
 * ==========================================
 */
exports.update = async (req, res, next) => {
  try {

    const result = await service.update(
      req.params.id,
      req.user._id,
      req.body
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * APPLY TO SPONSORSHIP
 * POST /sponsorships/:id/apply
 * ==========================================
 */
exports.apply = async (req, res, next) => {
  try {

    const result = await service.apply(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * ACCEPT CREATOR
 * PATCH /sponsorships/:id/accept/:creatorId
 * ==========================================
 */
exports.acceptCreator = async (req, res, next) => {
  try {

    const result = await service.acceptCreator(
      req.params.id,
      req.params.creatorId,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * REJECT CREATOR
 * PATCH /sponsorships/:id/reject/:creatorId
 * ==========================================
 */
exports.rejectCreator = async (req, res, next) => {
  try {

    const result = await service.rejectCreator(
      req.params.id,
      req.params.creatorId,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * START CAMPAIGN
 * PATCH /sponsorships/:id/start
 * ==========================================
 */
exports.start = async (req, res, next) => {
  try {

    const result = await service.start(
      req.params.id,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * COMPLETE CAMPAIGN
 * PATCH /sponsorships/:id/complete
 * ==========================================
 */
exports.complete = async (req, res, next) => {
  try {

    const result = await service.complete(
      req.params.id,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * CANCEL CAMPAIGN
 * PATCH /sponsorships/:id/cancel
 * ==========================================
 */
exports.cancel = async (req, res, next) => {
  try {

    const result = await service.cancel(
      req.params.id,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * RELEASE PAYMENT
 * POST /sponsorships/:id/release-payment
 * ==========================================
 */
exports.releasePayment = async (req, res, next) => {
  try {

    const result = await service.releasePayment(
      req.params.id,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * DELETE SPONSORSHIP
 * DELETE /sponsorships/:id
 * ==========================================
 */
exports.delete = async (req, res, next) => {
  try {

    const result = await service.delete(
      req.params.id,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * FEATURED SPONSORSHIPS
 * GET /sponsorships/featured
 * ==========================================
 */
exports.featured = async (req, res, next) => {
  try {
    const result = await service.featured();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * CANCEL APPLICATION
 * DELETE /sponsorships/:id/apply
 * ==========================================
 */
exports.cancelApplication = async (req, res, next) => {
  try {
    const result = await service.cancelApplication(
      req.params.id,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * GET APPLICATIONS
 * GET /sponsorships/:id/applications
 * ==========================================
 */
exports.getApplications = async (req, res, next) => {
  try {
    const result = await service.getApplications(
      req.params.id,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * ACCEPT APPLICATION
 * PATCH /:id/applications/:applicationId/accept
 * ==========================================
 */
exports.acceptApplication = async (req, res, next) => {
  try {
    const result = await service.acceptApplication(
      req.params.id,
      req.params.applicationId,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * REJECT APPLICATION
 * PATCH /:id/applications/:applicationId/reject
 * ==========================================
 */
exports.rejectApplication = async (req, res, next) => {
  try {
    const result = await service.rejectApplication(
      req.params.id,
      req.params.applicationId,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * SUBMIT DELIVERABLE
 * POST /:id/submit
 * ==========================================
 */
exports.submitDeliverable = async (req, res, next) => {
  try {
    const result = await service.submitDeliverable(
      req.params.id,
      req.user._id,
      req.body
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * APPROVE DELIVERABLE
 * PATCH /:id/approve
 * ==========================================
 */
exports.approveDeliverable = async (req, res, next) => {
  try {
    const result = await service.approveDeliverable(
      req.params.id,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * REJECT DELIVERABLE
 * PATCH /:id/reject
 * ==========================================
 */
exports.rejectDeliverable = async (req, res, next) => {
  try {
    const result = await service.rejectDeliverable(
      req.params.id,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * REFUND
 * POST /:id/refund
 * ==========================================
 */
exports.refund = async (req, res, next) => {
  try {
    const result = await service.refund(
      req.params.id,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * MY ANALYTICS
 * GET /analytics/me
 * ==========================================
 */
exports.myAnalytics = async (req, res, next) => {
  try {
    const result = await service.myAnalytics(
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * ==========================================
 * CAMPAIGN ANALYTICS
 * GET /analytics/:id
 * ==========================================
 */
exports.analytics = async (req, res, next) => {
  try {
    const result = await service.analytics(
      req.params.id,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};