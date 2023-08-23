import AbstractView from '../framework/view/abstract-view.js';

const createPointListAbsenceTemplate = () =>
  `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;

export default class PointListAbsenceView extends AbstractView {
  get template() {
    return createPointListAbsenceTemplate();
  }
}
