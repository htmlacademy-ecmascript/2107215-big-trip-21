import ApiService from './framework/api-service.js';
import { WebsiteAddress } from './const.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: WebsiteAddress.DESTINATIONS})
      .then(ApiService.parseResponse);
  }
}

