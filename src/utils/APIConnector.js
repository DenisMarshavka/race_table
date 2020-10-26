import axios from 'axios';
import config from './config';

const SERVER_URL = config.serverURL;

const APIMethods = {
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const request = async (route, method, params, token = true, user = false) => {
  let headers = {};

  let body = {
    url: SERVER_URL + route,
    headers,
    method: APIMethods[method],
  };

  if (APIMethods[method] !== 'GET') {
    body.data = params;
  }

  console.log('====================================');
  console.log('url', body);

  return axios(body)
    .then((response) => {
      console.log('========++++++++++++++++++++=========');
      console.log('axios.success', response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('==========-----------------============');
      console.log('axios.error', error);

      return {status: 'error', error};
    });
};

class API {
  url = '';

  constructor(url = '') {
    this.url = url;
  }

  GET = (internal = '', params, token, userToken) =>
    request(this.url + internal, APIMethods.GET, params, token, userToken);

  POST = (internal = '', params, token, userToken) =>
    request(this.url + internal, APIMethods.POST, params, token, userToken);

  PUT = (internal = '', params, token, userToken) =>
    request(this.url + internal, APIMethods.PUT, params, token, userToken);

  DELETE = (internal = '', params, token, userToken) =>
    request(this.url + internal, APIMethods.DELETE, params, token, userToken);
}

export default API;
