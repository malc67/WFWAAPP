import { useState } from "react";
import { reg } from "../../utils/ValidationConstants";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { registerData } from "../../Store/ActionsCreator";
import { useDispatch, useSelector } from "react-redux";
import storage from '@react-native-firebase/storage';
import moment from "moment";

export default RegisterFunction = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const FirebaseImagesStorageRef = storage()
    const firestoreRef = firestore()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { registerReducer } = useSelector(state => state)

    const registerValidation = (email, password) => {
        if (email === "") {
            alert("Email is required")
            // AlertComponent({ msg: "Email/Mobile Number is required", title: "Error", type: "error" })
        }
        else if (reg.test(email) == false) {
            alert("Email is invalid")
            // AlertComponent({ msg: "Email is invalid", title: "Error", type: "error" })
        }

        else if (password == "") {
            alert("Password is required")
            // AlertComponent({ msg: "Password is required", type: "error", title: "Error" })
        }
        else if (password.length <= 7) {
            alert("Password must be 8 characters")
            // AlertComponent({ msg: "Password must be 8 characters", type: "error", title: "Error" })
        }
        else {
            // loginApiCall(email, password)
            registerApiCall(email, password);
            // console.log(purchaser, email, phoneNumber, contactPerson, instalationAddress, city, state, password,rePassword,value)
        }
    }

    const registerApiCall = async (email, password) => {    
        setLoading(true)
        auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                console.log(userCredentials.user.uid)
                dispatch(registerData({ register: userCredentials.user.uid }))
                //   firestorer(userCredentials,purchaser, email, phoneNumber, contactPerson, instalationAddress, city, state,value)
                setLoading(false)
                navigation.navigate("Bussines")
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }

                console.error(error);
                setLoading(false)
            });
    }

    // ----------------------------For Business Screen--------------------------
    const BussinessValidation = (Bussiness, contactPerson, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo) => {
        if (Bussiness === "") {
            alert("Bussiness name is required")
            // AlertComponent({ msg: "Email/Mobile Number is required", title: "Error", type: "error" })
        } else if (contactPerson == "") {
            alert("Contact Person name is required")
            // AlertComponent({ msg: "Password is required", type: "error", title: "Error" })
        } else if (phoneNumber == "") {
            alert("Phone number is required")
            // AlertComponent({ msg: "Password is required", type: "error", title: "Error" })
        }
        else if (ABN == "") {
            alert("ABN Number is required")
            // AlertComponent({ msg: "Password is required", type: "error", title: "Error" })
        }
        else if (instalationAddress == "") {
            alert("Bussiness Address is required")
            // AlertComponent({ msg: "Password is required", type: "error", title: "Error" })
        }
        else if (city == '') {
            alert("City name is required")
        }
        else if (state == '') {
            alert("state name is required")
        }
        else {
            // loginApiCall(email, password)
            let data = { Bussiness, contactPerson, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo }
            uploadImageToFirebase(data)
        }
    }

    const uploadImageToFirebase = async (data) => {
        console.log('in upload image');
        console.log(data?.companyLogo?.uri);
        // return false;
        setLoading(true)
        if(data?.companyLogo?.uri != undefined) {
        let isUploaded = false
        const extenstion = data?.companyLogo?.uri.split('.').pop()
        const fileName = `${moment().format('x')}.${extenstion}`
        const task = FirebaseImagesStorageRef.ref(`images/${fileName}`).putFile(data?.companyLogo?.uri)
        task.on('state_changed', taskSnapshot => {
            console.log("state..................");
            if (taskSnapshot.state == 'success' && isUploaded === false) {
                isUploaded = true
                taskSnapshot.ref.getDownloadURL().then((response) => {
                    console.log("Image uploaded to fireStorage: ", response)
                    setLoading(false)
                    firestorer(data, response)
                }).catch((error) => {
                    console.log('onUploadRecordingPress', 'task', error)
                })
            } else {
                console.log("in else");
                let progressTemp = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(2)
                console.log(`progress: ${progressTemp}`);
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            }
        })
     } else {
        firestorer(data, '')
     }
    }

    const firestorer = async (arg, uploadedImage) => {
        try {
            setLoading(true)
            console.log(registerReducer.data)
            console.log(arg)
            firestore().collection('Users').doc(registerReducer.data)
                .set({
                    ...arg,
                    companyLogo: uploadedImage
                }).then((res) => {
                    alert("User Successfuly Registered")
                    setLoading(false)
                    navigation.navigate("Login")
                }).catch((e) => {
                    setLoading(false)
                    console.log('error==>>', e)
                })
                firestoreRef.doc(`Users/${registerReducer.data}`).update({ id: registerReducer.data }).catch((error) => {
                console.log('error', error)
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    return [loading, registerValidation, BussinessValidation];
};