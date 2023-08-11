import {getRandomComponent} from '../mock/point-mock.js';
import {ROUTE_COUNT} from '../const.js';

export default class PointModel {
  point = Array.from({length: ROUTE_COUNT}, getRandomComponent);

  getTasks() {
    return this.point;
  }
}
