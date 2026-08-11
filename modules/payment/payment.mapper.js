const PaymentDTO = require("./payment.dto");

module.exports = {

  toDTO: (payment) => PaymentDTO.toDTO(payment)

};