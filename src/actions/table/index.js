export const GET_RACE_RESUlT_DATA_START = 'GET_RACE_RESUlT_DATA_START';
export const GET_RACE_RESUlT_DATA_SUCCESS = 'GET_RACE_RESUlT_DATA_SUCCESS';
export const GET_RACE_RESUlT_DATA_ERROR = 'GET_RACE_RESUlT_DATA_ERROR';
export const CLEAR_RACES_RESULTS_DATA = 'CLEAR_RACES_RESULTS_DATA';

import {RaceResulstAPI} from '../../api/index';

export const clearRacesData = () => ({
  type: CLEAR_RACES_RESULTS_DATA,
});

/*--- ALL RACES ---*/
const getRaceResultDataStart = (byDriverId = false) => ({
  type: GET_RACE_RESUlT_DATA_START,
  payload: {byDriverId},
});

export const getRaceResultData = (
  byDriverId = false,
  driverId = '',
  offset = 0,
  limit = 15,
) => async (dispatch) => {
  try {
    let response = null;
    dispatch(getRaceResultDataStart(byDriverId));

    if (!byDriverId) {
      response = await RaceResulstAPI.getResults(offset, limit);
    } else
      response = await RaceResulstAPI.getByDriverId(driverId, offset, limit);

    console.log('byDriverId: ', byDriverId, 'driverId: ', driverId);

    console.log(
      `Received when fetching the request "Get Races Results ${
        !byDriverId ? 'By Page' : 'By Driver'
      }" to the API Data: `,
      response.MRData.RaceTable.Races,
    );

    if (
      response &&
      response.MRData &&
      response.MRData.RaceTable &&
      response.MRData.RaceTable.Races
    ) {
      dispatch(
        getRaceResultDataSuccess(
          byDriverId,
          response.MRData.RaceTable.Races,
          response.MRData,
        ),
      );
    } else dispatch(getRaceResultDataError('Error'));
  } catch (e) {
    console.log(
      `Error the fetching request "Get Races Results ${
        !byDriverId ? 'By Page' : 'By Driver'
      }" to the API: `,
      e,
    );

    dispatch(getRaceResultDataError(e));
  }
};

const getRaceResultDataSuccess = (
  byDriverId = false,
  list = [],
  listMeta = {},
) => ({
  type: GET_RACE_RESUlT_DATA_SUCCESS,
  payload: {byDriverId, list, listMeta},
});

const getRaceResultDataError = (payload = null) => ({
  type: GET_RACE_RESUlT_DATA_ERROR,
  payload,
});
