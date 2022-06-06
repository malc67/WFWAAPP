
import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import storage from '@react-native-firebase/storage';
import { styles } from "./Styles";
import InputField from "../../components/InputField";
import { colors } from "../../themes/colors";
import commonStyles from "../../themes/commonStyles";
import Button from "../../components/Button";
import CustomCheckBox from "../../components/CustomCheckBox";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Loader from "../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { Icon } from "@rneui/base";


const ImageOptions = {
    width: 500,
    height: 500,
    quality: 0.6,
    mediaType: 'photo',
};
const EditProfile = (props) => {
    const details = props?.route?.params?.data

    const [Bussiness, setBussiness] = useState(details ? details.Bussiness : '')
    const [ABN, setABN] = useState(details ? details.ABN : "")
    const [phoneNumber, setPhoneNumber] = useState(details ? details.phoneNumber : "")
    const [contactPerson, setContactPerson] = useState(details ? details.contactPerson : "")
    const [instalationAddress, setInstalationAddress] = useState(details ? details.instalationAddress : "")
    const [city, setCity] = useState(details ? details.city : "")
    const [state, setState] = useState(details ? details.state : "")
    const [WFAANZ, setWFAANZ] = useState(details ? details.WFAANZ : "")
    const [companyLogo, setCompanyLogo] = useState(details ? { uri: details.companyLogo } : '');
    const [member, setMember] = useState(false);
    const [installer, setInstaller] = useState(false);
    const [loading, setLoading] = useState(false);
    const { registerReducer } = useSelector(state => state)
    const FirebaseImagesStorageRef = storage()

    const addImage = () => {
        launchImageLibrary(ImageOptions, imageCallBack);
    };
    const imageCallBack = async response => {
        console.log('image response', response);
        if (response.didCancel) {
            console.log('Image Picker Canceled');
        } else if (response.error) {
            console.log('image picker error', response.error);
        } else {
            const uploadImageSource = {
                name: moment().format('x') + ".jpeg",
                uri: response.assets[0].uri,
                type: "image/jpeg",
            };
            setCompanyLogo(uploadImageSource);
        }
    };


    const updateImageToFirebase = async (userId) => {
        let data = { Bussiness, contactPerson, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo }
        console.log(companyLogo.uri);
        console.log(userId);
        if (companyLogo?.uri) {
            if(!companyLogo?.uri?.includes('https')){
                console.log("in If");
                setLoading(true)
                let isUploaded = false
                const extenstion = companyLogo?.uri?.split('.').pop()
                const fileName = `${moment().format('x')}.${extenstion}`
                const task = FirebaseImagesStorageRef.ref(`images/${fileName}`).putFile(companyLogo.uri)
                task.on('state_changed', taskSnapshot => {
                    if (taskSnapshot.state == 'success' && isUploaded === false) {
                        isUploaded = true
                        taskSnapshot.ref.getDownloadURL().then((response) => {
                            console.log("Image updated to fireStorage: ", response)
                            updateProfile(userId, response, data)
                        }).catch((error) => {
                            console.log('updateImageToFirebase', 'task', error)
                        })
                    } else {
                        console.log("in else");
                        let progressTemp = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(2)
                        console.log(`progress: ${progressTemp}`);
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    }
                })
            } else {
                setLoading(true)
                console.log("in else");
                updateProfile(userId, companyLogo?.uri, data)
            }
        } else {
            setLoading(true)
            console.log("in else");
            updateProfile(userId, companyLogo?.uri, data)
        }
    }

    const updateProfile = (userId, imageURL, data) => {
        try {
            console.log('In updateProfile');
            firestore().doc(`Users/${userId}`).update({
                ...data,
                companyLogo: imageURL
            })
            // Toast.show("Private Station has been updated")
            console.log("Profile has been updated");
            setTimeout(() => {
                props.navigation.goBack()
            }, 1000);
            setLoading(false)
        } catch (error) {
            console.log('updateProfile-error', error);
        }
    }



    return (
        <>
            <Header center={"Edit Profile"} />
            <View style={styles.mainView}>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} showsVerticalScrollIndicator={false} >
                    <View style={{ width: "100%", alignItems: "center" }}>
                        {/* <Text style={styles.blackTextStyle}>{"Customer Information"}</Text> */}
                        <View style={[commonStyles.innerViewStyle]} >
                            <InputField
                                placeholder={"Bussiness Name"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={commonStyles.inputContainerStyle}
                                inputStyle={commonStyles.inputInnerStyle}
                                onChangeText={(text) => setBussiness(text)}
                                value={Bussiness}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"Contact Person"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                onChangeText={(text) => setContactPerson(text)}
                                value={contactPerson}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"Phone"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                onChangeText={(text) => setPhoneNumber(text)}
                                value={phoneNumber}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"ABN Number"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                // secureTextEntry={true}
                                onChangeText={(text) => setABN(text)}
                                value={ABN}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"Bussiness Address"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                // secureTextEntry={true}
                                onChangeText={(text) => setInstalationAddress(text)}
                                value={instalationAddress}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"City/Suburb"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                onChangeText={(text) => setCity(text)}
                                value={city}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"State"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                onChangeText={(text) => setState(text)}
                                value={state}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />
                            <InputField
                                placeholder={"WFAANZ Member Number"}
                                placeholderTextColor={colors.placeholderColor}
                                containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                                inputStyle={commonStyles.inputInnerStyle}
                                onChangeText={(text) => setWFAANZ(text)}
                                value={WFAANZ}
                                // sterick={"*"}
                                sterickTextViewStyle={commonStyles.sterickTextViewStyle}
                                sterickTextStyle={commonStyles.sterickTextStyle}
                            />

                            <Text style={styles.textUpload}>
                                Upload Company Logo
                            </Text>
                            <TouchableOpacity activeOpacity={0.4} onPress={() => addImage()} style={{ alignItems: 'center' }}>
                                <View style={styles.uploadBox}>
                                    {companyLogo ?
                                        <Image source={companyLogo} style={{ width: '100%', height: '90%' }} />
                                        :
                                        <>
                                            <Icon type="antdesign" name="clouduploado" />
                                            <Text>Upload Company Logo</Text>
                                        </>
                                    }
                                </View>
                            </TouchableOpacity>
                            <View style={{ alignItems: "center" }}>
                                <Button
                                    buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.primaryColor, width: '100%' }]}
                                    textStyle={commonStyles.textStyle}
                                    text={"Done"}
                                    onPress={() => {
                                        updateImageToFirebase(registerReducer.data.id)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <Loader visible={loading} />
            </View>
        </>
    )

}
export default EditProfile;