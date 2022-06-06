import { USERDETAILS } from "../Actions";
const initialState = { userData: null }


const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERDETAILS:
            return {
                ...state,
                USERDETAILS: action.payload

            }
        default:
            return state
    }
}
export default userDataReducer;