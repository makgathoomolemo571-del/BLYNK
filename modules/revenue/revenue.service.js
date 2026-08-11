const Revenue =
require("./revenue.model");

const mapper =
require("./revenue.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./revenue.events");

exports.create =
async (
userId,
data
)=>{

const revenue =
await Revenue.create({

user:userId,

...data

});

eventBus.emit(
EVENTS.REVENUE_CREATED,
{
revenueId:
revenue._id
}
);

return mapper.toDTO(
revenue
);

};

exports.getMine =
async (userId)=>{

const records =
await Revenue.find({

user:userId,

isDeleted:false

})
.sort({
createdAt:-1
});

return records.map(
mapper.toDTO
);

};

exports.markPaid =
async (id)=>{

const revenue =
await Revenue.findById(id);

if(!revenue)
throw new Error(
"Revenue not found"
);

revenue.status =
"paid";

revenue.paidAt =
new Date();

await revenue.save();

eventBus.emit(
EVENTS.REVENUE_PAID,
{
revenueId:id
}
);

return mapper.toDTO(
revenue
);

};

exports.summary =
async (userId)=>{

const revenues =
await Revenue.find({

user:userId,

status:"paid",

isDeleted:false

});

const total =
revenues.reduce(
(sum,item)=>
sum + item.amount,
0
);

return {

totalRevenue:total,

count:
revenues.length

};

};

exports.stats = async (userId) => {

  const revenues = await Revenue.find({
    user: userId,
    isDeleted: false
  });

  const paid = revenues.filter(
    r => r.status === "paid"
  );

  const pending = revenues.filter(
    r => r.status === "pending"
  );

  const totalRevenue = paid.reduce(
    (sum, r) => sum + r.amount,
    0
  );

  return {

    totalRevenue,
    totalCount: revenues.length,
    paidCount: paid.length,
    pendingCount: pending.length

  };

};