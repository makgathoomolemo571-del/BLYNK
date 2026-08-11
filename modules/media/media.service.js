const mongoose = require("mongoose");
const cloudinary =
require("../../config/cloudinary");

console.log(cloudinary);
console.log(cloudinary.uploader);

const Media =
require("./media.model");

const mapper =
require("./media.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./media.events");

exports.upload =
async (
userId,
file,
module,
type
)=>{

  console.log("MEDIA SERVICE UPLOAD CALLED");
console.log(file);

const uploaded =
await cloudinary.uploader.upload(
file.path,
{
resource_type:"auto"
}
);

const media =
await Media.create({

owner:userId,

type,

module,

url:
uploaded.secure_url,

publicId:
uploaded.public_id,

originalName:
file.originalname,

mimeType:
file.mimetype,

size:
file.size

});

eventBus.emit(
EVENTS.MEDIA_UPLOADED,
{
mediaId:
media._id
}
);

return mapper.toDTO(
media
);
};

exports.getById =
async (id)=>{

  if(
    !mongoose.Types.ObjectId.isValid(id)
  ){
    return {
  success:false,
  message:"Invalid media id"
};
  }

  const media =
  await Media.findOne({

    _id:id,

    isDeleted:false

  });

  if(!media){
    throw new Error(
      "Media not found"
    );
  }

  return mapper.toDTO(media);
};

exports.remove =
async (id)=>{

if(
 !mongoose.Types.ObjectId.isValid(id)
){
 throw new Error(
   "Invalid media id"
 );
}

const media =
await Media.findById(id);

if(!media){
 throw new Error(
   "Media not found"
 );
}

media.isDeleted = true;

media.deletedAt =
new Date();

await media.save();

eventBus.emit(
EVENTS.MEDIA_DELETED,
{
mediaId:id
}
);

return {
 success:true
};

};

exports.stats = async () => {

  const total =
    await Media.countDocuments({
      isDeleted: false
    });

  const images =
    await Media.countDocuments({
      type: "image",
      isDeleted: false
    });

  const videos =
    await Media.countDocuments({
      type: "video",
      isDeleted: false
    });

  const audio =
    await Media.countDocuments({
      type: "audio",
      isDeleted: false
    });

  return {
    total,
    images,
    videos,
    audio
  };

};