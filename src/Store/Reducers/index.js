import { combineReducers } from "redux";
import authenticationReducer from "./AuthenticationReducer";
import registerReducer from "./RegisterReducer";
const rootReducer = combineReducers({
    authenticationReducer: authenticationReducer,
    registerReducer:registerReducer
})
export default rootReducer;