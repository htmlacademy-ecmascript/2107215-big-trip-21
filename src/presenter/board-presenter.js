import { render } from '../framework/render';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType, enabledSortType } from '../const.js';
import { sort } from '../utils/sort.js';

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
    this.#renderSort();
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderNoPointList();
    this.#renderPointList();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  //временный метод для удаления точки из массива
  #handlePointDeletedChange = (point) => {
    const filterPoints = this.#points.filter((item) => item.id !== point.id);
    this.#points = filterPoints;
  };

  #sortPoints(sortType) {
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.#points);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort() {
    const sortTypes = Object.values(SortType)
      .map(
        (type) => ({
          type,
          isChecked: (type === this.#currentSortType),
          isDisabled: !enabledSortType[type]
        }),
      );

    this.#sortComponent = new SortView({
      items: sortTypes,
      onSortTypeChange: this.#handleSortTypeChange
    });
    this.#sortPoints(this.#currentSortType);
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPointList() {
    if (this.#points.length) {
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #renderNoPointList() {
    if (this.#points.length === 0) {
      render(this.#noPointComponent, this.#boardContainer);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      onDeletedDataChange: this.#handlePointDeletedChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
