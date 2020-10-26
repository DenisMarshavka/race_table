export const GET_DRIVERS_DATA_START = 'GET_DRIVERS_DATA_START';
export const GET_DRIVERS_DATA_SUCCESS = 'GET_DRIVERS_DATA_SUCCESS';
export const GET_DRIVERS_DATA_ERROR = 'GET_DRIVERS_DATA_ERROR';
export const CLEAR_DRIVERS_DATA = 'CLEAR_DRIVERS_DATA';

export const GET_DRIVER_BY_ID_START = 'GET_DRIVER_BY_ID_START';
export const GET_DRIVER_BY_ID_SUCCESS = 'GET_DRIVER_BY_ID_SUCCESS';
export const GET_DRIVER_BY_ID_ERROR = 'GET_DRIVER_BY_ID_ERROR';
export const CLEAR_DRIVER_DATA = 'CLEAR_DRIVER_DATA';

import {DriversAPI} from '../../api/drivers';

const getDriversStart = () => ({
  type: GET_DRIVERS_DATA_START,
});

export const getAllDrivers = (offset = 0, limit = 15) => async (dispatch) => {
  try {
    dispatch(getDriversStart());

    const response = await DriversAPI.getAll(offset, limit);

    console.log(
      'Received when fetching the request "Get All Drivers Data By Page" to the API Data: ',
      response,
      ', Data: ',
      response.MRData,
    );

    if (
      response &&
      response.MRData &&
      response.MRData.DriverTable &&
      response.MRData.DriverTable.Drivers
    ) {
      dispatch(
        getDriversSuccess(response.MRData.DriverTable.Drivers, response.MRData),
      );
    } else dispatch(getDriversError('Error'));
  } catch (e) {
    console.log(
      'Error the request "Get All Drivers Data By Page" to the API: ',
      e,
    );

    dispatch(getDriversError(e));
  }
};

const getDriversSuccess = (list = [], listMeta = {}) => ({
  type: GET_DRIVERS_DATA_SUCCESS,
  payload: {list, listMeta},
});

const getDriversError = (payload = null) => ({
  type: GET_DRIVERS_DATA_ERROR,
  payload,
});

export const clearDriversData = () => ({
  type: CLEAR_DRIVERS_DATA,
});

/*--- DRIVER INFO ACTIONS ---*/
const getDriverByIdStart = () => ({
  type: GET_DRIVER_BY_ID_START,
});

export const getDriverById = (id = '') => async (dispatch) => {
  try {
    dispatch(getDriverByIdStart());

    const response = await DriversAPI.getDriverById(id);

    console.log(
      'Received when the fetching request "Get Driver Page By Id" to the API Data: ',
      response,
      ', Data: ',
      response.MRData,
    );

    if (
      response &&
      response.MRData &&
      response.MRData.DriverTable &&
      response.MRData.DriverTable.Drivers &&
      response.MRData.DriverTable.Drivers.length &&
      response.MRData.DriverTable.Drivers[0]
    ) {
      dispatch(
        getDriverByIdSuccess(
          response.MRData.DriverTable.Drivers[0],
          response.MRData,
        ),
      );
    } else dispatch(getDriverByIdError('Error'));
  } catch (e) {
    console.log('Error the request "Get Driver Page By Id" to the API: ', e);

    dispatch(getDriverByIdError(e));
  }
};

const getDriverByIdSuccess = (data = {}, meta = {}) => ({
  type: GET_DRIVER_BY_ID_SUCCESS,
  payload: {data, meta},
});

const getDriverByIdError = (payload = null) => ({
  type: GET_DRIVER_BY_ID_ERROR,
  payload,
});

export const clearDriverData = () => ({
  type: CLEAR_DRIVER_DATA,
});
