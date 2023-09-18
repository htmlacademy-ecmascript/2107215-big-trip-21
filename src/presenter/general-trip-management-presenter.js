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

  handleNewEventButtonClick = () => {
    this.#newEventButtonModel.startCreating(true);
    this.#newEventButtonComponent.element.disabled = true;
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
    this.#infoComponent = new InfoView({
      travelPoints: this.#getTravelPoints(),
      isSmallPoints: this.#isSmallPoints,
      userPrice: this.#getUserPrice()
    });
    render(this.#infoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  #getUserPrice () {
    if (this.points.length) {
      const sum = this.points.reduce((acc, item) => acc + item.basePrice, 0);

      const offers = [];

      for (let i = 0; i <= this.points.length - 1; i++) {
        if (this.points[i].offers.length) {
          for(let j = 0; j <= this.points[i].offers.length - 1; j++) {
            const typeOffer = this.#offersModel.getByType(this.points[i].type);
            const itemOffer = typeOffer.offers.find((item) => item.id === this.points[i].offers[j]);
            offers.push(itemOffer);
          }
        }
      }

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

    for(let i = 0; i <= this.points.length - 1; i++) {
      const currentPoint = this.points[i];
      if (i === 0) {
        const currentDestination = this.#destinationsModel.getById(currentPoint.destination);
        points.push(currentPoint);
        destinations.push(currentDestination);
      }

      if (this.points.length <= 3) {
        this.#isSmallPoints = true;
      } else {
        this.#isSmallPoints = false;
      }

      if (i === 1 && i !== this.points.length - 1) {
        const currentDestination = this.#destinationsModel.getById(currentPoint.destination);
        points.push(currentPoint);
        destinations.push(currentDestination);
      }

      if (i === this.points.length - 1 && i !== 0) {
        const currentDestination = this.#destinationsModel.getById(currentPoint.destination);
        points.push(currentPoint);
        destinations.push(currentDestination);
      }
    }

    return infoPoints;
  }
}

