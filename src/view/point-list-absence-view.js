import { createElement } from '../render.js';

function createPointListAbsenceTemplate() {
  return (
    `<div class="point-list-absence">
      <p>«Click New Event to create your first point»<p>
     </div>`
  );
}

export default class PointListAbsenceView {
  getTemplate() {
    return createPointListAbsenceTemplate();
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
