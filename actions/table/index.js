export const GET_RACE_RESUlT_DATA_START = 'GET_RACE_RESUlT_DATA_START';
export const GET_RACE_RESUlT_DATA_SUCCESS = 'GET_RACE_RESUlT_DATA_START';
export const GET_RACE_RESUlT_DATA_ERROR = 'GET_RACE_RESUlT_DATA_ERROR';

import RaceResulstAPI from '../../api';

const getDataStart = () => ({
  type: GET_RACE_RESUlT_DATA_START,
});

export const getData = (offset = 0, limit = 15) => async (dispatch) => {
  try {
    dispatch(getDataStart());

    const response = await RaceResulstAPI.getData(offset, limit);

    console.log(
      'Received when fetched the request "Get Race Data By Page" to the API Data: ',
      response,
      ', Data: ',
      response.data,
    );

    if (response && response.status && response.status === 'success') {
      await dispatch(getDataSuccess(response.data));
    } else dispatch(getDataError('Error'));
  } catch (e) {
    console.log('Error the request "Get Race Data By Page" to the API: ', e);

    dispatch(getDataError(e));
  }
};

const getDataSuccess = (payload = []) => ({
  type: GET_RACE_RESUlT_DATA_SUCCESS,
  payload,
});

const getDataError = (payload = null) => ({
  type: GET_RACE_RESUlT_DATA_ERROR,
  payload,
});
