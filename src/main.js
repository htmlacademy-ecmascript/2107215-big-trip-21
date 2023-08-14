import {render} from './render.js';
import ButtonHeardView from './view/button-heard-view';
import BoardPresenter from './presenter/board-presenter.js';
import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';

const headerNode = document.querySelector('.page-header');
const tripMainNode = headerNode.querySelector('.trip-main');
const tripFilterNode = document.querySelector('.trip-controls__filters');
const tripEventNode = document.querySelector('.trip-events');

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const boardPresenter = new BoardPresenter({
  boardContainer: tripEventNode,
  destinationsModel,
  pointsModel,
  offersModel,
});

render(new FilterView(), tripFilterNode);
render(new InfoView(), tripMainNode, 'afterbegin');
render(new ButtonHeardView(), tripMainNode);

boardPresenter.init();
