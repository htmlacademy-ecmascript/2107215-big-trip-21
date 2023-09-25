import {humanizeDate} from './utils.js';
import {DateFormat} from '../const.js';

const getTripTitle = (points = [], destinations = []) => {
  const destinationNames = points.map((point) => destinations.getById(point.destination).name);

  return (destinationNames.length <= 3)
    ? destinationNames.join('&nbsp;&mdash;&nbsp;')
    : `${destinationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(-1)}`;
};

const getTripDuration = (points = []) =>
  (points.length > 0) ? `${humanizeDate(points.at(0).dateFrom, DateFormat.DAY_MONTH)}&nbsp;&mdash;&nbsp;${humanizeDate(points.at(-1).dateTo, DateFormat.DAY_MONTH)}` : '';

const getUserPrice = (points = [], pointOffers = []) => {
  const sum = points.reduce((acc, item) => acc + item.basePrice, 0);

  const offers = [];

  points.forEach((point) => {
    point.offers.forEach((__, index) => {
      const typeOffer = pointOffers.getByType(point.type);
      const itemOffer = typeOffer.offers.find((item) => item.id === point.offers[index]);
      offers.push(itemOffer);
    });
  });

  const userPrice = offers.reduce((acc, item) => acc + item.price, sum);

  return userPrice;
};

export {getTripTitle, getTripDuration, getUserPrice};
