export default class DestinationsModel {
  #service = null;
  #destinations = [];

  constructor({service}) {
    this.#service = service;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#service.destinations;
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((item) => item.id === id);
  }
}
