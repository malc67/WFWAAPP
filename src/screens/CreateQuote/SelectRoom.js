import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./CreateQuote.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import Footer from "../../components/Footer";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField";
const SelectRoom = (props) => {
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [Enabled, setEnabled] = useState(false);

  const navigation =useNavigation()
    return (
        <>
          <Header backArrow={true} leftOnPress={()=>navigation.goBack()} left={"Quote"} center={"Select Rooms"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <TouchableOpacity onPress={toggleSwitch}>
              <View style={styles.headerView}>
              <Text style={styles.headerText4}>
                Office
              </Text>
             {isEnabled?
             <Icon
             name='check' type="entypo" color={colors.darkGray} size={25}/>
             :null}
               </View>
            </TouchableOpacity>
          <TouchableOpacity onPress={toggleSwitch1}>
              <View style={styles.headerView}>
              <Text style={styles.headerText4}>
                Spare
              </Text>
             {Enabled?
             <Icon
             name='check' type="entypo" color={colors.darkGray} size={25}/>
             :null}
               </View>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
          </View>
          <Footer/>
        </>
    )
}
export default SelectRoom;