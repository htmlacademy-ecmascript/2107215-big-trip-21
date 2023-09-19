import {render, RenderPosition, remove} from '../framework/render';
import InfoView from '../view/info-view.js';
import FilterPresenter from './filter-presenter';
import NewEventButtonView from '../view/new-event-button-view.js';
import {UpdateType} from '../const.js';
import {SortType} from '../const.js';
import {sort} from '../utils/sort.js';

export default class GeneralTripManagementPresenter {
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #newEventButtonModel = null;
  #offersModel = null;

  #infoComponent = null;
  #newEventButtonComponent = null;

  #tripMainElement = null;
  #tripFilterElement = null;

  #isSmallPoints = false;

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
    this.#renderGeneralTripManagement();
  }

  handleNewEventButtonClick = () => {
    this.#newEventButtonModel.startCreating(true);
    this.#newEventButtonComponent.element.disabled = true;
  };

  #renderGeneralTripManagement() {
    this.#renderFilter();
    this.#renderNewEventButton();
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onButtonClick: this.handleNewEventButtonClick,
    });

    render(this.#newEventButtonComponent, this.#tripMainElement);
  }

  #handleModelNewEventButton = (creating) => {
    if (!creating) {
      this.#newEventButtonComponent.element.disabled = false;
    }
  };

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripFilterElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#renderInfo();
        break;
      default:
        remove(this.#infoComponent);
        this.#renderInfo();
        break;
    }
  };

  #renderInfo() {
    if (this.points.length) {
      this.#infoComponent = new InfoView({
        travelPoints: this.#getTravelPoints(),
        isSmallPoints: this.#isSmallPoints,
        userPrice: this.#getUserPrice()
      });

      render(this.#infoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
    }
  }

  #getUserPrice () {
    if (this.points.length) {
      const sum = this.points.reduce((acc, item) => acc + item.basePrice, 0);

      const offers = [];

      this.points.forEach((point) => {
        point.offers.forEach((__, index) => {
          const typeOffer = this.#offersModel.getByType(point.type);
          const itemOffer = typeOffer.offers.find((item) => item.id === point.offers[index]);
          offers.push(itemOffer);
        });
      });

      const userPrice = offers.reduce((acc, item) => acc + item.price, sum);

      return userPrice;
    }
  }

  #getTravelPoints () {
    const points = [];
    const destinations = [];

    const infoPoints = {
      points: points,
      destinations: destinations,
    };

    this.points.forEach((point, index, arr) => {
      if (index === 0) {
        const currentDestination = this.#destinationsModel.getById(point.destination);
        points.push(point);
        destinations.push(currentDestination);
      }

      if (arr.length <= 3) {
        this.#isSmallPoints = true;
      } else {
        this.#isSmallPoints = false;
      }

      if (index === 1 && index !== arr.length - 1) {
        const currentDestination = this.#destinationsModel.getById(point.destination);
        points.push(point);
        destinations.push(currentDestination);
      }

      if (index === arr.length - 1 && index !== 0) {
        const currentDestination = this.#destinationsModel.getById(point.destination);
        points.push(point);
        destinations.push(currentDestination);
      }
    });

    return infoPoints;
  }
}

