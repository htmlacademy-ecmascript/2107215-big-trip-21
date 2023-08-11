import {getRandomArrayElement, getRandomInt} from '../utils.js';
import {TYPEROUTE} from '../const.js';

const photos = 'https://loremflickr.com/248/152?'
const getRandomPhotos = () => {
  const map = []
  for ( let i = 0; i < getRandomInt(1, 10); i++) {
    map.push(`${photos}${getRandomInt(1, 400)}`);
  }
  return map
};

const mockRoutePoint = [
  {
    type: getRandomArrayElement(TYPEROUTE),
    price: getRandomInt(28, 500),
    destination: {
      city: "Krasnodar",
      photo: getRandomPhotos(),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    offers: {
      luggage: {
        title: 'Add luggage',
        id: 'luggage',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      comfort: {
        title: 'Switch to comfort class',
        id: 'comfort',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      meal: {
        title: 'Add meal',
        id: 'meal',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      seats: {
        title: 'Choose seats',
        id: 'seats',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      train: {
        title: 'Travel by train',
        id: 'train',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
    },
    dataTime: {
      start: new Date('2019-03-18T10:30:00'),
      end: new Date('2019-03-18T11:00:00')
    }
  },
  {
    type: getRandomArrayElement(TYPEROUTE),
    price: getRandomInt(34, 600),
    destination: {
      city: "Volgograd",
      photo: getRandomPhotos(),
      description: "Aliquam id orci ut lectus varius viverra."
    },
    offers: {
      luggage: {
        title: 'Add luggage',
        id: 'luggage',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      comfort: {
        title: 'Switch to comfort class',
        id: 'comfort',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      meal: {
        title: 'Add meal',
        id: 'meal',
        offerPrice: getRandomInt(28, 500),
        event: false
      },
      seats: {
        title: 'Choose seats',
        id: 'seats',
        offerPrice: getRandomInt(28, 500),
        event: false
      },
      train: {
        title: 'Travel by train',
        id: 'train',
        offerPrice: getRandomInt(28, 500),
        event: false
      },
    },
    dataTime: {
      start: new Date('2023-05-17T03:00:00'),
      end: new Date('2023-05-17T03:24:00')
    }
  },
  {
    type: getRandomArrayElement(TYPEROUTE),
    price: getRandomInt(200, 400),
    destination: {
      city: "Tokyo",
      photo: null,
      description: "Sed sed nisi sed augue convallis suscipit in sed felis."
    },
    offers: {
      luggage: {
        title: 'Add luggage',
        id: 'luggage',
        offerPrice: getRandomInt(28, 500),
        event: false
      },
      comfort: {
        title: 'Switch to comfort class',
        id: 'comfort',
        offerPrice: getRandomInt(28, 500),
        event: false
      },
      meal: {
        title: 'Add meal',
        id: 'meal',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      seats: {
        title: 'Choose seats',
        id: 'seats',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
      train: {
        title: 'Travel by train',
        id: 'train',
        offerPrice: getRandomInt(28, 500),
        event: true
      },
    },
    dataTime: {
      start: new Date('2023-05-17T03:24:00'),
      end: new Date('2023-12-17T04:35:00')
    }
  },
];

function getRandomComponent() {
  return getRandomArrayElement(mockRoutePoint);
}

export {getRandomComponent};
