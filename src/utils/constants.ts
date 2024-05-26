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
function secondsToHoursAndMinutes(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (minutes > 0) {
    return `${hours} ч. ${minutes} мин.`;
  } else {
    return `${hours} ч.`;
  }
}

export const formattedDay = (day: Date | string) => {
  return dayjs(day).format('YYYY-MM-DD');
};

export const countTimeSpent = (start: string, end: string) => {
  const a = start.split(':');
  const b = end.split(':');

  const secondsA = +a[0] * 60 * 60 + +a[1] * 60;
  const secondsB = +b[0] * 60 * 60 + +b[1] * 60;

  const result = secondsB - secondsA;
  return secondsToHoursAndMinutes(result);
};

// const getDisabledEndTime = (name: number): DisabledTimes => {
//   const startTime = form.getFieldValue(['tasks', name, 'startTime']);
//
//   return {
//     disabledHours: () => {
//       const disabled: number[] = [];
//       const startHour = formattedTime(startTime).split(':');
//       const hour = +startHour[0];
//       for (let i = 0; i < 24; i++) {
//         if (i < hour || i > 18) {
//           disabled.push(i);
//         }
//       }
//       return disabled;
//     },
//   };
// };
