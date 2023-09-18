import AbstractView from '../framework/view/abstract-view.js';

const createNoPointTemplate = (isErrorMessage) => {
  const message = isErrorMessage ? 'Failed to load latest route information' : 'Loading...';

  return `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">${message}</p>
    </section>
  `;
};

export default class MessageView extends AbstractView {
  #isErrorMessage = false;

  constructor({isErrorMessage}) {
    super();
    this.#isErrorMessage = isErrorMessage;
  }

  get template() {
    return createNoPointTemplate(this.#isErrorMessage);
  }
}
