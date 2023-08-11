const ROUTE_COUNT = 3;
const DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_LIST = 'HH:mm';
const DATE_FORMAT_MONTH = 'MMM DD';
const DIFFERENCED_H = 'HH';
const DIFFERENCED_M = 'mm';

const TYPEROUTE = [
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

export {TYPEROUTE, ROUTE_COUNT, BLANK_POINT, DATE_FORMAT, DATE_FORMAT_LIST, DATE_FORMAT_MONTH, DIFFERENCED_H, DIFFERENCED_M};
