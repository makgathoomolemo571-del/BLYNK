const Marketplace = require("./marketplace.model");
const mapper = require("./marketplace.mapper");
const EVENTS = require("./marketplace.events");
const eventBus = require("../../shared/eventBus");

// CREATE LISTING
exports.create = async (userId, data) => {
  const listing = await Marketplace.create({
    creator: userId,
    ...data
  });

  eventBus.emit(EVENTS.MARKETPLACE_CREATED, {
    listingId: listing._id,
    creatorId: userId
  });

  return mapper.toDTO(listing);
};

// GET ALL
exports.getAll = async () => {
  const listings = await Marketplace.find({ isDeleted: false });

  return listings.map(mapper.toDTO);
};

// GET MINE
exports.getMine = async (userId) => {
  const listings = await Marketplace.find({
    creator: userId,
    isDeleted: false
  });

  return listings.map(mapper.toDTO);
};

// GET BY ID
exports.getById = async (id) => {
  const listing = await Marketplace.findById(id);

  if (!listing || listing.isDeleted) return null;

  return mapper.toDTO(listing);
};

// UPDATE
exports.update = async (id, userId, data) => {
  const listing = await Marketplace.findOne({
    _id: id,
    creator: userId,
    isDeleted: false
  });

  if (!listing) return null;

  Object.assign(listing, data);
  await listing.save();

  eventBus.emit(EVENTS.MARKETPLACE_UPDATED, {
    listingId: id,
    userId
  });

  return mapper.toDTO(listing);
};

// DELETE (SOFT)
exports.remove = async (id, userId) => {
  const listing = await Marketplace.findOne({
    _id: id,
    creator: userId
  });

  if (!listing) return null;

  listing.isDeleted = true;
  listing.deletedAt = new Date();

  await listing.save();

  eventBus.emit(EVENTS.MARKETPLACE_DELETED, {
    listingId: id,
    userId
  });

  return true;
};

// APPLY
exports.apply = async (id, userId, data) => {
  const listing = await Marketplace.findById(id);

  if (!listing || listing.isDeleted) return null;

  listing.applications.push({
    applicant: userId,
    message: data.message,
    proposedPrice: data.proposedPrice
  });

  await listing.save();

  eventBus.emit(EVENTS.MARKETPLACE_APPLIED, {
    listingId: id,
    applicantId: userId
  });

  return true;
};

// GET APPLICATIONS
exports.getApplications = async (id, userId) => {
  const listing = await Marketplace.findOne({
    _id: id,
    creator: userId
  }).populate("applications.applicant", "username profilePicture");

  if (!listing) return null;

  return listing.applications;
};

exports.stats = async () => {

  const totalListings =
    await Marketplace.countDocuments({ isDeleted: false });

  const totalApplications =
    await Marketplace.aggregate([
      { $match: { isDeleted: false } },
      { $project: { applications: 1 } }
    ]);

  const totalApps =
    totalApplications.reduce(
      (sum, l) => sum + (l.applications?.length || 0),
      0
    );

  return {
    totalListings,
    totalApplications: totalApps
  };

};