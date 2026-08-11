class SubscriptionDTO {
  constructor(data) {

    this.id = data?._id || null;
    this.userId = data?.user || null;
    this.plan = data?.plan || null;
    this.status = data?.status || null;
    this.startDate = data?.startDate || null;
    this.endDate = data?.endDate || null;
    this.autoRenew = data?.autoRenew ?? null;
  }
}
module.exports = SubscriptionDTO;