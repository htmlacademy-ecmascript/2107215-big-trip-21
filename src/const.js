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
}

const DEFAULT_TYPE = 'flight';

const BLANK_POINT = {
  type: null,
  price: null,
  destination: {
    city: '',
    photo: null,
    description: ''
  },
  offers: {
    luggage: {
      title: '',
      id: '',
      offerPrice: null,
      event: false
    },
    comfort: {
      title: '',
      id: '',
      offerPrice: null,
      event: false
    },
    meal: {
      title: '',
      id: '',
      offerPrice: null,
      event: false
    },
    seats: {
      title: '',
      id: '',
      offerPrice: null,
      event: false
    },
    train: {
      title: '',
      id: '',
      offerPrice: null,
      event: false
    },
  },
  event: {
    start: null,
    end: null
  }
};

export {TYPEPOINT, ROUTE_COUNT, BLANK_POINT, DATE_FORMAT, DEFAULT_TYPE, CITES, DESCRIPTIONS};
