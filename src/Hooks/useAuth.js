import { useState } from "react"
import useLogin from "./useLogin"
import auth from '@react-native-firebase/auth';
import { navigateAndSimpleReset } from "@/Navigators/utils";
import { useSelector } from 'react-redux'
import useRegister from "./useRegister";
import useBussinessProfile from "./useBussinessProfile";
import { useDispatch } from 'react-redux'
import { updateInfo, clearAuth } from '@/Store/Auth'

export default function () {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const onClearAuth = () => {
        dispatch(clearAuth())
    }

    const signOut = () => {
        setLoading(true)
        auth().signOut()
            .then(() => {
                setLoading(false)
                onClearAuth()
                navigateAndSimpleReset('Login')
            })
            .catch(error => {
                setLoading(false)
                if (error.code === 'auth/no-current-user') {
                    onClearAuth()
                    navigateAndSimpleReset('Login')
                }
                console.log('signOut', error)
            });
    }

    const authInfo = useSelector(state => state.auth || {})

    const base = {
        Login: useLogin(),
        Register: useRegister(),
        BussinessProfile: useBussinessProfile(),
        SignOut: [loading, signOut],
        Data: { ...authInfo }
    }

    return base
}