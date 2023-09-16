import ApiService from './framework/api-service.js';
import {WebsiteAddress} from './const.js';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: WebsiteAddress.OFFERS})
      .then(ApiService.parseResponse);
  }
}
