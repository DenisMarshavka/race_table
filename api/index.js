import API from '../utils/APIConnector';

const Request = new API();

export class RaceResulstAPI {
  static getData = async (offset = 0, limit = 15) =>
    await Request.GET(`/results?limit=${limit}&offset=${limit}`, {});
}
