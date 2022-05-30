import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Windows.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import Footer from "../../components/Footer";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputField from "../../components/InputField";
const Windows = (props) => {
  const [password, setPassword] = useState("")
  const [job, setJob] = useState("")
  const [state, setState] = useState("")
  const [address, setAddress] = useState("")
  const [state1, setState1] = useState("")
  const [address1, setAddress1] = useState("")
  const [ladder, setLadder] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [Mobile, setMobile] = useState("")
  const [listOfItems, setListOfItems] = useState([
    { id:1,data: "N" }
    ,{ id:2,data: "E"},
    { id:3,data: 'S' },
    { id:4,data: 'W' },
])
  const [listOfItems1, setListOfItems1] = useState([
    { id:1,data: "Light" }
    ,{ id:2,data: "Dark"},
])
    const [selectedId, setSelectedId] = useState(1);
    const [selectedId1, setSelectedId1] = useState(1);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const [isEnabled1, setIsEnabled1] = useState(false);
  const navigation =useNavigation()
  const route=useRoute()
    return (
        <>
          <Header rightIcon backArrow leftOnPress={()=>navigation.goBack()} left={'Room'} center={"580 *112"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={{height:20}}/>
              <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Width
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setPassword(text)}
                value={password}
                    />
               </View>
               <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Height
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setJob(text)}
                value={job}
                    />
               </View>

              <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Quantity
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setAddress(text)}
                value={address}
                    />
               </View>
               <View style={{height:20}}/>
              <View style={styles.headerView}>
              <Text style={styles.headerText5}>
              Name
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setState(text)}
                value={state}
                    />
               </View>
               <TouchableOpacity >
               <View style={styles.headerView}>
                   <Text style={styles.headerText5}>
                Tint film
                   </Text>
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                   <Text style={styles.headerText}>
                Otpitune
                   </Text>
                  <Icon
               name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                   </View>
                </View>
               </TouchableOpacity>
               <TouchableOpacity >
               <View style={styles.headerView}>
                   <Text style={styles.headerText5}>
                Notes
                   </Text>
                  <Icon
               name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                </View>
               </TouchableOpacity>
               <View style={{height:20}}/>
               <TouchableOpacity  onPress={()=>navigation.navigate('Picture')}>
               <View style={styles.headerView}>
                   <Text style={styles.headerText5}>
                Add Pictures
                   </Text>
                  <Icon
               name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                </View>
               </TouchableOpacity>
               <View style={{height:20}}/>

               <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Aspect
              </Text>
              <View style={{marginLeft:15,overflow:'hidden',borderRadius:10,borderColor:colors.darkGray,borderWidth:0.5}}>
              <FlatList
            data={listOfItems}
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const iconVisible = item.id === selectedId ? true : false
                return(
                    <View style={styles.recomView}>
            <TouchableOpacity
            onPress={()=>{
                setSelectedId(item.id)
            }}
            >
        <View style={{...styles.view3,backgroundColor:iconVisible?colors.darkGray:colors.whiteColor}}>
          <Text style={{color:iconVisible?colors.whiteColor:colors.darkGray}}>
                {item.data}
            </Text>
         </View>
           </TouchableOpacity>
          </View>
            )}}
            extraData={selectedId}/>
            </View>
               </View>
               <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Frame Type
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setPhone(text)}
                value={phone}
                    />
               </View>
               <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Frame colour
              </Text>
              <View style={{marginLeft:15,overflow:'hidden',borderRadius:10,borderColor:colors.darkGray,borderWidth:0.5}}>
              <FlatList
            data={listOfItems1}
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const iconVisible = item.id === selectedId1 ? true : false
                return(
                    <View style={styles.recomView}>
            <TouchableOpacity
            onPress={()=>{
                setSelectedId1(item.id)
            }}
            >
        <View style={{...styles.view3,backgroundColor:iconVisible?colors.darkGray:colors.whiteColor}}>
          <Text style={{color:iconVisible?colors.whiteColor:colors.darkGray}}>
                {item.data}
            </Text>
         </View>
           </TouchableOpacity>
          </View>
            )}}
            extraData={selectedId1}/>
            </View>
              </View>
              <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Glass type
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setAddress1(text)}
                value={address1}
                    />
               </View>
              <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Glass thickness
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setState1(text)}
                value={state1}
                    />
               </View>
               <View style={styles.headerView}>
                   <Text style={styles.headerText5}>
                Include corking
                   </Text>
                <View style={{ backgroundColor: isEnabled ? colors.primaryColor : colors.greyColor, borderRadius: 20 }}>
               <Switch
                 ios_backgroundColor={colors.greyColor}
                thumbColor={isEnabled ? colors.whiteColor : colors.whiteColor}
                 trackColor={{true: colors.primaryColor, false: colors.greyColor}}
                 onValueChange={toggleSwitch}
                 value={isEnabled}
                />
              </View>
                </View>
                <View style={styles.headerView}>
                   <Text style={styles.headerText5}>
                Film removal required
                   </Text>
                <View style={{ backgroundColor: isEnabled1 ? colors.primaryColor : colors.greyColor, borderRadius: 20 }}>
               <Switch
                 ios_backgroundColor={colors.greyColor}
                thumbColor={isEnabled1 ? colors.whiteColor : colors.whiteColor}
                 trackColor={{true: colors.primaryColor, false: colors.greyColor}}
                 onValueChange={toggleSwitch1}
                 value={isEnabled1}
                />
              </View>
                </View>
                <View style={styles.headerView}>
              <Text style={styles.headerText5}>
               Ladder type
              </Text>
                <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={[commonStyles.passwordInputinnerStyle,{color:colors.blue}]}
                onChangeText={(text) => setLadder(text)}
                value={ladder}
                    />
               </View>
               <View style={{height:40}}/>
          </KeyboardAwareScrollView>
          </View>
         {/* <Footer rightIcon/> */}
        </>
    )
}
export default Windows;