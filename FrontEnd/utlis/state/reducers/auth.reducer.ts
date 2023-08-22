import { constants } from "../constants";

const initialState = {
  token: null,
  userData: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload,
      };
    case constants.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export { authReducer };
