import { CLOUDINARY } from '../constants/cloudinary.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export async function defineContactDataObject(req, res, next) {
  console.log('defineContactDataObject:--------------------------------');
  console.log('body', req.body);
  console.log('user', req.authUser);
  console.log('file', req.file);

  const authUser = req.authUser;
  const file = req.file;

  let contactData = {
    ...req.body,
    userId: authUser._id,
  };

  if (file === undefined) {
    req.contactData = contactData;
  } else {
    const photoUrl = await getPhotoUrl(file);
    console.log({ photoUrl });
    contactData.photo = photoUrl;
    req.contactData = contactData;
  }

  console.log({ contactData });
  next();
}

const getPhotoUrl = async (file) => {
  let photoUrl = null;
  if (CLOUDINARY.ENABLE === 'true') {
    photoUrl = await saveFileToCloudinary(file);
    return photoUrl;
  }
  photoUrl = await saveFileToUploadDir(file);
  return photoUrl;
};
