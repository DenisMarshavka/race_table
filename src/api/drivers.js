import API from '../utils/APIConnector';

const Request = new API();

export class DriversAPI {
  static getAll = async (offset = 0, limit = 10) =>
    await Request.GET(`/drivers.json?limit=${limit}&offset=${limit}`);

  static getDriverById = async (id = '') =>
    await Request.GET(`/drivers/${id}.json`);
}
