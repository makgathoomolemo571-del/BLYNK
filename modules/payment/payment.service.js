const Payment = require("./payment.model");
const mapper = require("./payment.mapper");
const events = require("./payment.events");

const eventBus = require("../../shared/eventBus");

class PaymentService {

  async create(data, userId) {

    const payment = await Payment.create({

      user: userId,
      ...data,
      status: "completed",
      reference: `PAY-${Date.now()}`

    });

    eventBus.emit(events.PAYMENT_CREATED, payment);

    return mapper.toDTO(payment);

  }

  async getUserPayments(userId) {

    const payments = await Payment.find({
      user: userId,
      isDeleted: false
    }).sort({ createdAt: -1 });

    return payments.map(mapper.toDTO);

  }

  async stats() {

    const total = await Payment.countDocuments();

    const revenue = await Payment.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    return {
      total,
      revenue
    };

  }

}

module.exports = new PaymentService();