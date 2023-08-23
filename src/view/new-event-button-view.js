import AbstractView from '../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () =>
  `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow">New event<button>
  `;

export default class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }
}
