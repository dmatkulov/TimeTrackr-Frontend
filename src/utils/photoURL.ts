import { Author, User } from '../types/types.user';
import noPhoto from '../assets/no-photo.png';
import { apiURL } from '../common/constants';

const isUrlWithoutExtension = (url: string): boolean => {
  const regex = /\.(jpg|jpeg|png|gif|webp)$/i;
  return regex.test(url);
};

export const getPhotoUrl = (user: User | Author): string => {
  if (user.photo) {
    if (!isUrlWithoutExtension(user.photo)) {
      return user.photo;
    } else {
      return `${apiURL}/${user.photo}`;
    }
  } else {
    return noPhoto;
  }
};
