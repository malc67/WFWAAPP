import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./TintFilms.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import Footer from "../../components/Footer";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField";
import SingleFilmsItem from "../../components/SingleFilmsItem";
const TintFilms = (props) => {
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [tints, setTints] = useState('');
  const [tintsFilms, setTintsFilms] = useState('');
  const data=[
    {Title:'Night Owl (4.0)',id:1},
    {Title:'Night Owl (6.0)',id:2},
    {Title:'Night Owl',id:4}
  ]
  const data2=[
    {Title:'Optitune 05',id:1},
    {Title:'Optitune 15',id:2},
    {Title:'Optitune 22',id:3},
    {Title:'Optitune 30',id:4},
    {Title:'Optitune 40',id:5},
  ]
  const data3=[
    {Title:'Cold Steel 05',id:1},
  ]

  const navigation =useNavigation()
    return (
        <>
          <Header rightIcon backArrow leftOnPress={()=>navigation.goBack()} left={"Job"} center={"Select Tint Films"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={{justifyContent:'center',alignItems:"center",backgroundColor:colors.greyColor}}>
            <InputField
              placeholder={"Search Tint films"}
              placeholderTextColor={colors.blackTextColor}
              containerStyle={[commonStyles.inputContainerStyle1]}
              inputStyle={commonStyles.passwordInputinnerStyle}
              onChangeText={(text) => setTintsFilms(text)}
              value={tintsFilms}
              />
            </View>
          <TouchableOpacity onPress={toggleSwitch}>
              <View style={styles.headerView}>
              <Text style={styles.headerText4}>
                None
              </Text>
             {isEnabled?
             <Icon
             name='check' type="entypo" color={colors.darkGray} size={25}/>
             :null}
               </View>
            </TouchableOpacity>
          <TouchableOpacity >
              <View style={styles.headerView}>
              <Text style={styles.headerText4}>
                Custom Tints
              </Text>
              <InputField
                placeholderTextColor={colors.greyTypeColor}
                containerStyle={[commonStyles.inputContainerStyle,{width:'50%',borderColor:colors.whiteColor}]}
                inputStyle={commonStyles.passwordInputinnerStyle}
                onChangeText={(text) => setTints(text)}
                value={tints}
                    />
               </View>
               <View style={styles.line}/>
            </TouchableOpacity>
            <FlatList
                  data={data}
                  keyExtractor={item =>item.id}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                  style={{ width: "100%" }}
                  renderItem={({ item, index }) => {
                    return (
                        <SingleFilmsItem
                        title={item.Title}
                        circleIcon/>
                      )}}
              />
              <View style={styles.headerView}>
                <Text style={styles.headerText}>
                  DUAL REFLECTIVE FILMS
                </Text>
              </View>
              <View style={styles.line1}/>
              <FlatList
                  data={data2}
                  keyExtractor={item =>item.id}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                  style={{ width: "100%" }}
                  renderItem={({ item, index }) => {
                    return (
                        <SingleFilmsItem
                        title={item.Title}
                        circleIcon/>
                      )}}
              />
              <View style={styles.headerView}>
                <Text style={styles.headerText}>
                  NEUTRAL FILMS
                </Text>
              </View>
              <View style={styles.line1}/>
              <FlatList
                  data={data3}
                  keyExtractor={item =>item.id}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                  style={{ width: "100%" }}
                  renderItem={({ item, index }) => {
                    return (
                        <SingleFilmsItem
                        title={item.Title}
                        circleIcon/>
                      )}}
              />
          </KeyboardAwareScrollView>
          </View>
          <Footer/>
        </>
    )
}
export default TintFilms;