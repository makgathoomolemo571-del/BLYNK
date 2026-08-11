class PaymentDTO {

  static toDTO(payment) {

    return {
      id: payment._id,
      type: payment.type,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      reference: payment.reference,
      metadata: payment.metadata,
      createdAt: payment.createdAt
    };

  }

}

module.exports = PaymentDTO;