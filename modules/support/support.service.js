const Support =
require("./support.model");

const mapper =
require("./support.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./support.events");

const generateTicketNumber =
() =>
`SUP-${Date.now()}`;

exports.createTicket =
async (
userId,
data
) => {

const ticket =
await Support.create({

ticketNumber:
generateTicketNumber(),

user:userId,

...data

});

eventBus.emit(
EVENTS.SUPPORT_TICKET_CREATED,
{
ticketId:ticket._id
}
);

return mapper.toDTO(
ticket
);

};

exports.getAllTickets = async () => {

    const tickets = await Support.find({})
        .populate("user", "username email")
        .sort({ createdAt: -1 });

    return tickets;
};

exports.getMyTickets =
async (userId) => {

const tickets =
await Support.find({

user:userId,

isDeleted:false

})
.sort({
createdAt:-1
});

return tickets.map(
mapper.toDTO
);

};

exports.getTicket =
async (id) => {

const ticket =
await Support.findById(id);

if(!ticket)
throw new Error(
"Ticket not found"
);

return mapper.toDTO(
ticket
);

};

exports.assignTicket =
async (
ticketId,
agentId
) => {

const ticket =
await Support.findById(
ticketId
);

if(!ticket)
throw new Error(
"Ticket not found"
);

ticket.assignedAgent =
agentId;

ticket.status =
"in_progress";

await ticket.save();

eventBus.emit(
EVENTS.SUPPORT_TICKET_ASSIGNED,
{
ticketId
}
);

return mapper.toDTO(
ticket
);

};

exports.updateStatus =
async (
ticketId,
status
) => {

const ticket =
await Support.findById(
ticketId
);

if(!ticket)
throw new Error(
"Ticket not found"
);

ticket.status =
status;

await ticket.save();

eventBus.emit(
EVENTS.SUPPORT_TICKET_UPDATED,
{
ticketId,
status
}
);

return mapper.toDTO(
ticket
);

};

exports.resolveTicket =
async (
ticketId,
notes
) => {

const ticket =
await Support.findById(
ticketId
);

if(!ticket)
throw new Error(
"Ticket not found"
);

ticket.status =
"resolved";

ticket.resolutionNotes =
notes;

await ticket.save();

eventBus.emit(
EVENTS.SUPPORT_TICKET_RESOLVED,
{
ticketId
}
);

return mapper.toDTO(
ticket
);

};

exports.closeTicket =
async (ticketId) => {

const ticket =
await Support.findById(
ticketId
);

if(!ticket)
throw new Error(
"Ticket not found"
);

ticket.status =
"closed";

await ticket.save();

eventBus.emit(
EVENTS.SUPPORT_TICKET_CLOSED,
{
ticketId
}
);

return mapper.toDTO(
ticket
);

};

exports.stats = async () => {

  const total =
    await Support.countDocuments();

  const open =
    await Support.countDocuments({
      status: "open"
    });

  const resolved =
    await Support.countDocuments({
      status: "resolved"
    });

  const closed =
    await Support.countDocuments({
      status: "closed"
    });

  return {

    total,
    open,
    resolved,
    closed

  };

};