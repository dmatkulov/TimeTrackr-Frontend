import ru from 'antd/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';

export const apiURL = 'http://localhost:8000';

export const buddhistLocale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: 'YYYY-MM-DD',
    fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    yearFormat: 'YYYY',
    cellYearFormat: 'YYYY',
  },
};

type DisabledTimes = {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};

export const disabledTime = (): DisabledTimes => {
  return {
    disabledHours: () => {
      const disabled: number[] = [];
      for (let i = 0; i < 24; i++) {
        if (i < 9 || i > 18) {
          disabled.push(i);
        }
      }
      return disabled;
    },
  };
};

export const format = 'HH:mm';
export const formattedTime = (time: string) => {
  return dayjs(time).format(format);
};

export const convertTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let message: string;
  if (hours === 0) {
    message = `${minutes} минут`;
  } else if (minutes === 0) {
    message = `${hours} часов`;
  } else {
    message = `${hours} ч. ${minutes} мин.`;
  }
  return message;
};

export const formattedDay = (day: Date | string) => {
  return dayjs(day).format('YYYY-MM-DD');
};
