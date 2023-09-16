import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonModel from './model/new-event-button-model.js';
import GeneralTripManagementPresenter from './presenter/general-trip-management-presenter.js';
import PointsApiService from './points-api-service.js';
import OffersApiService from './offers-api-service.js';
import DestinationsApiService from './destinations-api-service.js';
import {AUTHORIZATION, END_POINT} from './const.js';
import {showAlert} from './utils/utils.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const newEventButtonModel = new NewEventButtonModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEventElement,
  destinationsModel,
  pointsModel,
  offersModel,
  filterModel,
  newEventButtonModel
});

const generalTripManagementPresenter = new GeneralTripManagementPresenter({
  pointsModel,
  filterModel,
  tripFilterElement,
  tripMainElement,
  destinationsModel,
  offersModel,
  newEventButtonModel
});

Promise.all([offersModel.init(), destinationsModel.init()])
  .then(() => pointsModel.init())
  .then(() => {
    generalTripManagementPresenter.init();
  })
  .catch(() => {
    showAlert('Can\'t loading data. Try again later.');
  });

boardPresenter.init();
