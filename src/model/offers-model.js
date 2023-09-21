export default class OffersModel {
  #service = null;
  #offers = [];

  constructor({service}) {
    this.#service = service;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((item) => item.type === type);
  }
}
