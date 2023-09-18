import {render, remove, RenderPosition} from '../framework/render';
import MessageView from '../view/message-view.js';

export default class MessagePresenter {
  #messageComponent = null;
  #errorMessage = false;
  #boardContainer = null;

  constructor({boardContainer}) {
    this.#boardContainer = boardContainer;
  }

  init(errorMessage) {
    this.#errorMessage = errorMessage;
    this.#messageComponent = new MessageView({
      isErrorMessage: this.#errorMessage
    });

    render(this.#messageComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  destroyComponent () {
    if (this.#messageComponent === null) {
      return;
    }

    remove(this.#messageComponent);
  }
}
