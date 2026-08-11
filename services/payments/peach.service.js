const axios = require("axios");
const config = require("../../config/peach.config");

class PeachService {

  async createCheckout({
    amount,
    merchantTransactionId,
    customerEmail,
    callbackUrl
  }) {

    try {

      const url =
        `${config.baseUrl}/v1/checkouts`;

      const params = new URLSearchParams();

      params.append("entityId", config.entityId);
      params.append("amount", amount);
      params.append("currency", config.currency);
      params.append("paymentType", "DB");

      params.append("merchantTransactionId", merchantTransactionId);
      params.append("customer.email", customerEmail);

      const response =
        await axios.post(url, params, {

          headers: {
            Authorization:
              `Bearer ${config.accessToken}`
          }

        });

      return response.data;

    } catch (err) {

      console.error("PEACH_ERROR:", err.response?.data || err.message);

      throw new Error("Payment initiation failed");

    }

  }

  async verifyPayment(checkoutId) {

    try {

      const url =
        `${config.baseUrl}/v1/checkouts/${checkoutId}/payment`;

      const response =
        await axios.get(url, {

          headers: {
            Authorization:
              `Bearer ${config.accessToken}`
          }

        });

      return response.data;

    } catch (err) {

      console.error("PEACH_VERIFY_ERROR:", err.message);

      throw new Error("Payment verification failed");

    }

  }

}

module.exports = new PeachService();