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
const FilmRemoval = (props) => {
  const [priceSealing, setPriceSealing] = useState("")
  const [width, setWidth] = useState("")
  const [drop, setDrop] = useState("")
  const [quantity, setQuantity] = useState("")
  const navigation =useNavigation()
  const route=useRoute()

    return (
        <>
          <Header backArrow leftOnPress={()=>navigation.goBack()} left={"Quote"} center={"Price Removal"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.area}/>
          <View style={styles.headerView}>
              <View style={{flexDirection:'row'}}>
             <Text style={styles.headerText}>
              Width
             </Text>
               </View>
               <InputField
               placeholder={"required"}
               placeholderTextColor={colors.greyTypeColor}
               containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
               inputStyle={commonStyles.passwordInputinnerStyle}
               onChangeText={(text) => setWidth(text)}
               value={width}
                   />
              </View>
          <View style={styles.headerView}>
              <View style={{flexDirection:'row'}}>
             <Text style={styles.headerText}>
              Drop
             </Text>
               </View>
               <InputField
               placeholder={"required"}
               placeholderTextColor={colors.greyTypeColor}
               containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
               inputStyle={commonStyles.passwordInputinnerStyle}
               onChangeText={(text) => setDrop(text)}
               value={drop}
                   />
              </View>
          <View style={styles.headerView}>
              <View style={{flexDirection:'row'}}>
             <Text style={styles.headerText}>
              Quantity
             </Text>
               </View>
               <InputField
               placeholder={"required"}
               placeholderTextColor={colors.greyTypeColor}
               containerStyle={[commonStyles.inputContainerStyle,{width:'40%',height:30,borderColor:colors.whiteColor}]}
               inputStyle={commonStyles.passwordInputinnerStyle}
               onChangeText={(text) => setQuantity(text)}
               value={quantity}
                   />
              </View>
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
               onChangeText={(text) => setPriceSealing(text)}
               value={priceSealing}
                   />
              </View>
          </KeyboardAwareScrollView>
          </View>
        </>
    )
}
export default FilmRemoval;