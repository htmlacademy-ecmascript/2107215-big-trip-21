import {getRandomArrayElement, getRandomInt} from '../utils.js';
import {CITES, DESCRIPTIONS} from '../const.js';

const generateMockDestinations = () => {
  const city = getRandomArrayElement(CITES);
  const description = getRandomArrayElement(DESCRIPTIONS);
  const photos = 'https://loremflickr.com/248/152?';

  const getRandomPhotos = () => {
    const map = [];
    for (let i = 0; i < getRandomInt(1, 10); i++) {
      map.push(`${photos}${getRandomInt(1, 400)}`);
    }
    return map;
  };

  return {
    id: crypto.randomUUID(),
    name: city,
    description: description,
    photo: getRandomPhotos(),
  };
};


export {generateMockDestinations};
