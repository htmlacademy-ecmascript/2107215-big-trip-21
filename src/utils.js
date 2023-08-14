import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {Duration, DATE_FORMAT} from './const.js';

dayjs.extend(utc);

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getDate = ({next}) => {
  let date = dayjs().subtract(getRandomInt(0, Duration.DAY), 'day').toDate();
  const minsGap = getRandomInt(0, Duration.MIN);
  const hoursGap = getRandomInt(0, Duration.HOUR);
  const daysGap = getRandomInt(0, Duration.DAY);

  if (next) {
    date = dayjs()
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .subtract(daysGap, 'day').toDate();
  }

  return date;
};

const humanizeDate = (date, dataFormat) =>
  date ? dayjs(date).format(dataFormat) : '';

const humanizeDateUtc = (date, dataFormat) =>
  date ? dayjs(date).utcOffset(0).format(dataFormat) : '';

const dateDiff = (date1, date2) => {
  let answer = '';
  const diffTime = (date2 - date1);
  const diffTimeHours = humanizeDateUtc(diffTime, DATE_FORMAT.hour);
  const diffTimeMinutes = humanizeDateUtc(diffTime, DATE_FORMAT.minute);
  const diffTimeDays = humanizeDateUtc(diffTime, DATE_FORMAT.day);

  if (diffTime <= 0) {
    return 'wrong date';
  } else {
    if (diffTimeDays !== 0) {
      answer = `${diffTimeDays}d `;
    }
    if (diffTimeHours !== 0) {
      answer += `${diffTimeHours}h ` ;
    }
    if (diffTimeMinutes !== 0) {
      answer += `${diffTimeMinutes}m` ;
    }
    return answer;
  }
};

const CreateToUpperCase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export {getRandomArrayElement, getRandomInt, getDate, humanizeDate, dateDiff, CreateToUpperCase};
