import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./NewQuote.style";
import firestore from '@react-native-firebase/firestore';
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import Footer from "../../components/Footer";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputField from "../../components/InputField";
import QuoteItem from "../../components/QuoteItem";
import { useDispatch, useSelector } from "react-redux";
import RegisterFunction from "./Register.function";

import Button from "../../components/Button";
const NewQuote = (props) => {

  const { registerReducer } = useSelector(state => state)
  const [loading, createQuote] = RegisterFunction(props)


  const [quoteNumber, setQuoteNumber] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [jobName, setJobName] = useState("")
  const [siteState, setSiteState] = useState("")
  const [buildingSiteState, setBuildingSiteState] = useState("")
  const [siteAddress, setSiteAddress] = useState("")
  const [buildingAddress, setBuildingAddress] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [Mobile, setMobile] = useState("")
  const navigation = useNavigation()
  const route = useRoute()
  // const [loading, setLoading] = useState(false)

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    if (isEnabled) {
      setIsEnabled(!isEnabled)
    } else {
      setIsEnabled(!isEnabled)
      setBuildingAddress(siteAddress)
      setBuildingSiteState(siteState)
    }
    console.log('isEnabled', isEnabled)
  }



  const firestorer = async () => {
    if (quoteNumber == "") {
      alert('Quote number is required');
      return
    }
    if (customerName == "") {
      alert('Customer name is required');
      return
    }
    if (jobName == "") {
      alert('Job name is required');
      return
    }
    if (jobName == "") {
      alert('Job name is required');
      return
    }
    if (siteAddress == "") {
      alert('Site address is required');
      return
    }
    if (siteState == "") {
      alert('Site state is required');
      return
    }
    if (name == "") {
      alert('Name is required');
      return
    }
    if (email == "") {
      alert('Email is required');
      return
    }
    if (phone == "") {
      alert('Phone is required');
      return
    }
    if (Mobile == "") {
      alert('Mobile is required');
      return
    }
    if (buildingAddress == "") {
      alert('Building Address is required');
      return
    }
    if (buildingSiteState == "") {
      alert('Building state is required');
      return
    }
    // setLoading(true)
    let data = {
      "quote_number": quoteNumber,
      "customer_name": customerName,
      "job_name": jobName,
      "site_address": siteAddress,
      "site_state": siteState,
      "contact_name": name,
      "contact_email": email,
      "contact_phone": phone,
      "building_address": buildingAddress,
      "building_state": buildingSiteState,
    }
    createQuote(data)
  }

  return (
    <>
      {route?.params?.title ?
        <Header backArrow leftOnPress={() => navigation.goBack()} left={"Cancel"} center={"Request a Quote"} /> :
        <Header backArrow rightOnPress={() =>
          // navigation.navigate('MapClient', { title: 'Quotes' })
          firestorer()
        } leftOnPress={() => navigation.goBack()} left={"Cancel"} right={"Save"} center={"New Quote"} />}
      <View style={styles.mainView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={{ height: 20 }} />
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                {`Quote number`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={quoteNumber}
                onChangeText={(text) => setQuoteNumber(text)}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.titleText, { color: colors.redTextColor }]}>
                {`Customer Name`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={customerName}
                onChangeText={(text) => setCustomerName(text)}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                {`Job Name`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={jobName}
                onChangeText={(text) => setJobName(text)}
              />
            </View>
          </View>
          <Text style={styles.headerText4}>
            Site Address
          </Text>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.titleText, { color: colors.redTextColor }]}>
                {`Address`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={siteAddress}
                onChangeText={(text) => setSiteAddress(text)}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.titleText, { color: colors.redTextColor }]}>
                {`Suburb / State`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={siteState}
                onChangeText={(text) => setSiteState(text)}
              />
            </View>
          </View>
          {/* <Text style={styles.headerText4}>
            Pictures
          </Text>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                View Pictures
              </Text>
              <Icon style={{ padding: 10 }}
                name='right' type="antdesign" color={colors.primaryColor} size={17} />
            </View>
          </View> */}
          <Text style={styles.headerText4}>
            Contact
          </Text>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                {`Name`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                {`Email`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                {`Phone`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.titleText}>
                {`Mobile`}
              </Text>
              <TextInput
                style={styles.subTitleText}
                value={Mobile}
                onChangeText={(text) => setMobile(text)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.headerText4, { flex: 1 }]}>
              Billing Address
            </Text>
            <Switch
              style={{ marginHorizontal: 20, alignSelf: 'center' }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {
            !isEnabled ? (
              <>
                <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.titleText}>
                      {`Address`}
                    </Text>
                    <TextInput
                      style={styles.subTitleText}
                      value={buildingAddress}
                      onChangeText={(text) => setBuildingAddress(text)}
                    />
                  </View>
                </View>
                <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.titleText}>
                      {`Suburb / State`}
                    </Text>
                    <TextInput
                      style={styles.subTitleText}
                      value={buildingSiteState}
                      onChangeText={(text) => setBuildingSiteState(text)}
                    />
                  </View>
                </View>
              </>
            ) : <View style={{ height: 10 }} />
          }
        </KeyboardAwareScrollView>
      </View>
      {/* <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGraay, paddingBottom: 20, paddingHorizontal: 20 }}>
        <Button
          buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.whiteColor }]}
          textStyle={[commonStyles.buttonTextStyle, { fontWeight: 'bold' }]}
          text={route?.params?.title ? 'Send Quote' : "Send Cut List"}
          // onPress={() => { route?.params?.title ? props.navigation.navigate("Email") : props.navigation.navigate("Landing", { screen: "BrowseFilms" }) }}
          onPress={() => {
            firestorer()
          }}
        />
      </View> */}
    </>
  )
}
export default NewQuote;