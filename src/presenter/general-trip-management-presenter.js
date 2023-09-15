import { render, RenderPosition, remove } from '../framework/render';
import InfoView from '../view/info-view.js';
import FilterPresenter from './filter-presenter';
import { UpdateType } from '../const.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort.js';

export default class GeneralTripManagementPresenter {
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #infoComponent = null;
  #tripMainElement = null;
  #tripFilterElement = null;

  #isManyPoints = false;

  constructor({ pointsModel, filterModel, tripFilterElement, tripMainElement, destinationsModel }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#tripMainElement = tripMainElement;
    this.#tripFilterElement = tripFilterElement;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderGeneralTripManagement();
  }

  #renderGeneralTripManagement() {
    this.#renderFilter();
  }

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
      isManyPoints: this.#isManyPoints
    });
    render(this.#infoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  #getTravelPoints () {
    const points = this.#pointsModel.points;
    const sortedPoints = sort[SortType.DAY](points);

    const point = [];
    const destination = [];

    const infoPoints = {
      points: point,
      destinations: destination,
    }

    for(let i = 0; i <= sortedPoints.length - 1; i++) {
      const currentPoint = sortedPoints[i];
      if (i === 0 && i !== sortedPoints.length - 1) {
        const currentDestination = this.#destinationsModel.getById(sortedPoints[0].destination);
        point.push(currentPoint);
        destination.push(currentDestination);
      }

      if (sortedPoints.length < 3) {
        this.#isManyPoints = false;
      } else {
        this.#isManyPoints = true;
      }

      if (i === sortedPoints.length - 1) {
        const currentDestination = this.#destinationsModel.getById(currentPoint.destination);
        point.push(currentPoint);
        destination.push(currentDestination);
      }
    }

    return infoPoints;
  }
}

