const ROUTE_COUNT = 3;

const CITES = [
  'Rubcovsk',
  'Novosibirsk',
  'Barnaul',
  'Moscow',
  'London',
  'Rome',
  'Saint-Petersburg'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const TYPEPOINT = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DATE_FORMAT = {
  fullData: 'DD/MM/YY HH:mm',
  hourMinute: 'HH:mm',
  monthDay: 'MMM DD',
  hour: 'HH',
  minute: 'mm',
  day: 'DD',
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

export {TYPEPOINT, ROUTE_COUNT, DATE_FORMAT, DEFAULT_TYPE, CITES, DESCRIPTIONS, POINT_EMPTY, Duration};
