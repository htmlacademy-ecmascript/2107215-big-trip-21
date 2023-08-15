const CITES = [
  'Rubcovsk',
  'Novosibirsk',
  'Barnaul',
  'Moscow',
  'London',
  'Rome',
  'Saint-Petersburg'
];

const DESCRIPTION_PICTURES = [
  'Lorem ipsum dolor sit amet.',
  'Phasellus eros mauris.',
  'In rutrum ac purus sit amet tempus.'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const TYPEPOINTS = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DATE_FORMAT = {
  FULL_DATA: 'DD/MM/YY HH:mm',
  HOUR_MINUTE: 'HH:mm',
  MONTH_DAY: 'MMM DD',
  HOUR: 'HH',
  MINUTE: 'mm',
  DAY: 'DD',
};

const DEFAULT_TYPE = 'flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const Duration = {
  MIN: 59,
  DAY: 7,
  HOUR: 23
};

export {TYPEPOINTS, DATE_FORMAT, DEFAULT_TYPE, CITES, DESCRIPTIONS, POINT_EMPTY, DESCRIPTION_PICTURES, Duration};
