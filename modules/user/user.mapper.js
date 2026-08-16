const UserDTO = require("./user.dto");

const toUserDTO = (user) => {
    if (!user) return null;

    return new UserDTO({
        id: user._id
            ? user._id.toString()
            : user.id
                ? user.id.toString()
                : null,

        username: user.username,

        email: user.email,

        role: user.role,

        verified: Boolean(user.verified),

        emailVerified: Boolean(user.emailVerified),

        status:
            user.status ||
            user.accountStatus ||
            "ACTIVE",

        createdAt: user.createdAt,

        firstName: user.firstName,

        lastName: user.lastName,

        displayName:
            user.displayName ||
            user.username,

        phone: user.phone,

        country: user.country,

        province: user.province,

        city: user.city
    });
};

module.exports = {
    toUserDTO
};