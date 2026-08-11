const transactionDTO =
require("./transaction.dto");

exports.toDTO =
(transaction) =>
transactionDTO.toDTO(transaction);