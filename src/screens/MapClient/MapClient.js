import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./MapClient.style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import commonStyles from "../../themes/commonStyles";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import QuoteItem from "../../components/QuoteItem";
import firestore from '@react-native-firebase/firestore';
import InputField from "../../components/InputField";
import { Icon } from "@rneui/base";
import Button from "../../components/Button";
import Loader from "../../utils/Loader";
import _ from 'lodash';
import MapClientFunction from './MapClientFunction';
import { useIsFocused } from '@react-navigation/native';
const MapClient = (props) => {
  const { quotesData, item } = props?.route?.params;
  var tempItem = item;
  const data2 = [
    { Title: 'Office', subtitle: "1 Window", id: 1 },
    { Title: 'Spare', subtitle: "1 Window", id: 2 },
  ]

  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused();
  const [ongoing, setOngoing] = useState(true)
  const [roomList, setRoomList] = useState([])
  const [itemToSend, setItemToSend] = useState(item)
  const [temploading, setTempLoading] = useState(false);
  const [loading, getQuotes] = RegisterFunction(props)

  useEffect(() => {
    getCollectionData();
  }, [isFocused, navigation])

  const getCollectionData = async () => {
    setTempLoading(true)
    try {
      firestore().collection('create_quote').doc(item.id).get()
        .then(snapshot => {
          let data = snapshot.data();
          setTempLoading(false);
          let tempRoomList = [];
          data?.RoomsList?.map((item) => {
            tempRoomList.push(item)
          })
          setRoomList(tempRoomList)
          tempItem.myTempRoomList = tempRoomList

        })
    } catch (err) {
      setTempLoading(false)
      throw err;
    }




    // firestore().collection('create_quote')
    //   .add(data).then((res) => {
    //     setTempLoading(false)
    //   }).catch((e) => {
    //     setTempLoading(false)
    //     console.log('erroorr==>>', e)
    //   })
  }

  return (
    <>
      <Header dellIcon backArrow leftOnPress={() => navigation.goBack()} left={route?.params?.title ? route.params.title : "Map"} center={_.isNil(quotesData?.job_name) !== true ? `${quotesData?.job_name}` : 'Job Name'} />
      <View style={styles.mainView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <Text style={{ ...styles.QouteText, fontSize: 16 }}>Browse Tint Films</Text>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <QuoteItem
              title={'Client'}
              subTitle={_.isNil(quotesData?.customer_name) !== true ? `${quotesData?.customer_name}` : ''}
              onPress={() => {
                console.log(`i m here`);
                // onPress(item)
              }}
            />
            <View style={styles.line1} />
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <QuoteItem
              title={`Tint Films`}
              subTitle={`Natura 15`}
              onPress={() => {
                navigation.navigate('SelectFilms')
              }} />
            <View style={styles.line1} />
          </View>
          <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
            <QuoteItem
              title={`Notes`}
              subTitle={``}
              onPress={() => {
                navigation.navigate('Notes')
              }} />
            <View style={styles.line1} />
          </View>
          {/* <FlatList
                data={data}
                keyExtractor={item =>item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                style={{ width: "100%" }}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{marginHorizontal:20,borderRadius:5,marginBottom:2,backgroundColor:colors.whiteColor}}>
                    <QuoteItem 
                    title={item.Title}
                    subTitle={item.subtitle}
                    onPress={()=>onPress(item)}/>
                    <View style={styles.line1}/>
                    </View>
                    )
                  }}/> */}
          <Text style={{ ...styles.QouteText, fontSize: 16 }}>Rooms</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('List', { item: tempItem }) }}>
            <View style={styles.headerView}>
              <View style={styles.NewTextView}>
                <Icon
                  name='circle-with-plus' style={{ marginRight: 5 }} type="entypo" color={colors.primaryColor} size={20} />
                <Text style={{ ...styles.headerText, color: colors.blackTextColor, fontWeight: '500' }}>
                  Add a New Room
                </Text>
              </View>
              <Icon
                name='right' type="antdesign" color={colors.primaryColor} size={17} />
            </View>
          </TouchableOpacity>
          <FlatList
            data={roomList}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              console.log(`item in flat list==>`, item);
              return (
                <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <QuoteItem title={item?.roomTitle}
                    subTitle={item.roomTitle}
                    onPress={() => navigation.navigate('Room')} />
                </View>
              )
            }}
          />
          <TouchableOpacity >
            <View style={{ ...styles.headerView, paddingVertical: 10, marginTop: 15 }}>
              <Text style={styles.title1}>
                Duplicate Job
              </Text>
              <Icon
                name='right' type="antdesign" color={colors.greyColor} size={25} />
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGraay }}>
        <Button
          buttonStyle={[commonStyles.buttonStyle2, ongoing && styles.selectedbtn]}
          textStyle={[commonStyles.buttonTextStyle, ongoing && styles.selectedbtn, { fontWeight: 'bold' }]}
          onPress={() => {
            setOngoing(true)
            props.navigation.navigate('CreateQuote', { title: 'MapClient' })
          }}
          text={"Create Quote"}
        />
        <Button
          buttonStyle={[commonStyles.buttonStyle2, !ongoing && styles.selectedbtn]}
          onPress={() => {
            setOngoing(false)
            props.navigation.navigate('NewQuote', { title: 'Quote' })
          }
          }
          textStyle={[commonStyles.buttonTextStyle, !ongoing && styles.selectedbtn, { fontWeight: 'bold' }]}
          text={"Send Cut List"}
        />
      </View>
      <Loader visible={temploading} />
    </>
  )
}
export default MapClient;