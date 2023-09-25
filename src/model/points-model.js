import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
import {adaptToClient} from '../utils/point.js';

export default class PointsModel extends Observable {
  #service = null;
  #points = [];
  #handleTripInfoPresenterActivate = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({service, messagePresenter, onTripInfoPresenterActivate, destinationsModel, offersModel}) {
    super();
    this.#service = service;
    this.messagePresenter = messagePresenter;
    this.#handleTripInfoPresenterActivate = onTripInfoPresenterActivate;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await Promise.all([this.#destinationsModel.init(), this.#offersModel.init()]);
      const points = await this.#service.points;
      this.#points = points.map(adaptToClient);
      this.#handleTripInfoPresenterActivate();
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#points = [];
      this.messagePresenter.destroyComponent();
      this.messagePresenter.init({isError: true});
    }
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#service.updatePoint(update);
      const updatedPoint = adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#service.addPoint(update);
      const newPoint = adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#service.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
