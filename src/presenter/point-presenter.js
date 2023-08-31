import { render, replace, remove } from '../framework/render';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #editPointComponent = null;
  #eventPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ tripListContainer, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#tripListContainer = tripListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevEditPointComponent = this.#editPointComponent;
    const prevEventPointComponent = this.#eventPointComponent;

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#handleCloseClick,
      onDeleteClick: this.#handleDeleteClick
    });

    this.#eventPointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      pointOffer: this.#offersModel.getByType(this.#point.type),
      onOpenClick: this.#handleOpenClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if (prevEditPointComponent === null || prevEventPointComponent === null) {
      render(this.#eventPointComponent, this.#tripListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#editPointComponent);
    remove(this.#eventPointComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  }

  #replaceItemToForm() {
    replace(this.#editPointComponent, this.#eventPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem() {
    replace(this.#eventPointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (point) => {
    this.#replaceFormToItem();
    this.#handleDataChange(point);
  };

  #handleCloseClick = () => {
    this.#replaceFormToItem();
  };

  #handleDeleteClick = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#editPointComponent);
  };

  #handleOpenClick = () => {
    this.#replaceItemToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
