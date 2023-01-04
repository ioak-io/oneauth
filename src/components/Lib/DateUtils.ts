import format from 'date-fns/format';

const currentYear = new Date().getFullYear();

const dateFormatWithoutYear = 'MMM d';
const dateFormat = 'MMM d, yyyy';

export const formatDateText = (dateText: string) => {
  if (dateText) {
    const date = new Date(dateText);
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

export const formatDate = (date: Date) => {
  if (date) {
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

export const days = (dateText: string) => {
  if (dateText) {
    const date = new Date(dateText);
    return (date.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
  }
  return 0;
};
