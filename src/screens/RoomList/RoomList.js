import React, { useState } from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import { colors } from "../../themes/colors"
import { Icon } from "@rneui/base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import InputField from "../../components/InputField";
import commonStyles from "../../themes/commonStyles";
import firestore from '@react-native-firebase/firestore';
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../../utils/Loader";


const RoomList = (props) => {
  const [password, setPassword] = useState("")
  const navigation = useNavigation()
  const route = useRoute()
  const { item } = props?.route?.params;

  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [hearList, setHearList] = useState("");

  const DATA = [
    {
      id: '1',
      title: 'Bathrom',
    },
    {
      id: '2',
      title: 'Bedroom',
    },
    {
      id: '3',
      title: 'Bedroom 2 & 3',
    },
    {
      id: '4',
      title: 'Bobby office',
    },
    {
      id: '5',
      title: 'Celestial',
    },
    {
      id: '6',
      title: 'control Tower',
    },
    {
      id: '7',
      title: 'Dinning Room',
    },
    {
      id: '8',
      title: 'Door',
    },
    {
      id: '9',
      title: 'Ensuit',
    },
  ];

  const addRoom = (title) => {
    const { onCreateNewRoomSuccess } = route?.params
    let tempRoomArray = [];
    console.log(item);
    if(item.myTempRoomList){
      console.log(`jjjn`);
      item.myTempRoomList.map((item) => {
        tempRoomArray.push(item)
      })
    }
    tempRoomArray.push({ roomTitle: title });
    let data = {
      ...item,
      RoomsList: tempRoomArray
    }
    console.log(`hhhhhhhhh====>`,tempRoomArray);
    setLoading(true)
    firestore().collection('create_quote').doc(item?.id)
      .set(data).then((res) => {
        alert("Room created successfully")
        navigation.goBack();
        setLoading(false)
        onCreateNewRoomSuccess({ roomTitle: title })
      }).catch((e) => {
        setLoading(false)
        console.log('erroorr==>>', e)
      })
  }

  return (
    <>
      <Header backArrow right={'Save'} leftOnPress={() => navigation.goBack()} rightOnPress={() => navigation.goBack()} left={"Map"} center={"New Room"} />
      <View style={{ flex: 1, backgroundColor: colors.lightGraay, margin: 0 }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <TouchableOpacity>
            {/* <View style={styles.mainView}> */}
            <Text style={styles.headerText3}>
              Room Name
            </Text>
            {/* </View> */}
          </TouchableOpacity>
          <View style={styles.mainView}>
            <Text style={styles.headerText}>
              Customer Name
            </Text>
            <InputField
              placeholder={"required"}
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '50%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={commonStyles.passwordInputinnerStyle}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const backgroundColor = item.id === selectedId ? true : false
              return (
                <>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedId(item.id)
                      setHearList(item.title)
                      addRoom(item.title)
                      // navigation.navigate('Room')
                    }}
                  >
                    <View style={styles.mainView}>
                      <Text style={styles.headerText}>
                        {item.title}
                      </Text>
                      {backgroundColor &&
                        <Icon
                          name='check' type="entypo" color={colors.primaryColor} size={20} />
                      }
                    </View>
                  </TouchableWithoutFeedback>
                </>)
            }}
            extraData={selectedId}
          />
        </KeyboardAwareScrollView>
      </View>
      <Loader visible={loading} />
    </>
  )

}
export default RoomList;
const styles = StyleSheet.create(
  {
    mainView: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      padding: 10,
      paddingVertical: 15,
      marginHorizontal: 20,
      borderRadius: 5,
      marginBottom: 2,
      backgroundColor: colors.whiteColor
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      padding: 10,
      paddingVertical: 10
    },
    headerText: {
      fontSize: 17,
      color: colors.greyColor,
      fontWeight: '500'
    },
    headerText3: {
      fontSize: 17,
      color: colors.greyColor,
      fontWeight: '500',
      lineHeight: 30,
      marginTop: 15,
      marginHorizontal: 20,
      textTransform: "uppercase"
    },
    line: {
      height: 0.8,
      backgroundColor: colors.greyColor
    }
  }
)