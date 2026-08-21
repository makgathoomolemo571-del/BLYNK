const Profile = require("./profile.model");
const Post = require("../post/post.model");
const Reel = require("../reel/reel.model");
const Follow = require("../social/social.model");
const ProfileDTO = require("./profile.dto");
const cloudinary = require("../../config/cloudinary");

exports.createProfile = async (userId, data) => {
profile = await Profile.create({
    user: userId,
    ...data
});

  let profile = await Profile.findOne({ user: userId });

  if (profile) {
    return new ProfileDTO(profile);
  }

  profile = await Profile.findById(profile._id)
.populate(
    "user",
    "username displayName role subscriptionPlan verified emailVerified profilePicture coverBanner"
);

  return new ProfileDTO(profile);
};

exports.getProfile = async (userId) => {
  let profile = await Profile.findOne({ user: userId })
.populate(
  "user",
  "username displayName role subscriptionPlan verified emailVerified profilePicture coverBanner"
);


  if (!profile) {
    throw new Error("Profile not found");
  }
const [posts, reels, followers, following] =
await Promise.all([
    Post.countDocuments({
        creator: userId,
        isDeleted:false
    }),

    Reel.countDocuments({
        creator: userId,
        isDeleted:false
    }),

   // People following THIS user
  Follow.countDocuments({
    targetUser: userId,
    relationshipType: "follow",
    status: "accepted",
    isDeleted: false,
  }),

  // People THIS user follows
  Follow.countDocuments({
    user: userId,
    relationshipType: "follow",
    status: "accepted",
    isDeleted: false,
  }),
]);

profile = profile.toObject();

profile.stats = {
  posts,
  reels,
  followers,
  following,
};

const gallery = await Post.find({
  creator: userId,
  isDeleted: false,
})
.sort({ createdAt: -1 })
.select("media caption createdAt likes comments");

profile.gallery = gallery;
console.log({
  posts,
  reels,
  followers,
  following,
});
return new ProfileDTO(profile);
};

exports.getProfileById = async (userId) => {

  const profile = await Profile.findOne({ user: userId })
.populate(
    "user",
    "username displayName role subscriptionPlan verified emailVerified profilePicture coverBanner referralCode"
);

  if (!profile) {
    throw new Error("Profile not found");
  }

  return new ProfileDTO(profile);
};

exports.updateProfile = async (userId, data) => {
  const allowedFields = {
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: data.displayName,
    bio: data.bio,
    location: data.location,
    website: data.website,
    socials: data.socials,
    visibility: data.visibility,

    
    profilePicture: data.profilePicture,
    coverBanner: data.coverBanner,
  };

  // remove undefined values
  Object.keys(allowedFields).forEach((key) => {
    if (allowedFields[key] === undefined) {
      delete allowedFields[key];
    }
  });

  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: allowedFields },
    {
      new: true,
      runValidators: true,
    }
  ).populate("user");

    if (!profile)
        throw new Error("Profile not found");

    profile.firstName = data.firstName ?? profile.firstName;
    profile.lastName = data.lastName ?? profile.lastName;
    profile.displayName = data.displayName ?? profile.displayName;
    profile.bio = data.bio ?? profile.bio;
    profile.website = data.website ?? profile.website;

    profile.location = {
        city: data.city ?? profile.location?.city ?? "",
        province: data.province ?? profile.location?.province ?? "",
        country: data.country ?? profile.location?.country ?? ""
    };

    await profile.save();

    return new ProfileDTO(
        await profile.populate("user")
    );

};

exports.uploadAvatar = async (userId, file) => {

    if (!file)
        throw new Error("No file uploaded");

    const result = await cloudinary.uploader.upload(file.path, {
        folder: "profile/avatar"
    });

    const profile = await Profile.findOneAndUpdate(
        { user: userId },
        {
            profilePicture: result.secure_url
        },
        { new: true }
    ).populate(
        "user",
        "username displayName role subscriptionPlan verified emailVerified profilePicture coverBanner"
    );

    return new ProfileDTO(profile);
};

exports.uploadBanner = async (userId, file) => {

    if (!file)
        throw new Error("No file uploaded");

    const result = await cloudinary.uploader.upload(file.path, {
        folder: "profile/banner"
    });

    const profile = await Profile.findOneAndUpdate(
        { user: userId },
        {
            coverBanner: result.secure_url
        },
        { new: true }
    ).populate(
        "user",
        "username displayName role subscriptionPlan verified emailVerified profilePicture coverBanner"
    );

    return new ProfileDTO(profile);
};

exports.stats = async () => {
  const totalProfiles = await Profile.countDocuments();
  const creators = await Profile.countDocuments({ accountType: "creator" });
  const businesses = await Profile.countDocuments({ accountType: "business" });

  return {
    totalProfiles,
    creators,
    businesses
  };
};