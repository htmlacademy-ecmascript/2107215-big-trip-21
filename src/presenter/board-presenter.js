import {render, remove} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {sort} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import {SortType, enabledSortType, UpdateType, UserAction, FilterType} from '../const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #newEventButtonModel = null;

  #tripListComponent = new TripListView();
  #noPointComponent = null;
  #sortComponent = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #messagePresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isCreating = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({boardContainer, pointsModel, offersModel, destinationsModel, filterModel, newEventButtonModel, messagePresenter}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#newEventButtonModel = newEventButtonModel;
    this.#messagePresenter = messagePresenter;

    this.#newPointPresenter = new NewPointPresenter({
      pointDestinations: destinationsModel,
      pointOffers: offersModel,
      pointListContainer: this.#tripListComponent,
      onDataChange: this.#handleViewAction,
      onNewPointDestroy: this.#handleNewPointDestroy
    });
    this.#newEventButtonModel.addObserver(this.#handleModelNewEventButton);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    return sort[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  #createPoint () {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#messagePresenter.init({isError: false});
      return;
    }

    if (this.points.length === 0 && !this.#isCreating) {
      this.#renderNoPointList();
      return;
    }

    this.#renderSort();
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderPointList();
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
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

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPointList() {
    if (this.points.length) {
      this.points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #renderNoPointList() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      tripListContainer: this.#tripListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleNewPointDestroy = () => {
    this.#isCreating = false;
    this.#newEventButtonModel.startCreating(false);

    if (this.points.length === 0) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#messagePresenter.destroyComponent();
        this.#renderBoard();
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleModelNewEventButton = (creating) => {
    if (creating) {
      this.#isCreating = true;
      this.#createPoint();
    }
  };
}
