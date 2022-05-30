import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./CreateQuote.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import Footer from "../../components/Footer";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputField from "../../components/InputField";
import CustomCheckBox from "../../components/CustomCheckBox";
import Button from "../../components/Button";
const CreateQuote = (props) => {
  const [password, setPassword] = useState("")
  const [price, setPrice] = useState("")
  const [priceSealing, setPriceSealing] = useState("")
  const data=[
    {Title:'KBSC job center',subTitle:"quote 26",place:'KBSC in kombay',date:'last modified:2/12/21',id:1},
    {Title:'KBSC job center',subTitle:"quote 26",place:'KBSC in kombay',date:'last modified:2/12/21',id:2},
    {Title:'KBSC job center',subTitle:"quote 26",place:'KBSC in kombay',date:'last modified:2/12/21',id:3},
    {Title:'KBSC job center2',subTitle:"quote 27",place:'KBSC in khiyali',date:'last modified:2/14/21',id:4}
  ]
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);

  const onChange=()=>{
    if (check) {
      setCheck(false)
    } else {
      setCheck(true)
    }
  }
  const onChange1=()=>{
    if (check1) {
      setCheck1(false)
    } else {
      setCheck1(true)
    }
  }
  const navigation =useNavigation()
  const route=useRoute()
  const [ongoing, setOngoing] = useState(true)

    return (
        <>
          <Header rightOnPress={()=>navigation.navigate('Landing',{screen:"Quotes"})} dellIcon={route?.params?.title =="MapClient"?false:true} backArrow leftOnPress={()=>navigation.goBack()} left={"Map"} center={"New Quote"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.area}/>
              {route?.params?.title !=="MapClient"?<View style={styles.headerView}>
              <Text style={styles.headerText}>
                Office
              </Text>
              <CustomCheckBox isChecked={check} onChange={()=>onChange()}/>
               </View>:null}
            <TouchableOpacity>
              <View style={styles.headerView}>
              <Text style={styles.headerText}>
                Glass Area
              </Text>
              <Text style={styles.headerText1}>
                2.53m
              </Text>
               </View>
            </TouchableOpacity>
              <View style={styles.headerView}>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.headerText3}>
               Price Per m
              </Text>
               <Text style={styles.sub}>2</Text>
                </View>
                <InputField
                placeholder={"$ per m" + "\u00B2"}
                autoComplete={"password"}
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
                inputStyle={commonStyles.passwordInputinnerStyle}
                onChangeText={(text) => setPassword(text)}
                value={password}
                />
               </View>
                <>
               <View style={styles.headerView}>
               <View style={{flexDirection:'row'}}>
               <Text style={styles.headerText3}>
                 Price Film Removal
               </Text>
               </View>
               <InputField
               placeholder={"$ per m" + "\u00B2"}
               autoComplete={"password"}
               placeholderTextColor={colors.greyTypeColor}
               containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
               inputStyle={commonStyles.passwordInputinnerStyle}
               onChangeText={(text) => setPrice(text)}
               value={price}
                   />
              </View>
               <View style={styles.headerView}>
               <View style={{flexDirection:'row'}}>
             <Text style={styles.headerText3}>
              Price for Sealing
             </Text>
               </View>
               <InputField
               placeholder={"$ per m" + "\u00B2"}
               autoComplete={"password"}
               placeholderTextColor={colors.greyTypeColor}
               containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
               inputStyle={commonStyles.passwordInputinnerStyle}
               onChangeText={(text) => setPriceSealing(text)}
               value={priceSealing}
                   />
              </View>
              </>
               {route?.params?.title !=="MapClient"?
            <View style={styles.headerView}>
              <Text style={styles.headerText}>
                Film and labour total
              </Text>
              <Text style={styles.headerText1}>
              $0.00
              </Text>
               </View>:null
            }
               <TouchableOpacity onPress={()=>navigation.navigate('FilmRemoval')}>
               <View style={styles.headerView}>
               <Text style={styles.headerText}>
                 Film Removal
               </Text>
               <Icon
               name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                </View>
               </TouchableOpacity>
               <View style={styles.area}/>
               {route?.params?.title =="MapClient"?
               <View style={styles.headerView}>
               <Text style={styles.headerText}>
                 Notes
               </Text>
               <Icon
               name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                </View>:
               <View style={styles.headerView}>
              <Text style={styles.headerText}>
                Spare
              </Text>
              <CustomCheckBox isChecked={check1} onChange={()=>onChange1()}/>
               </View>
              }
            <View style={styles.area}/>
            {route?.params?.title !=="MapClient"?

            <View style={styles.headerView}>
              <Text style={styles.headerText}>
                Discount
              </Text>
              <View style={styles.subView}>
              <Text style={styles.headerText1}>
              $0.00
              </Text>
              <Icon
               name='right' type="antdesign" color={colors.primaryColor} style={styles.icon1} size={18}/>
              </View>
               </View>:null
            }
            <View style={styles.headerView}>
              <Text style={styles.headerText}>
                Extra costs
              </Text>
              <View style={styles.subView}>
              <Text style={styles.headerText1}>
              $0.00
              </Text>
              <Icon
               name='right' type="antdesign" color={colors.primaryColor} style={styles.icon1} size={18}/>
              </View>
               </View>
            <View style={styles.area}/>
            <View style={styles.headerView}>
              <Text style={styles.headerText}>
                GST (10%)
              </Text>
              <View style={styles.subView}>
              <Text style={styles.headerText1}>
              Natura
              </Text>
              <Icon
               name='right' type="antdesign" color={colors.primaryColor} style={styles.icon1} size={18}/>
              </View>
               </View>
            <View style={styles.headerView}>
              <Text style={styles.headerText}>
               Total
              </Text>
              <View style={styles.subView}>
              <Text style={styles.headerText1}>
              Natura 1.5
              </Text>
              <Icon
               name='right' type="antdesign" color={colors.primaryColor} style={styles.icon1} size={18}/>
              </View>
               </View>
               <View style={styles.area}/>
            <View style={styles.headerView}>
              <Text style={styles.headerText}>
               Attach energy savings
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
          </KeyboardAwareScrollView>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.lightGraay}}>
          <Button
          buttonStyle={[commonStyles.buttonStyle3 ,ongoing && styles.selectedbtn]}
          textStyle={[commonStyles.buttonTextStyle, ongoing && styles.selectedbtn,{fontWeight:'bold'}]}
          onPress={() => {
            setOngoing(true)
            // props.navigation.navigate('CreateQuote',{title:'MapClient'})
          }}
          text={"Create Deatiled Proposal"}
          />
          <Button
          buttonStyle={[commonStyles.buttonStyle3,!ongoing && styles.selectedbtn]}
          onPress={() => {setOngoing(false)
            props.navigation.navigate('NewQuote',{title:'Quote'})
          }}
          textStyle={[commonStyles.buttonTextStyle,!ongoing && styles.selectedbtn,{fontWeight:'bold'}]}
          text={"Quick Quote"}
          />
          </View>
          {/* <Footer leftOnPress={()=>navigation.navigate('SelectRoom')} left={"Select Rooms"} right={"Email Quotes"}/> */}
        </>
    )
}
export default CreateQuote;