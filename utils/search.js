function buildSearchQuery(query = "") {

  return {
    $text: {
      $search: query
    }
  };

}

function escapeRegex(text) {

  return text.replace(
    /[-\/\\^$*+?.()|[\]{}]/g,
    "\\$&"
  );

}

module.exports = {
  buildSearchQuery,
  escapeRegex
};