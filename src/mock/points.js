import { getRandomInt, getDate } from '../utils.js';

const generateMockPoints = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInt(1, 10000),
  dataTime: {
    start: getDate({next:false}),
    end: getDate({next:true})
  },
  destination: destinationId,
  isFavorite: !!getRandomInt(0,1),
  offers: offerIds,
  type
});

export{generateMockPoints};
