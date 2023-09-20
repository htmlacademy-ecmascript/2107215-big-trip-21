import ApiService from './framework/api-service.js';
import {WebsiteAddress} from './const.js';
import {adaptToServer} from './utils/point.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: WebsiteAddress.POINTS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: WebsiteAddress.OFFERS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: WebsiteAddress.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${WebsiteAddress.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: WebsiteAddress.POINTS,
      method: Method.POST,
      body: JSON.stringify(adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${WebsiteAddress.POINTS}/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
