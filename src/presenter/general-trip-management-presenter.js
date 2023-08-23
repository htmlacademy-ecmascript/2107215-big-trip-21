import { render, RenderPosition } from '../framework/render';
import NewEventButtonView from '../view/new-event-button-view.js';
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';

export default class GeneralTripManagementPresenter {
  #tripMainElement = null;
  #tripFilterElement = null;
  #filters = [];

  constructor({ tripFilterElement, tripMainElement, filters }) {
    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;
    this.#filters = filters;
  }

  init() {
    this.#renderHeader();
  }

  #renderHeader() {
    render(new FilterView({ filters: this.#filters }), this.#tripFilterElement);
    render(new InfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
    render(new NewEventButtonView(), this.#tripMainElement);
  }
}
