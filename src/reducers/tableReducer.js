import {
  GET_RACE_RESUlT_DATA_START,
  GET_RACE_RESUlT_DATA_SUCCESS,
  GET_RACE_RESUlT_DATA_ERROR,
  CLEAR_RACES_RESULTS_DATA,
} from '../actions/table';

const INITIAL_STATE = {
  raceLoading: false,
  raceResult: [],
  listMeta: {},
  raceError: null,
  racesByDriverId: false,
};

const tableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*--- SPECIFICATIONS ---*/
    case CLEAR_RACES_RESULTS_DATA:
      return {
        ...state,
        raceLoading: false,
        raceError: null,
        listMeta: {},
        racesByDriverId: false,
      };
    /*--- SPECIFICATIONS ---*/

    case GET_RACE_RESUlT_DATA_START:
      return {
        ...state,
        raceLoading: true,
        raceError: null,
        listMeta: {},
        racesByDriverId: action.payload.byDriverId,
      };

    case GET_RACE_RESUlT_DATA_SUCCESS:
      return {
        ...state,
        raceLoading: false,
        raceResult: [...action.payload.list],
        listMeta: {...action.payload.listMeta},
        racesByDriverId: action.payload.byDriverId,
        raceError: null,
      };

    case GET_RACE_RESUlT_DATA_ERROR:
      return {
        ...state,
        raceLoading: false,
        raceError: action.payload,
        listMeta: {},
      };

    default:
      return state;
  }
};

export default tableReducer;
