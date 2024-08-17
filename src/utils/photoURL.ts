import noPhoto from '../assets/no-photo.png';
import { apiURL } from '../common/constants';

const isUrlWithoutExtension = (url: string): boolean => {
  const regex = /\.(jpg|jpeg|png|gif|webp)$/i;
  return regex.test(url);
};

export const getPhotoUrl = (photo: string | null): string => {
  if (photo) {
    if (!isUrlWithoutExtension(photo)) {
      return photo;
    } else {
      return `${apiURL}/${photo}`;
    }
  } else {
    return noPhoto;
  }
};
