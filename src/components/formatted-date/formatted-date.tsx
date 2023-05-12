import React, { FC } from 'react';
import plural from 'plural-ru';

type TFormattedDate = {
  date: Date;
  className?: string;
};

const getDiffDays = (date: Date) => {
  const fullDayMs = 1000 * 60 * 60 * 24;
  const currentDate = new Date();
  const localTimeOffsetMs = 0 - (currentDate.getTimezoneOffset() * 1000 * 60);
  const currentDateMs = currentDate.getTime();
  const dateMs = date.getTime();
  const fullDaysDiff = Math.floor((currentDateMs - dateMs) / fullDayMs);
  if (((currentDateMs + localTimeOffsetMs) % fullDayMs) >= ((dateMs + localTimeOffsetMs) % fullDayMs )) {
    return fullDaysDiff;
  } else {
    return fullDaysDiff + 1;
  }
};

const getFormattedTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const getFormattedDate = (date: Date): string => {
  const diffDays = getDiffDays(date);
  return `${plural(diffDays, '%d день', '%d дня', '%d дней')} назад, ${getFormattedTime(date)}`;
};

const isToday = (date: Date): boolean => getDiffDays(date) === 0;
const isYesterday = (date: Date): boolean => getDiffDays(date) === 1;

export const FormattedDate: FC<TFormattedDate> = ({ date, className }) => {

  if (isToday(date)) {
    return <span className={className}>Сегодня, {getFormattedTime(date)}</span>;
  }

  if (isYesterday(date)) {
    return <span className={className}>Вчера, {getFormattedTime(date)}</span>;
  }

  return <span className={className}>{getFormattedDate(date)}</span>;
};