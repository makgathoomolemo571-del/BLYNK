module.exports = {

  toDTO: (ref) => ({

    id: ref._id,

    referrer: ref.referrer,

    referredUser: ref.referredUser,

    code: ref.code,

    status: ref.status,

    rewardGiven: ref.rewardGiven,

    rewardAmount: ref.rewardAmount,

    createdAt: ref.createdAt

  })

};