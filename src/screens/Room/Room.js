import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Room.style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import commonStyles from "../../themes/commonStyles";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import QuoteItem from "../../components/QuoteItem";
import InputField from "../../components/InputField";
import { Icon } from "@rneui/base";
import Button from "../../components/Button";
const Room = (props) => {
  const data=[
    {Title:'Name',subtitle:"Nutter",id:1},
    {Title:'Tint Films',subtitle:"Natura 15",id:2},
    {Title:'Notes',subtitle:"",id:4}
  ]
  const data2=[
    {Title:'Office',subtitle:"1 Window",id:1},
    {Title:'Spare',subtitle:"1 Window",id:2},
  ]
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);

  const navigation = useNavigation()
  const route=useRoute()
  const onPress=(i)=>{
    switch (i.Title) {
      case 'Name':
        navigation.navigate('NewQuote',{title:'Job'})
        break;
    
      case 'Tint Films':
        // navigation.navigate('TintFilms')
        break;
    
      default:
        console.log('false')
        break;
    }
  }

    return (
        <>
          <Header dellIcon backArrow leftOnPress={()=>navigation.goBack()} left={"Job"} center={"Room"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
            <View style={{height:20}}/>
               <FlatList
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
                    </View>
                    )
                  }}/>
                  <Text style={{...styles.QouteText,fontSize:20}}>Windows</Text>
                  <TouchableOpacity onPress={()=>navigation.navigate('Windows')}>
                    <View style={styles.headerView}>
                  <View style={styles.NewTextView}>
                   <Icon
                    name='circle-with-plus' style={{marginRight:10}} type="entypo" color={colors.primaryColor} size={25}/>
                    <Text style={{...styles.headerText,color:colors.blackTextColor,fontWeight:'500'}}>
                    Add a new window
                    </Text>
                  </View>
                  <Icon
                  name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                  </View>
                  </TouchableOpacity>
                  <FlatList
                  data={data2}
                  keyExtractor={item =>item.id}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                  style={{ width: "100%" }}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{marginHorizontal:20,borderRadius:5,marginBottom:2,backgroundColor:colors.whiteColor}}>
                      <QuoteItem title={item.Title}
                       subTitle={item.subtitle}/>
                      <View style={styles.line1}/>
                      </View>
                      )}}
                      />
            <View style={{height:20}}/>
              <TouchableOpacity >
               <View style={{...styles.headerView,paddingVertical:10}}>
                   <Text style={styles.title1}>
                Include in Quote and cut list
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
               </TouchableOpacity>
          </KeyboardAwareScrollView>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.lightGraay,paddingBottom:20,paddingHorizontal:20}}>
                <Button
                   buttonStyle={[commonStyles.buttonStyle,{backgroundColor:colors.primaryColor} ]}
                   textStyle={[commonStyles.buttonTextStyle,{fontWeight:'bold',color:colors.whiteColor}]}
                   text={'Create Room Quote'}
                   onPress={() => props.navigation.navigate("CreateQuote")}
                   />
             </View>
          {/* <Footer 
          leftOnPress={()=>navigation.navigate('CreateQuote')}
          left={"Create Room Quote"} 
          rightIcon /> */}
        </>
    )
}
export default Room;