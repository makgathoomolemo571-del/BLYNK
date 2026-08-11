function getMediaType(mimetype) {

  if (mimetype.startsWith("image")) return "image";
  if (mimetype.startsWith("video")) return "video";
  if (mimetype.startsWith("audio")) return "audio";
  return "document";

}

function isValidMediaSize(size, maxSizeMB) {
  return size <= maxSizeMB * 1024 * 1024;
}

module.exports = {
  getMediaType,
  isValidMediaSize
};