import ru from 'antd/es/date-picker/locale/ru_RU';

export const apiURL = 'http://localhost:8000';

export enum TaskLabel {
  Testing = 'Тестирование',
  Research = 'Исследование',
  Design = 'UI/UX Design',
  Management = 'Менеджмент',
  Development = 'Разработка',
}

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
