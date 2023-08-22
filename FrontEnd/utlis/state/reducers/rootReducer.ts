import { authReducer } from "./auth.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userData: authReducer,
});

export { rootReducer };
