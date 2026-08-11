module.exports = {

  toDTO: (r) => ({
    id: r._id,
    user: r.user,
    type: r.type,
    source: r.source,
    amount: r.amount,
    isRedeemed: r.isRedeemed,
    createdAt: r.createdAt
  })

};