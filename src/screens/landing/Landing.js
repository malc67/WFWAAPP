import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Landing.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import Quote from "../../components/Quotes";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Store/ActionsCreator";
import auth from '@react-native-firebase/auth';
import Header1 from "../../components/MainHeader";
import Footer1 from "../../components/Footer1";
import firestore from '@react-native-firebase/firestore';
import Button from "../../components/Button";
import { useIsFocused } from '@react-navigation/native';

const Landing = (props) => {
  const isFocused = useIsFocused();
  const data = [
    { Title: 'KBSC job center', subTitle: "26", place: 'KBSC in kombay', date: 'last modified: 20 Apr 2022', id: 1 },
    { Title: 'KBSC job center', subTitle: "26", place: 'KBSC in kombay', date: 'last modified: 20 Apr 2022', id: 2 },
    { Title: 'KBSC job center', subTitle: "26", place: 'KBSC in kombay', date: 'last modified: 20 Apr 2022', id: 3 },
    { Title: 'KBSC job center2', subTitle: "27", place: 'KBSC in khiyali', date: 'last modified: 20 Apr 2022', id: 4 }
  ]
  const navigation = useNavigation()
  const [ongoing, setOngoing] = useState(true)
  const [quotesList, setQuoteList] = useState([])
  const dispatch = useDispatch()
  const mainApp = StackActions.replace("SignInScreens")

  useEffect(() => {
    getQuotes()
  }, [isFocused])

  const getQuotes = () => {
    firestore().collection('create_quote').get().then((querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach(snapshot => {
        let data = snapshot.data();
        tempData.push(data);
      }
      )
      setQuoteList(tempData)
    })
  }

  const Logout = () => {
    auth().signOut()
    dispatch(signOut())
    props.navigation.dispatch(mainApp)
  }

  return (
    <>
      <Header1 plus left={'Quotes'} onPress={() => props.navigation.navigate('NewQuote')} />
      <Footer1
        onChangeTab={index => {

        }} />
      <View style={styles.mainView}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
          {/* <TouchableOpacity onPress={()=>navigation.navigate('BrowseFilms')}>
              <View style={styles.headerView}>
              <Text style={styles.headerText}>
                Browse film and performance data
              </Text>
              <Icon
               name='right' type="antdesign" color={colors.greyColor} size={25}/>
               </View>
            </TouchableOpacity> */}
          {/* <View style={styles.line}/> */}
          {/* <Text style={styles.QouteText}>QUOTE CENTER</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("NewQuote")}>
              <View style={styles.headerView}>
              <View style={{flexDirection:'row'}}>
              <Icon
               name='circle-with-plus' style={{marginRight:10}} type="entypo" color={colors.primaryColor} size={25}/>
              <Text style={{...styles.headerText,color:colors.blackTextColor,fontWeight:'500'}}>
               Create a new quote
              </Text>
               </View>
              <Icon
               name='right' type="antdesign" color={colors.greyColor} size={25}/>
               </View>
            </TouchableOpacity>
            <View style={styles.line1}/>
            <Text style={{...styles.QouteText,fontSize:19}}>19 UNSENT QUOTES</Text> */}
          <View style={styles.line3} />
          <FlatList
            data={quotesList}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View style={{ marginHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: colors.whiteColor }}>
                    <Quote title={item?.customer_name}
                      subtitle={item.job_name}
                      place={item.site_address}
                      date={`22-02-2021`}
                      onPress={() => navigation.navigate('MapClient', { title: 'Quotes', item: item })} />
                  </View>
                </>
              )
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGraay }}>
        <Button
          buttonStyle={[commonStyles.buttonStyle2, ongoing && styles.selectedbtn]}
          textStyle={[commonStyles.buttonTextStyle, ongoing && styles.selectedbtn, { fontWeight: 'bold' }]}
          onPress={() => {
            setOngoing(true)
            props.navigation.navigate('NewQuote')
          }}
          text={"Create New Quote"}
        />
        {/* <Button
          buttonStyle={[commonStyles.buttonStyle2, !ongoing && styles.selectedbtn]}
          onPress={() => {
            setOngoing(false)
            props.navigation.navigate('NewQuote', { title: 'Quote' })
          }
          }
          textStyle={[commonStyles.buttonTextStyle, !ongoing && styles.selectedbtn, { fontWeight: 'bold' }]}
          text={"Request Quote"}
        /> */}
      </View>
      {/* <Footer left={"About"} right={"Settings"}/> */}
    </>
  )
}
export default Landing;