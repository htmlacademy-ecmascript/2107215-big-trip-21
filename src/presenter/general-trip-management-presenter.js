import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/info-view.js';
import FilterPresenter from './filter-presenter';

export default class GeneralTripManagementPresenter {
  #tripMainElement = null;
  #tripFilterElement = null;
  #pointsModel = null;
  #filterModel = null;

  constructor({ tripFilterElement, tripMainElement, pointsModel, filterModel }) {
    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
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

