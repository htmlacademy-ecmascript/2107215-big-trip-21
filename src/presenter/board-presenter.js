import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import TripListView from '../view/trip-list-view.js';
import PointListAbsence from '../view/point-list-absence-view.js'

export default class BoardPresenter {
  tripListComponent = new TripListView();

  constructor({boardContainer, pointModel}) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoint = [...this.pointModel.getTasks()];

    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new PointEditView({task: this.boardPoint[1]}), this.tripListComponent.getElement());

    if (this.boardPoint.length)  {
      for (let i = 0; i < this.boardPoint.length; i++) {
        render(new PointView({task: this.boardPoint[i]}), this.tripListComponent.getElement());
      }
    } else {
      render(new PointListAbsence(), this.boardContainer);
    }
  }
};
