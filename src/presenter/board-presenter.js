import { render } from '../framework/render';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointByTime, sortPointByPrice, sortPointByDay } from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #tripListComponent = new TripListView();
  #noPointComponent = new NoPointView();
  #sortComponent = null;
  #points = [];
  #sourcedPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];
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

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer);
  }

  #sortTasks(sortType) {
    // Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать массив
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortPointByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointByPrice);
        break;
      case SortType.DAY:
        this.#points.sort(sortPointByDay);
        break;
      default:
        // А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPointList() {
    if (this.#points.length === 0) {
      render(this.#noPointComponent, this.#boardContainer);
    }
  }

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

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };
}
