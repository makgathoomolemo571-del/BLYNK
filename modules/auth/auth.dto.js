class AuthDTO {
  constructor(user, accessToken, refreshToken) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

module.exports = AuthDTO;