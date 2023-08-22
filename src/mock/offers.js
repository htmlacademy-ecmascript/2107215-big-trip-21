import { getRandomInt } from '../utils/common.js';

const generateMockOffers = (type) => ({
  id: crypto.randomUUID(),
  title: `Offer ${type}`,
  price: getRandomInt(1, 100)
});


export {generateMockOffers};
