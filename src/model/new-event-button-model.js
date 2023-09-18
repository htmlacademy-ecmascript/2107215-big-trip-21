import Observable from '../framework/observable.js';

export default class NewEventButtonModel extends Observable {
  startCreating(creating) {
    this._notify(creating);
  }
}
