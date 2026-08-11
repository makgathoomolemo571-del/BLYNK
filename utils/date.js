function formatDate(date = new Date()) {
  return new Date(date).toISOString();
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isExpired(date) {
  return new Date(date) < new Date();
}

module.exports = {
  formatDate,
  addDays,
  isExpired
};