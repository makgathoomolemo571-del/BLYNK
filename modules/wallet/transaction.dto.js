exports.toDTO = (tx) => ({
  id: tx._id,
  type: tx.type,
  amount: tx.amount,
  currency: tx.currency,
  status: tx.status,
  reference: tx.reference,
  description: tx.description,
  createdAt: tx.createdAt
});