const service =
require("./support.service");

exports.createTicket =
async (
req,
res,
next
) => {

try {

const result =
await service.createTicket(

req.user._id,

req.body

);

res.status(201)
.json(result);

}
catch(err){

next(err);

}

};

exports.getMyTickets = async (req, res, next) => {
  try {
    console.log("req.user =", req.user);

    const result = await service.getMyTickets(req.user._id);
console.log("RESULT:", result);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getTicket =
async (
req,
res,
next
) => {

try {

const result =
await service.getTicket(
req.params.id
);

res.json(result);

}
catch(err){

next(err);

}

};

exports.assignTicket =
async (
req,
res,
next
) => {

try {

const result =
await service.assignTicket(

req.params.id,

req.user._id

);

res.json(result);

}
catch(err){

next(err);

}

};

exports.updateStatus =
async (
req,
res,
next
) => {

try {

const result =
await service.updateStatus(

req.params.id,

req.body.status

);

res.json(result);

}
catch(err){

next(err);

}

};

exports.resolveTicket =
async (
req,
res,
next
) => {

try {

const result =
await service.resolveTicket(

req.params.id,

req.body.resolutionNotes

);

res.json(result);

}
catch(err){

next(err);

}

};

exports.closeTicket =
async (
req,
res,
next
) => {

try {

const result =
await service.closeTicket(
req.params.id
);

res.json(result);

}
catch(err){

next(err);

}

};