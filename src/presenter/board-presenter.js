import { render } from '../framework/render';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointListAbsence from '../view/point-list-absence-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #tripListComponent = new TripListView();
  #points = [];
  #pointPresenters = new Map();

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
    this.#renderSort();
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderNoPointList();
    this.#renderPointList();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(new SortView(), this.#boardContainer);
  }

  #renderNoPointList() {
    if (this.#points.length === 0) {
      render(new PointListAbsence(), this.#boardContainer);
    }
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPointList() {
    if (this.#points.length) {
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
