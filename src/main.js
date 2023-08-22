import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';
import HeaderPresenter from './presenter/header-presenter.js';
import { generateFilter } from './mock/filter.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventElement = document.querySelector('.trip-events');

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const filters = generateFilter(pointsModel.points);
const boardPresenter = new BoardPresenter({
  boardContainer: tripEventElement,
  destinationsModel,
  pointsModel,
  offersModel,
});
const headerPresenter = new HeaderPresenter({
  tripFilterElement,
  tripMainElement,
  filters
});

boardPresenter.init();
headerPresenter.init();


