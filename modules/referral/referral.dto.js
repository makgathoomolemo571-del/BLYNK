module.exports = {

  toDTO: (ref) => ({

    id: ref._id,

    referrer: ref.referrer,

    referredUser: ref.referredUser,

    code: ref.code,

    status: ref.status,

    referrerReward: {
      tokens: ref.referrerReward?.tokens || 0,
      points: ref.referrerReward?.points || 0,
      rewardGiven:
        ref.referrerReward?.rewardGiven || false,
      rewardedAt:
        ref.referrerReward?.rewardedAt || null
    },

    referredUserReward: {
      tokens: ref.referredUserReward?.tokens || 0,
      points: ref.referredUserReward?.points || 0,
      rewardGiven:
        ref.referredUserReward?.rewardGiven || false,
      rewardedAt:
        ref.referredUserReward?.rewardedAt || null
    },

    createdAt: ref.createdAt

  })

};