import {
  GET_DRIVERS_DATA_START,
  GET_DRIVERS_DATA_SUCCESS,
  GET_DRIVERS_DATA_ERROR,
  CLEAR_DRIVERS_DATA,
  GET_DRIVER_BY_ID_START,
  GET_DRIVER_BY_ID_SUCCESS,
  GET_DRIVER_BY_ID_ERROR,
  CLEAR_DRIVER_DATA,
} from '../actions/drivers';

const INITIAL_STATE = {
  driversLoading: false,
  drivers: [],
  listMeta: {},
  driversError: null,

  driverInfoLoading: false,
  driverInfo: {},
  driverMeta: {},
  driverInfoError: null,
};

const driversReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DRIVERS_DATA_START:
      console.log('START');

      return {
        ...state,
        driversLoading: true,
        driversError: null,
        listMeta: {},
      };

    case GET_DRIVERS_DATA_SUCCESS:
      console.log('GET_DRIVERS_DATA_SUCCESS');

      return {
        ...state,
        driversLoading: false,
        drivers: [...action.payload.list],
        listMeta: {...action.payload.listMeta},
        driversError: null,
      };

    case GET_DRIVERS_DATA_ERROR:
      return {
        ...state,
        driversLoading: false,
        driversError: action.payload,
        listMeta: {},
      };

    case CLEAR_DRIVERS_DATA:
      return {
        ...state,
        driversLoading: false,
        driversError: null,
        drivers: {},
        listMeta: {},
      };

    /*--- DRIVER INFO ACTIONS ---*/
    case GET_DRIVER_BY_ID_START:
      return {
        ...state,
        driverInfoLoading: true,
        driverInfoError: null,
        driverMeta: {},
        driverInfo: {},
      };

    case GET_DRIVER_BY_ID_SUCCESS:
      return {
        ...state,
        driverInfoLoading: false,
        driverInfo: {...action.payload.data},
        driverMeta: {...action.payload.meta},
        driverInfoError: null,
      };

    case GET_DRIVER_BY_ID_ERROR:
      return {
        ...state,
        driverInfoLoading: false,
        driverInfoError: action.payload,
      };

    case CLEAR_DRIVER_DATA:
      return {
        ...state,
        driverInfoLoading: false,
        driverInfo: {},
        driverMeta: {},
        driverInfoError: null,
      };

    default:
      return state;
  }
};

export default driversReducer;
