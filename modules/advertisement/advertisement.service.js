const Ad = require("./advertisement.model");
const mapper = require("./advertisement.mapper");
const events = require("./advertisement.events");

exports.create = async (data, eventBus) => {
    console.log("========== AD SERVICE ==========");
    console.log("DATA RECEIVED:", data);

    try {

        const ad = await Ad.create(data);

        console.log("AD SAVED:", ad);

        if (eventBus) {
            eventBus.emit(events.AD_CREATED, ad);
        }

        return mapper.toDTO(ad);

    } catch (err) {

        console.log("========== MONGOOSE ERROR ==========");
        console.log(err);
        console.log(err.errors);
        console.log(err.message);
        console.log(err.stack);

        throw err;
    }
};

exports.myAdvertisements = async (advertiser) => {

    const ads = await Ad.find({
        advertiser,
        isDeleted: false
    })
    .sort({ createdAt: -1 });

    return ads.map(mapper.toDTO);

};

exports.getAll = async (userId) => {

  const ads = await Ad.find({
    advertiser: userId,
    isDeleted: false
  });

  return ads.map(mapper.toDTO);

};

exports.update = async (id, data, eventBus) => {

  const ad = await Ad.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  eventBus.emit(events.AD_UPDATED, ad);

  return mapper.toDTO(ad);

};

exports.pause = async (id, eventBus) => {

  const ad = await Ad.findByIdAndUpdate(
    id,
    { status: "paused" },
    { new: true }
  );

  eventBus.emit(events.AD_PAUSED, ad);

  return mapper.toDTO(ad);

};

exports.resume = async (id, eventBus) => {

  const ad = await Ad.findByIdAndUpdate(
    id,
    { status: "active" },
    { new: true }
  );

  eventBus.emit(events.AD_RESUMED, ad);

  return mapper.toDTO(ad);

};

exports.trackClick = async (id, eventBus) => {

  const ad = await Ad.findByIdAndUpdate(
    id,
    { $inc: { clicks: 1 } },
    { new: true }
  );

  eventBus.emit(events.AD_CLICKED, ad);

  return mapper.toDTO(ad);

};

exports.trackImpression = async (id, eventBus) => {

  const ad = await Ad.findByIdAndUpdate(
    id,
    { $inc: { impressions: 1 } },
    { new: true }
  );

  eventBus.emit(events.AD_IMPRESSION, ad);

  return mapper.toDTO(ad);

};