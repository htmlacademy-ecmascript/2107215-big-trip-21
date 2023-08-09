import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EditView from '../view/edit-view.js';
import EntryPointView from '../view/entry-point-view.js';
import TripListView from '../view/trip-list-view.js';

export default class BoardPresenter {
  tripListComponent = new TripListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new EditView(), this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EntryPointView(), this.tripListComponent.getElement());
    }
  }
}
