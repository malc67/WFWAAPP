import { REGISTERDATA, SIGN_OUT } from "../Actions";

const initialState = { data: null }


const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTERDATA:
            return {
                data: action.Data,
            }
        case SIGN_OUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}
export default registerReducer;