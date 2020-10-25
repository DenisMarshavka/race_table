export const GET_RACE_RESUlT_DATA_START = 'GET_RACE_RESUlT_DATA_START';
export const GET_RACE_RESUlT_DATA_SUCCESS = 'GET_RACE_RESUlT_DATA_SUCCESS';
export const GET_RACE_RESUlT_DATA_ERROR = 'GET_RACE_RESUlT_DATA_ERROR';

import {RaceResulstAPI} from '../../api/index';

const getRaceResultDataStart = () => ({
  type: GET_RACE_RESUlT_DATA_START,
});

export const getRaceResultData = (offset = 0, limit = 15) => async (
  dispatch,
) => {
  try {
    dispatch(getRaceResultDataStart());

    const response = await RaceResulstAPI.getResults(offset, limit);

    console.log(
      'Received when fetched the request "Get Race Data By Page" to the API Data: ',
      response,
      ', Data: ',
      response.MRData.RaceTable.Races,
    );

    if (
      response &&
      response.MRData &&
      response.MRData.RaceTable &&
      response.MRData.RaceTable.Races
    ) {
      await dispatch(
        getRaceResultDataSuccess(
          response.MRData.RaceTable.Races,
          response.MRData,
        ),
      );
    } else dispatch(getRaceResultDataError('Error'));
  } catch (e) {
    console.log('Error the request "Get Race Data By Page" to the API: ', e);

    dispatch(getRaceResultDataError(e));
  }
};

const getRaceResultDataSuccess = (list = [], listMeta = {}) => ({
  type: GET_RACE_RESUlT_DATA_SUCCESS,
  payload: {list, listMeta},
});

const getRaceResultDataError = (payload = null) => ({
  type: GET_RACE_RESUlT_DATA_ERROR,
  payload,
});
