import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonModel from './model/new-event-button-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsApiService from './points-api-service.js';
import MessagePresenter from './presenter/message-presenter.js';
import {AUTHORIZATION, END_POINT} from './const.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventElement = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const messagePresenter = new MessagePresenter({
  boardContainer: tripEventElement
});

const offersModel = new OffersModel({
  service: pointsApiService
});
const destinationsModel = new DestinationsModel({
  service: pointsApiService
});
const pointsModel = new PointsModel({
  service: pointsApiService,
  messagePresenter,
  tripInfoPresenter: getTripInfoPresenter,
  destinationsModel,
  offersModel
});

const newEventButtonModel = new NewEventButtonModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEventElement,
  destinationsModel,
  pointsModel,
  offersModel,
  filterModel,
  newEventButtonModel,
  messagePresenter
});

function getTripInfoPresenter () {
  const tripInfoPresenter = new TripInfoPresenter({
    pointsModel,
    filterModel,
    tripFilterElement,
    tripMainElement,
    destinationsModel,
    offersModel,
    newEventButtonModel
  });

  tripInfoPresenter.init();
}

pointsModel.init();
boardPresenter.init();
