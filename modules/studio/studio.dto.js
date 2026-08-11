exports.toDTO = (data) => ({

  id: data._id,
  creator: data.creator,
  title: data.title,
  description: data.description,
  status: data.status,
  contentType: data.contentType,
  media: data.media,
  scheduledAt: data.scheduledAt,
  publishedAt: data.publishedAt,
  engagement: data.engagement,
  createdAt: data.createdAt

});