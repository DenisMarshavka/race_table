import {
  GET_RACE_RESUlT_DATA_START,
  GET_RACE_RESUlT_DATA_SUCCESS,
  GET_RACE_RESUlT_DATA_ERROR,
} from '../actions/table';

const INITIAL_STATE = {
  loading: false,
  result: [],
  error: null,
};

const tableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RACE_RESUlT_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case GET_RACE_RESUlT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        result: [...action.payload],
        error: null,
      };

    case GET_RACE_RESUlT_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tableReducer;
