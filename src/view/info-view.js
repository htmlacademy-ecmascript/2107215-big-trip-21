import AbstractView from '../framework/view/abstract-view.js';

const createInfoTemplate = ({userPrice, tripTitle, tripDuration}) =>
  `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripTitle}</h1>
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
  #tripTitle = null;
  #tripDuration = null;

  constructor({userPrice, tripTitle, tripDuration}) {
    super();
    this.#tripTitle = tripTitle;
    this.#userPrice = userPrice;
    this.#tripDuration = tripDuration;
  }

  get template() {
    return createInfoTemplate({
      userPrice: this.#userPrice,
      tripTitle: this.#tripTitle,
      tripDuration: this.#tripDuration
    });
  }
}
