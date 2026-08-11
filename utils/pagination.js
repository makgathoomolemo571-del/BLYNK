function paginate(page = 1, limit = 20) {

  const skip = (page - 1) * limit;

  return {
    skip,
    limit
  };

}

function formatPagination(data, total, page, limit) {

  return {
    data,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  };

}

module.exports = {
  paginate,
  formatPagination
};