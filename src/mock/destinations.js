import { getRandomArrayElement, getRandomInt } from '../utils.js';
import { CITES, DESCRIPTIONS, DESCRIPTION_PICTURES } from '../const.js';

const generateMockDestinations = () => {
  const city = getRandomArrayElement(CITES);
  const description = getRandomArrayElement(DESCRIPTIONS);
  const descriptionPicture = getRandomArrayElement(DESCRIPTION_PICTURES);

  return {
    id: crypto.randomUUID(),
    description: description,
    name: city,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?${getRandomInt(1, 400)}`,
        description: descriptionPicture
      }
    ]
  };
};


export {generateMockDestinations};
