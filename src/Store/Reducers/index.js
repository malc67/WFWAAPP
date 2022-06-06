import { combineReducers } from "redux";
import authenticationReducer from "./AuthenticationReducer";
import registerReducer from "./RegisterReducer";
import userDataReducer from "./UserDataReducer";

const rootReducer = combineReducers({
    authenticationReducer: authenticationReducer,
    registerReducer: registerReducer,
    userDataReducer: userDataReducer
})
export default rootReducer;