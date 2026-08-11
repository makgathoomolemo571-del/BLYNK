const cron = require("node-cron");

const Monetization =
require("../monetization.model");

const CreatorWallet =
require("../../wallet/wallet.model");

/*
|--------------------------------------------------------------------------
| Calculate Creator Earnings
|--------------------------------------------------------------------------
|
| Runs every hour.
|
| Moves pending earnings into creator wallets.
|
*/

async function processEarnings() {

try{

const pending =
await Monetization.find({

status:"pending"

});

for(const earning of pending){

let wallet =
await CreatorWallet.findOne({

owner:earning.creator

});

if(!wallet){

wallet =
await CreatorWallet.create({

owner:earning.creator,

balance:0,

pendingBalance:0,

withdrawableBalance:0

});

}

wallet.balance +=
earning.amount;

wallet.withdrawableBalance +=
earning.amount;

await wallet.save();

earning.status =
"paid";

earning.paidAt =
new Date();

await earning.save();

}

console.log(
`[MONETIZATION] ${pending.length} earnings processed.`
);

}catch(err){

console.error(
"[MONETIZATION CRON]",
err
);

}

}

function startEarningsCron(){

cron.schedule(

"0 * * * *",

processEarnings,

{

scheduled:true,

timezone:"Africa/Johannesburg"

}

);

console.log(
"✓ Earnings cron started."
);

}

module.exports = {

startEarningsCron,

processEarnings

};