import {render, RenderPosition, remove} from '../framework/render';
import InfoView from '../view/info-view.js';
import FilterPresenter from './filter-presenter';
import NewEventButtonView from '../view/new-event-button-view.js';
import {UpdateType} from '../const.js';
import {SortType} from '../const.js';
import {sort} from '../utils/sort.js';
import {getTripTtile, getTripDuration, getUserPrice} from '../utils/trip-info.js';

export default class TripInfoPresenter {
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #newEventButtonModel = null;
  #offersModel = null;

  #infoComponent = null;
  #newEventButtonComponent = null;

  #tripMainElement = null;
  #tripFilterElement = null;

  constructor({pointsModel, filterModel, tripFilterElement, tripMainElement, destinationsModel, offersModel, newEventButtonModel}) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#newEventButtonModel = newEventButtonModel;
    this.#offersModel = offersModel;

    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;

    this.#newEventButtonModel.addObserver(this.#handleModelNewEventButton);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    const sortedPoints = sort[SortType.DAY](this.#pointsModel.points);

    return sortedPoints;
  }

  init() {
    this.#renderTripInfoPresenter();
  }

  #renderTripInfoPresenter() {
    this.#renderFilter();
    this.#renderNewEventButton();
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onButtonClick: this.#handleNewEventButtonClick,
    });

    render(this.#newEventButtonComponent, this.#tripMainElement);
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripFilterElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #renderInfo() {
    if (this.points.length) {
      this.#infoComponent = new InfoView({
        tripTitle: getTripTtile(this.points, this.#destinationsModel),
        tripDuration: getTripDuration(this.points),
        userPrice: getUserPrice(this.points, this.#offersModel)
      });

      render(this.#infoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
    }
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT) {
      this.#renderInfo();
    }

    remove(this.#infoComponent);
    this.#renderInfo();
  };

  #handleModelNewEventButton = (creating) => {
    if (!creating) {
      this.#newEventButtonComponent.element.disabled = false;
    }
  };

  #handleNewEventButtonClick = () => {
    this.#newEventButtonModel.startCreating(true);
    this.#newEventButtonComponent.element.disabled = true;
  };
}

