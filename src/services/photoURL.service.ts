import { Author, User } from '../types/types.user';
import noPhoto from '../assets/no-photo.png';
import { apiURL } from '../helpers/constants';

const isUrlWithoutExtension = (url: string): boolean => {
  const regex = /\.(jpg|jpeg|png|gif|webp)$/i;
  return regex.test(url);
};

export const getPhotoUrl = (employee: User | Author): string => {
  if (employee.photo) {
    if (!isUrlWithoutExtension(employee.photo)) {
      return employee.photo;
    } else {
      return `${apiURL}/${employee.photo}`;
    }
  } else {
    return noPhoto;
  }
};
