import {
  GET_DRIVERS_DATA_START,
  GET_DRIVERS_DATA_SUCCESS,
  GET_DRIVERS_DATA_ERROR,
  GET_DRIVER_BY_ID_START,
  GET_DRIVER_BY_ID_SUCCESS,
  GET_DRIVER_BY_ID_ERROR,
  CLEAR_DRIVER_DATA,
} from '../actions/drivers';

const INITIAL_STATE = {
  driversloading: false,
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
      return {
        ...state,
        driversloading: true,
        driversError: null,
        listMeta: {},
      };

    case GET_DRIVERS_DATA_SUCCESS:
      return {
        ...state,
        driversloading: false,
        drivers: [...action.payload.list],
        listMeta: {...action.payload.listMeta},
        driversError: null,
      };

    case GET_DRIVERS_DATA_ERROR:
      return {
        ...state,
        driversloading: false,
        driversError: action.payload,
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
        driverInfoLoading: true,
        driverInfo: {},
        driverMeta: {},
        driverInfoError: null,
      };

    default:
      return state;
  }
};

export default driversReducer;
