import { render, replace } from '../framework/render';
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
    render(new SortView(), this.#boardContainer);
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderPointList();
  }

  #renderPointList() {
    if (this.#points.length) {
      this.#points.forEach((point) => {
        this.#renderPoint(point)
      });
    } else {
      render(new PointListAbsence(), this.#boardContainer);
    }
  };

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceToItemElement();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const replaceToFormElement = () => {
      replace(editPointComponent, eventPointComponent);
    }

    const replaceToItemElement = () => {
      replace(eventPointComponent, editPointComponent);
    }

    const editPointComponent = new EditPointView({
      point,
      pointDestination: this.#destinationsModel.destinations,
      pointOffer: this.#offersModel.offers,
      onSubmit: () => {
        replaceToItemElement();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventPointComponent = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffer: this.#offersModel.getByType(point.type),
      onEditClick: () => {
        replaceToFormElement()
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    render(eventPointComponent, this.#tripListComponent.element)
  };
}


