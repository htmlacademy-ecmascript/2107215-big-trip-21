import AbstractView from '../framework/view/abstract-view.js';

function createPointListAbsenceTemplate() {
  return (
    `<div class="point-list-absence">
      <p>«Click New Event to create your first point»<p>
     </div>`
  );
}

export default class PointListAbsenceView extends AbstractView {
  get template() {
    return createPointListAbsenceTemplate();
  }
}
