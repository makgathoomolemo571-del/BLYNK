const cron =
require("node-cron");

const CreatorWallet =
require("../../wallet/wallet.model");

const CreatorPayout =
require("../models/creatorPayout.model");

/*
|--------------------------------------------------------------------------
| Automatic Payout Processor
|--------------------------------------------------------------------------
|
| Runs every midnight.
|
*/

async function processPayouts(){

try{

const payouts =
await CreatorPayout.find({

status:"approved"

});

for(const payout of payouts){

const wallet =
await CreatorWallet.findOne({

owner:payout.creator

});

if(!wallet)
continue;

wallet.withdrawableBalance -=
payout.amount;

await wallet.save();

payout.status =
"processing";

payout.processingAt =
new Date();

await payout.save();

}

console.log(

`[PAYOUTS] ${payouts.length} payouts queued.`

);

}catch(err){

console.error(

"[PAYOUT CRON]",

err

);

}

}

function startPayoutCron(){

cron.schedule(

"0 0 * * *",

processPayouts,

{

scheduled:true,

timezone:"Africa/Johannesburg"

}

);

console.log(

"✓ Payout cron started."

);

}

module.exports={

startPayoutCron,

processPayouts

};