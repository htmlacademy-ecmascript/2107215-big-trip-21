import { showAlert } from '../utils/utils.js';

export default class OffersModel {
  #offersApiService = null;
  #offers = [];

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;
    } catch(err) {
      showAlert();
      throw new Error('Can\'t loading offers');
    }
  }

  getByType(type) {
    return this.#offers.find((item) => item.type === type);
  }
}
