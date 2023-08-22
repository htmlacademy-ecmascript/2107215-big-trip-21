import { render, replace, remove } from '../framework/render';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import TripListView from '../view/trip-list-view.js';
import PointListAbsence from '../view/point-list-absence-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #tripListComponent = new TripListView();
  #points = [];

  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    render(new SortView(), this.#boardContainer);
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderPointList();
  }

  #renderPointList() {
    if (this.#points.length) {
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    } else {
      render(new PointListAbsence(), this.#boardContainer);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceToItemElement();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const editPointComponent = new EditPointView({
      point,
      pointDestination: this.#destinationsModel.destinations,
      pointOffer: this.#offersModel.offers,
      onFormSubmit: () => {
        replaceToItemElement();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceToItemElement();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onDeleteClick: () => {
        document.removeEventListener('keydown', escKeyDownHandler);
        remove(editPointComponent);
      },
    });

    const eventPointComponent = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffer: this.#offersModel.getByType(point.type),
      onEditClick: () => {
        replaceToFormElement();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceToFormElement() {
      replace(editPointComponent, eventPointComponent);
    }

    function replaceToItemElement() {
      replace(eventPointComponent, editPointComponent);
    }

    render(eventPointComponent, this.#tripListComponent.element);
  }
}


