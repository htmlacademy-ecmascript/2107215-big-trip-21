import {render} from './render.js';
import ButtonHeardView from './view/button-heard-view';
import BoardPresenter from './presenter/board-presenter.js';
import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';

const headerNode = document.querySelector('.page-header');
const tripMainNode = headerNode.querySelector('.trip-main');
const tripFilterNode = document.querySelector('.trip-controls__filters');
const tripEventNode = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: tripEventNode});

render(new FilterView(), tripFilterNode);
render(new InfoView(), tripMainNode, 'afterbegin');
render(new ButtonHeardView(), tripMainNode);

boardPresenter.init();
