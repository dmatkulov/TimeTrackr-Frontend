import { GlobalMessage } from '../types/types.global';
import { message } from 'antd';

export const handleError = (error: unknown) => {
  if (error && typeof error === 'object' && 'data' in error) {
    const e = error.data as GlobalMessage;
    void message.error(e.message);
  } else {
    void message.error('Что-то пошло не так');
  }
};
