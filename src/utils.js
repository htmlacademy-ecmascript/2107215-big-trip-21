import dayjs from 'dayjs';
import { Duration } from './const.js';

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

const dateDiff = (date1, date2) => {
  const fromTime = dayjs(date1);
  const toTime = dayjs(date2);
  const diffTime = toTime.diff(fromTime, 'minutes');
  const timeDay = Math.floor(diffTime / 1440);
  const answerH = diffTime - timeDay * 1440;
  const timeHour = Math.floor(answerH / 60);
  const timeMinute = answerH - timeHour * 60;

  let answer = '';

  if (diffTime <= 0) {
    return 'wrong date';
  } else {
    if (timeDay !== 0) {
      answer = `${timeDay.toString().padStart(2, '0')}d `;
    }
    if (timeHour !== 0) {
      answer += `${timeHour.toString().padStart(2, '0')}h ` ;
    }
    if (timeMinute !== 0) {
      answer += `${timeMinute.toString().padStart(2, '0')}m` ;
    }
    return answer;
  }
};

const CreateToUpperCase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export {getRandomArrayElement, getRandomInt, getDate, humanizeDate, dateDiff, CreateToUpperCase};
