import * as types from "./notesActionType";
let notes = {
  isLoading: false,
  isError: false,
  notes: {},
};

export const notesReducer = (state = notes, action) => {
  let { type, payload } = action;
  switch (type) {
    case types.GET_NOTES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        notes: {},
      };
    case types.GET_NOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        notes: payload,
      };
    case types.GET_NOTES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        notes: {},
      };
    default:
      return state;
  }
};
