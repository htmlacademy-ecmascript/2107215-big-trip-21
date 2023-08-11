import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function humanizeTaskDueDate(dueDate, dataFormat) {
  return dueDate ? dayjs(dueDate).format(dataFormat) : '';
}

function humanizeTaskDueDate2(dueDate, dataFormat) {
  return dueDate ? dayjs(dueDate).utcOffset(0).format(dataFormat) : '';
}

// function differenceTaskDueDate(date1, date2) {
//   return date1 ? dayjs(date1).diff(date2, 'day') : '';
// }

// function isTaskExpired(dueDate) {
//   return dueDate && dayjs().isAfter(dueDate, 'D');
// }

export {getRandomArrayElement, getRandomInt, humanizeTaskDueDate, humanizeTaskDueDate2};
