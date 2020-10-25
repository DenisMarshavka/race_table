import {
  GET_RACE_RESUlT_DATA_START,
  GET_RACE_RESUlT_DATA_SUCCESS,
  GET_RACE_RESUlT_DATA_ERROR,
} from '../actions/table';

const INITIAL_STATE = {
  raceLoading: false,
  raceResult: [],
  listMeta: {},
  raceError: null,
};

const tableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RACE_RESUlT_DATA_START:
      return {
        ...state,
        raceLoading: true,
        raceError: null,
        listMeta: {},
      };

    case GET_RACE_RESUlT_DATA_SUCCESS:
      return {
        ...state,
        raceLoading: false,
        raceResult: [...action.payload.list],
        listMeta: {...action.payload.listMeta},
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
