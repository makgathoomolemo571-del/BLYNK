class ProfileDTO {
  constructor(data) {

    this.id = data._id;

   this.user = data.user
    ? {
        id: data.user._id,
        username: data.user.username,
        displayName: data.user.displayName,
        role: data.user.role,
        subscriptionPlan: data.user.subscriptionPlan,
        verified: data.user.verified,
        emailVerified: data.user.emailVerified,
        profilePicture: data.user.profilePicture,
      coverBanner: data.user.coverBanner
      }
    : null;

this.subscriptionPlan =
    data.user?.subscriptionPlan || null;

    this.username = data.user?.username;

    this.displayName =
      data.displayName || data.user?.displayName;

    this.role = data.user?.role;

    this.verified =
      data.user?.verified;

    this.profilePicture =
    data.profilePicture ||
    data.user?.profilePicture;

this.coverBanner =
    data.coverBanner ||
    data.user?.coverBanner;
    
    this.firstName =
      data.firstName;

    this.lastName =
      data.lastName;

    this.bio =
      data.bio;

    this.location =
      data.location;

    this.website =
      data.website;

    this.socials =
      data.socials;

    this.visibility =
      data.visibility;

    this.createdAt =
      data.createdAt;
      
      this.stats = data.stats || {
      posts: 0,
      reels: 0,
      followers: 0,
      following: 0,
    };

    this.gallery = data.gallery || [];
  }
}

module.exports = ProfileDTO;