import AbstractView from '../framework/view/abstract-view.js';

function createButtonHeardTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow">New event<button>';
}

export default class ButtonHeardView extends AbstractView {
  get template() {
    return createButtonHeardTemplate();
  }
}
