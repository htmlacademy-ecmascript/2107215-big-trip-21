import { createElement } from '../render.js';

function createButtonHeardTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow">New event<button>';
}

export default class ButtonHeardView {
  getTemplate() {
    return createButtonHeardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
