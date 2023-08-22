import { render, RenderPosition } from '../framework/render';
import ButtonHeardView from '../view/button-heard-view';
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';

export default class HeaderPresenter {
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
    render(new ButtonHeardView(), this.#tripMainElement);
  }
}
