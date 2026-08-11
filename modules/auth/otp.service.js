// modules/auth/otp.service.js

const tokenService =
    require("./token.service");

class OTPService {

    create() {

        return tokenService.generateOTP(6);

    }

    verify(input, stored) {

        return String(input) === String(stored);

    }

}

module.exports = new OTPService();