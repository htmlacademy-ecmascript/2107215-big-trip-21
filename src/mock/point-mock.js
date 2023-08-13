import {getRandomArrayElement, getRandomInt} from '../utils.js';
import {TYPEPOINT, CITES, DESCRIPTIONS} from '../const.js';

const photos = 'https://loremflickr.com/248/152?'
const city = getRandomArrayElement(CITES);
const description = getRandomArrayElement(DESCRIPTIONS);

const getRandomPhotos = () => {
  const map = []
  for ( let i = 0; i < getRandomInt(1, 10); i++) {
    map.push(`${photos}${getRandomInt(1, 400)}`);
  }
  return map
};

const generateMockOffers = () => ({
  id: crypto.randomUUID(),
  title: `Offer ${getRandomArrayElement(TYPEPOINT)}`,
  price: getRandomInt(1, 100)
});

const generateMockDestinations = () => {
  return {
    id: crypto.randomUUID(),
    name: city,
    description: description,
    photo: getRandomPhotos(),
  };

};

const generateMockPoints = (destination, offerIds) => ({
  id: crypto.randomUUID(),
  type: getRandomArrayElement(TYPEPOINT),
  basePrice: getRandomInt(1, 10000),
  dataTime: {
    start: new Date('2019-03-18T10:30:00'),
    end: new Date('2019-03-18T11:00:00')
  },
  destination: destination,
  isFavorite: !!getRandomInt(0,1),
  offers: offerIds,
});

const offers = generateMockOffers();
const destination = generateMockDestinations(TYPEPOINT)
const mockPoints = [generateMockPoints(destination, offers)];

function getRandomComponent() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomComponent};
