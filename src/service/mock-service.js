import { generateMockPoints } from '../mock/points.js';
import { generateMockDestinations } from '../mock/destinations.js';
import { generateMockOffers } from '../mock/offers.js';
import { TYPEPOINTS } from '../const.js';
import { getRandomInt, getRandomArrayElement } from '../utils.js';

export default class MockService {
  constructor() {
    this.destinations = this.generateDestination();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  generateDestination() {
    return Array.from(
      {length:5},
      () => generateMockDestinations()
    );
  }

  generateOffers() {
    return TYPEPOINTS.map((type) => ({
      type,
      offers: Array.from({length:getRandomInt(0, 5)}, () => generateMockOffers(type))
    }));
  }

  generatePoints() {
    return Array.from({length: 5}, () => {
      const type = getRandomArrayElement(TYPEPOINTS);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffers = getRandomInt(0, 1);
      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInt(0, 5))
          .map((offer) => offer.id)
        : [];
      return generateMockPoints(type, destination.id, offerIds);
    });
  }
}
