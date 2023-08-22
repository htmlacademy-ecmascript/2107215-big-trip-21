import { render, RenderPosition } from '../framework/render';
import ButtonHeardView from '../view/button-heard-view';
import InfoView from '../view/info-view.js';
import FilterView from '../view/filter-view.js';

export default class HeaderPresenter {
  #tripMainElement = null;
  #tripFilterElement = null;

  constructor({ tripFilterElement, tripMainElement }) {
    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;
  }

  init() {
    this.#renderHeader();
  }

  #renderHeader() {
    render(new FilterView(), this.#tripFilterElement);
    render(new InfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
    render(new ButtonHeardView(), this.#tripMainElement);
  }
}
