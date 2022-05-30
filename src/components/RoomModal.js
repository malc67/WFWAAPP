import React, { useState } from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import { colors } from "../themes/colors"
import { Icon } from "@rneui/base";
import Modal from "react-native-modal";
import Header from "./Header";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import InputField from "./InputField";
import commonStyles from "../themes/commonStyles";


const RoomModal = (props) => {
    const [password, setPassword] = useState("")
    
  const [selectedId, setSelectedId] = useState("");
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

    return (
        <Modal isVisible={props.isVisible} style={{margin:0}} onBackButtonPress={props.hide}>
        <Header right={'Save'} leftOnPress={props.hide} rightOnPress={props.hide} left={"Cancel"} center={"New Room"}/>
        <View style={{ flex: 1,backgroundColor:colors.whiteColor,margin:0 }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
        <TouchableOpacity>
              <View style={styles.mainView}>
              <Text style={styles.headerText}>
                Room Name
              </Text>
               </View>
            </TouchableOpacity>
            <View style={styles.line}/>
              <View style={styles.headerView}>
              <Text style={styles.headerText3}>
               Customer Name
              </Text>
                <InputField
                placeholder={"required"}
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'50%',borderColor:colors.whiteColor}]}
                inputStyle={commonStyles.passwordInputinnerStyle}
                onChangeText={(text) => setPassword(text)}
                value={password}
                    />
               </View>
               <View style={styles.line}/>
               <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
            const backgroundColor = item.id === selectedId ? true : false
            return(
                <>
                <TouchableWithoutFeedback
                onPress={()=>{
                    setSelectedId(item.id)
                    setHearList(item.title)
                  }}
                >
                 <View style={styles.mainView}>
                   <Text style={styles.headerText}>
                         {item.title}
                     </Text>
                     { backgroundColor &&
                     <Icon
                     name='check' type="entypo" color={colors.darkGray} size={20}/>
                     }
                 </View>
                 </TouchableWithoutFeedback>
                 <View style={styles.line}/>
                 </>)}}
            extraData={selectedId}
            />
        </KeyboardAwareScrollView>
        </View>
      </Modal>
    )

}
export default RoomModal;
const styles = StyleSheet.create(
    {
        mainView:{
            flexDirection:'row',
            justifyContent:"space-between",
            alignItems:'center',
            padding:10,
            paddingVertical:20
        },
        headerView:{
            flexDirection:'row',
            justifyContent:"space-between",
            alignItems:'center',
            padding:10,
            paddingVertical:10
        },
        headerText:{
            fontSize:17,
            color:colors.greyColor,
            fontWeight:'500'
        },
        headerText3:{
            fontSize:17,
            color:colors.redTextColor,
            fontWeight:'500',
            lineHeight: 30
        },
        line:{
            height:0.8,
            backgroundColor:colors.greyColor
        }
    }
)