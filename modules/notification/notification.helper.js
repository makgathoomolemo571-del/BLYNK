const notificationService =
require("./notification.service");


exports.sendNotification =
async({

recipient,
actor,
type,
title,
message,
entityType,
entityId

})=>{


return notificationService.create({

recipient,
actor,
type,
title,
message,
entityType,
entityId

});


};