const Audit = require("./audit.model");

class AuditService {

  async log({
    user = null,
    action,
    module,
    metadata = {},
    ip,
    userAgent,
    status = "success"
  }) {

    return await Audit.create({
      user,
      action,
      module,
      metadata,
      ip,
      userAgent,
      status
    });

  }

  async getAll() {

    return await Audit.find({ isDeleted: false })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

  }

  async getByUser(userId) {

    return await Audit.find({
      user: userId,
      isDeleted: false
    }).sort({ createdAt: -1 });

  }

  async stats() {

    const total = await Audit.countDocuments();

    const success = await Audit.countDocuments({
      status: "success"
    });

    const failed = await Audit.countDocuments({
      status: "failed"
    });

    const byModule = await Audit.aggregate([
      {
        $group: {
          _id: "$module",
          count: { $sum: 1 }
        }
      }
    ]);

    return {
      total,
      success,
      failed,
      byModule
    };

  }

}

module.exports = new AuditService();