function success(res, data, message = "success") {
  return res.json({
    success: true,
    message,
    data
  });
}

function error(res, message = "error", code = 500) {
  return res.status(code).json({
    success: false,
    message
  });
}

module.exports = {
  success,
  error
};