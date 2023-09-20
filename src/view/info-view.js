import AbstractView from '../framework/view/abstract-view.js';

const createInfoTemplate = ({userPrice, tripTtile, tripDuration}) =>
  `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripTtile}</h1>
          <p class="trip-info__dates">${tripDuration}</p>
      </div>
      ${userPrice ?
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">${userPrice}</span>
      </p>`
    : ''}
    </section>
  `;

export default class InfoView extends AbstractView {
  #userPrice = null;
  #tripTtile = null;
  #tripDuration = null;

  constructor({userPrice, tripTtile, tripDuration}) {
    super();
    this.#tripTtile = tripTtile;
    this.#userPrice = userPrice;
    this.#tripDuration = tripDuration;
  }

  get template() {
    return createInfoTemplate({
      userPrice: this.#userPrice,
      tripTtile: this.#tripTtile,
      tripDuration: this.#tripDuration
    });
  }
}
