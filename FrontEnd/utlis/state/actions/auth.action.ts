import { constants } from "../constants";
import { deleteCookie, setCookie } from "cookies-next";

const authAction = (payload: any) => async (dispatch: any) => {
  let token = payload.token;
  if (token) {
    setCookie("token", token);
    setCookie("userId", payload.id);
  }
  dispatch({ type: constants.LOGIN_SUCCESS, payload: payload });
};

const logoutAction = () => async (dispatch: any) => {
  deleteCookie("token");
  deleteCookie("userId");
  deleteCookie("planId");
  dispatch({ type: constants.LOGOUT, payload: null });
};

export { authAction, logoutAction };
