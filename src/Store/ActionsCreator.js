import { SIGN_IN, SIGN_OUT,REGISTERDATA } from "./Actions";

export const signIn = (user) => {
    return {
        type: SIGN_IN,
        user: user.userData,
        isLogin: user.isLogin,
    }
}

export const registerData = (data) => {
    return {
        type: REGISTERDATA,
        Data: data.register
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
        user: null,
        isLogin: false
    }
}