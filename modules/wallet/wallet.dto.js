exports.toDTO = (wallet) => ({
  id: wallet._id,
  userId: wallet.user,
  balance: wallet.balance,
  currency: wallet.currency,
  status: wallet.status,
  totalDeposits: wallet.totalDeposits,
  totalWithdrawals: wallet.totalWithdrawals,
  totalRevenue: wallet.totalRevenue,
  createdAt: wallet.createdAt
});