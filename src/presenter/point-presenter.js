import {render, replace, remove} from '../framework/render';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {UserAction, UpdateType} from '../const.js';
import {isDatasEqual} from '../utils/utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #offersModel = null;
  #destinationsModel = null;

  #tripListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #editPointComponent = null;
  #eventPointComponent = null;

  #point = null;
  #typeOffer = null;
  #mode = Mode.DEFAULT;

  constructor({offersModel, destinationsModel, tripListContainer, onDataChange, onModeChange}) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#typeOffer = this.#offersModel.getByType(this.#point.type);

    const prevEditPointComponent = this.#editPointComponent;
    const prevEventPointComponent = this.#eventPointComponent;

    if(this.#offersModel) {
      this.#editPointComponent = new EditPointView({
        point: this.#point,
        pointDestinations: this.#destinationsModel.destinations,
        pointOffers: this.#offersModel.offers,
        onFormSubmit: this.#handleFormSubmit,
        onCloseClick: this.#handleCloseClick,
        onDeleteClick: this.#handleDeleteClick,
      });

      this.#eventPointComponent = new PointView({
        point: this.#point,
        pointDestination: this.#destinationsModel.getById(this.#point.destination),
        pointOffers: this.#getOffers(),
        onOpenClick: this.#handleOpenClick,
        onFavoriteClick: this.#handleFavoriteClick
      });
    }

    if (prevEditPointComponent === null || prevEventPointComponent === null) {
      render(this.#eventPointComponent, this.#tripListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventPointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#resetPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #getOffers = () => {
    const offers = [];

    if (this.#point.offers.length) {
      this.#point.offers.forEach((currentOffer) => {
        const itemOffer = this.#typeOffer.offers.find((item) => item.id === currentOffer);
        offers.push(itemOffer);
      });
    }

    return offers;
  };

  #resetPoint() {
    this.#editPointComponent.reset(this.#point);
    this.#replaceFormToItem();
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

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatasEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatasEqual(this.#point.dateTo, update.dateTo) ||
      !isDatasEqual(this.#point.basePrice, update.basePrice);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
  };

  #handleCloseClick = () => {
    this.#resetPoint();
  };

  #handleDeleteClick = (point) => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleOpenClick = () => {
    this.#replaceItemToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
