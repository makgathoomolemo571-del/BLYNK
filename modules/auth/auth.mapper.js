const AuthDTO = require("../auth/auth.dto");

const mapAuthResponse = (
  userDTO,
  accessToken,
  refreshToken
) => {
  return new AuthDTO(
    userDTO,
    accessToken,
    refreshToken
  );
};

module.exports = {
  mapAuthResponse
};