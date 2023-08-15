import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import TripListView from '../view/trip-list-view.js';
import PointListAbsence from '../view/point-list-absence-view.js';

export default class BoardPresenter {
  tripListComponent = new TripListView();

  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.points = [...this.pointsModel.get()];
  }

  init() {
    render(
      new PointEditView({
        point: this.points[0],
        pointDestination: this.destinationsModel.get(),
        pointOffer: this.offersModel.get()
      }),
      this.tripListComponent.getElement()
    );

    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);

    if (this.points.length) {
      this.points.forEach((point) => {
        render(new PointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffer: this.offersModel.getByType(point.type)
        }),
        this.tripListComponent.getElement()
        );
      });

    } else {
      render(new PointListAbsence(), this.boardContainer);
    }
  }
}
