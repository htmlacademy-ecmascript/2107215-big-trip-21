import dayjs from 'dayjs';
import { SortType } from '../const.js';

const sortPointsByTime = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateTo).valueOf() - dayjs(pointA.dateFrom).valueOf();
  const durationPointB = dayjs(pointB.dateTo).valueOf() - dayjs(pointB.dateFrom).valueOf();

  return durationPointB - durationPointA;
};

const sortPointsByPrice = (pointA, pointB) =>
  pointB.basePrice - pointA.basePrice;

const sortPointsByDay = (pointA, pointB) => {
  const dateA = dayjs(pointA.dateFrom).valueOf();
  const dateB = dayjs(pointB.dateFrom).valueOf();

  return dateA - dateB;
};

const sort = {
  [SortType.DAY] : (points) => points.sort(sortPointsByDay),
  [SortType.PRICE] : (points) => points.sort(sortPointsByPrice),
  [SortType.TIME] : (points) => points.sort(sortPointsByTime),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.OFFER} is not implemented`);
  },
  [SortType.OFFER]: () => {
    throw new Error(`Sort by ${SortType.OFFER} is not implemented`);
  }
};

export { sort };
