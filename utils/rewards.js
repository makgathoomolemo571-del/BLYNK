function calculateVigPoints(actions) {

  let points = 0;

  if (actions.post) points += 5;
  if (actions.reelView) points += 1;
  if (actions.podcastListen) points += 3;
  if (actions.share) points += 4;
  if (actions.loginStreak) points += 10;

  return points;

}

function convertToVoucher(vigPoints) {

  if (vigPoints >= 50000) return "R500 Voucher";
  if (vigPoints >= 25000) return "R250 Voucher";
  if (vigPoints >= 10000) return "R100 Voucher";
  if (vigPoints >= 5000) return "R50 Voucher";
  if (vigPoints >= 2500) return "R25 Voucher";
  if (vigPoints >= 1000) return "R10 Voucher";

  return null;
}

module.exports = {
  calculateVigPoints,
  convertToVoucher
};