import { GlobalMessage, ValidationError } from '../types/types.global';
import { FormInstance, message } from 'antd';

export const handleError = (error: unknown) => {
  if (error && typeof error === 'object' && 'data' in error) {
    const e = error.data as GlobalMessage;
    void message.error(e.message);
  } else {
    void message.error('Что-то пошло не так. Попробуйте позже.');
  }
};

export const handleFormFieldError = (
  isError: boolean,
  error: unknown,
  form: FormInstance<any>,
) => {
  if (
    isError &&
    error &&
    typeof error === 'object' &&
    'data' in error &&
    'status' in error
  ) {
    if (error.status === 422) {
      const err = error.data as ValidationError;
      void message.error('Что-то пошло не так. Попробуйте позже.');
      form.setFields(
        err.message.map((e) => ({
          name: e.property,
          errors: [e.message],
        })),
      );
    } else if (error.status === 500) {
      void message.error(
        'Произошла внутренняя ошибка сервера. Попробуйте позже.',
      );
    }
  }
};
