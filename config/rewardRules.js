// config/blynkRewards.js

module.exports = {

    currency: {
        wallet: "BLYNK_TOKENS",
        points: "BLYNK_POINTS"
    },

    conversion: {

        tokensPerPoint: 100,

        vouchers: {
            1000:  "R10",
            2500:  "R25",
            5000:  "R50",
            10000: "R100",
            25000: "R250",
            50000: "R500"
        }

    },

    voucherCategories: [
        "Shopping",
        "Fuel",
        "Food",
        "Electricity",
        "Airtime",
        "Data",
        "Entertainment"
    ],

    restrictions: {

        allowCashWithdrawal: false,

        allowVoucherRedemption: true,

        allowPointTransfer: false,

        allowTokenTransfer: false

    }

};