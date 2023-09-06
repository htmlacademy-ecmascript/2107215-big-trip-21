import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  ADD_FORM: 'ADD_FORM',
};

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointDestinations = null;
  #pointOffers = null;

  #editPointComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy, pointDestinations, pointOffers }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
  }

  init() {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      pointDestinations: this.#pointDestinations.destinations,
      pointOffers: this.#pointOffers.offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      mode: Mode.ADD_FORM,
    });

    render(this.#editPointComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: crypto.randomUUID(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
