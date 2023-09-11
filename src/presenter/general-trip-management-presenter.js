import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/info-view.js';
import FilterPresenter from './filter-presenter';

export default class GeneralTripManagementPresenter {
  #pointsModel = null;
  #filterModel = null;

  #tripMainElement = null;
  #tripFilterElement = null;

  constructor({ pointsModel, filterModel, tripFilterElement, tripMainElement }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;
  }

  init() {
    this.#renderGeneralTripManagement();
  }

  #renderGeneralTripManagement() {
    this.#renderFilter();
    this.#renderInfo();
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripFilterElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #renderInfo() {
    render(new InfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }
}

