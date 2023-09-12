import { showAlert } from '../utils/utils.js';

export default class DestinationsModel {
  #destinationsApiService = null;
  #destinations = [];

  constructor({ destinationsApiService }) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      showAlert();
      throw new Error('Can\'t loading destinations');
    }
  }

  getById(id) {
    return this.#destinations
      .find((item) => item.id === id);
  }
}
