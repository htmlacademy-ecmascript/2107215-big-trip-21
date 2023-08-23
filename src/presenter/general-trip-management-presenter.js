import { render, RenderPosition } from '../framework/render';
import NewEventButtonView from '../view/new-event-button-view.js';
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';
import { generateFilter } from '../mock/filter.js';

export default class GeneralTripManagementPresenter {
  #tripMainElement = null;
  #tripFilterElement = null;
  #pointsModel = null;
  #filters = [];

  constructor({ tripFilterElement, tripMainElement, pointsModel }) {
    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);
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
