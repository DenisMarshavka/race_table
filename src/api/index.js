import API from '../utils/APIConnector';

const Request = new API();

export class RaceResulstAPI {
  static getResults = async (offset = 0, limit = 15) =>
    await Request.GET(`/results.json?limit=${limit}&offset=${offset}`);

  static getByDriverId = async (driverId = '', offset = 0, limit = 15) =>
    await Request.GET(
      `/drivers/${driverId}/results.json?offset=${offset}&limit=${limit}`,
    );
}
