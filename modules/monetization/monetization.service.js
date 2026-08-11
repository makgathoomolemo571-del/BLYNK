const Monetization =
require("./monetization.model");

const Wallet =
require("../wallet/wallet.model");

const Revenue =
require("../revenue/revenue.model");

const Subscription =
require("../subscription/subscription.model");



/**
 * Creator / Business Monetization Dashboard
 */

exports.dashboard = async (userId) => {

    return Wallet.findOne({
        user: userId
    });

};

exports.wallet =
async(userId)=>{

return Wallet.findOne({
 user:userId
 });
 

};





/**
 * Get Revenue Summary
 */

exports.revenue =
async(userId)=>{

return exports.getRevenueSummary(userId);

};





/**
 * Record Revenue Event
 *
 * Used by:
 * subscription
 * marketplace
 * podcast
 * watchparty
 * creator hire
 */








/**
 * Check Monetization Eligibility
 */

exports.eligibility =
async(userId)=>{

const profile =
await Monetization.findOne({
user:userId
});


return {

eligible:
profile?.enabled || false

};

};






/**
 * Update Monetization Settings
 */

exports.settings =
async(userId,data)=>{

return Monetization.findOneAndUpdate(

{
user:userId
},

{
$set:data
},

{
new:true,
upsert:true
}

);

};

exports.analytics =
async(userId)=>{

const revenue =
await Revenue.aggregate([

{
$match:{
user:userId
}
},

{
$group:{
_id:"$source",
amount:{
$sum:"$amount"
}
}
}

]);


return revenue;

};