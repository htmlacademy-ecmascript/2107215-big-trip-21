import {render} from './render.js';
import ButtonHeardView from './view/button-heard-view';
import BoardPresenter from './presenter/board-presenter.js';
import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import PointModel from './model/point-model.js';;
// import MockService from './service/mock-service.js';

const headerNode = document.querySelector('.page-header');
const tripMainNode = headerNode.querySelector('.trip-main');
const tripFilterNode = document.querySelector('.trip-controls__filters');
const tripEventNode = document.querySelector('.trip-events');
const pointModel = new PointModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEventNode,
  pointModel,
});
// const boardPresenter = new BoardPresenter({boardContainer: tripEventNode});

render(new FilterView(), tripFilterNode);
render(new InfoView(), tripMainNode, 'afterbegin');
render(new ButtonHeardView(), tripMainNode);
// const mockService = new MockService();

boardPresenter.init();
