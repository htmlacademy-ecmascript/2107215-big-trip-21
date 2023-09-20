import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DateTime = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24
};

const MSEC_IN_HOUR = DateTime.MIN_IN_HOUR * DateTime.SEC_IN_MIN * DateTime.MSEC_IN_SEC;
const MSEC_IN_DAY = DateTime.HOUR_IN_DAY * MSEC_IN_HOUR;

const humanizeDate = (date, dataFormat) =>
  date ? dayjs(date).format(dataFormat) : '';

const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
};

const createToUpperCase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const isDatasEqual = (dateA, dateB) => {
  const pointDateA = dayjs(dateA).valueOf();
  const pointDateB = dayjs(dateB).valueOf();

  return (dateA === null && dateB === null) || (pointDateA === pointDateB);
};

const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export {humanizeDate, getPointDuration, createToUpperCase, isDatasEqual, makeId};
