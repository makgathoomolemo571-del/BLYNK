class UserDTO {
    constructor({
        id,
        username,
        email,
        role,
        verified,
        emailVerified,
        status,
        createdAt,
        firstName,
        lastName,
        displayName,
        phone,
        country,
        province,
        city,

        // REFERRAL
        referralCode,
        referredBy,
        referralRewarded
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;

        this.verified = verified;
        this.emailVerified = emailVerified;

        this.status = status;
        this.createdAt = createdAt;

        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;

        this.phone = phone;
        this.country = country;
        this.province = province;
        this.city = city;

        // REFERRAL
        this.referralCode = referralCode || null;
        this.referredBy = referredBy || null;
        this.referralRewarded = Boolean(referralRewarded);
    }
}

module.exports = UserDTO;