import NewTaskButtonView from "./view/new-task-button-view";
import BoardPresenter from './presenter/board-presenter.js';
import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteTripEventsElement});

render(new FilterView(), siteTripFilterElement);
render(new InfoView(), siteTripElement, 'afterbegin');
render(new NewTaskButtonView(), siteTripElement);

boardPresenter.init();
