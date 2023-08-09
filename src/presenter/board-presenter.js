import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list-view.js';
import TaskEditView from '../view/task-edit-view.js';
import CardView from '../view/card-view.js';

export default class BoardPresenter {
  taskListComponent = new TaskListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.taskListComponent, this.boardContainer);
    render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new CardView(), this.taskListComponent.getElement());
    }
  }
}
