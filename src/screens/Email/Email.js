import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch, TextInput, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Email.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
const Email = (props) => {
    const [sender,setSender]=useState('')
  const navigation = useNavigation()


    return (
        <>
          <Header backArrow leftOnPress={()=>navigation.goBack()} left={"Cancel"} center={"Email Quote"}/>
          <View style={styles.mainView}>
          {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false} > */}
            <View style={{height:20}}/>
            <View style={{marginHorizontal:20}}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>
                    Window Films WA Quote 12
                </Text>
            </View>
            <View style={styles.headerView1}>
                <Text style={styles.headerText1}>
                    To:
                </Text>
                <InputField
                placeholder={"example@domain.com"}
                placeholderTextColor={colors.placeholderColor}
                containerStyle={[commonStyles.inputContainerStyle2,{width:'95%'}]}
                inputStyle={commonStyles.passwordInputinnerStyle}
                onChangeText={(text) => setSender(text)}
                value={sender}
                />
            </View>
            <View style={styles.headerView1}>
                <Text style={styles.headerText1}>
                    Cc/Bcc:
                </Text>
                <InputField
                placeholder={"example@domain.com"}
                placeholderTextColor={colors.placeholderColor}
                containerStyle={[commonStyles.inputContainerStyle2,{width:'90%'}]}
                inputStyle={commonStyles.passwordInputinnerStyle}
                onChangeText={(text) => setSender(text)}
                value={sender}
                />
            </View>
            <View style={styles.headerView1}>
                <Text style={styles.headerText1}>
                    Subject:
                </Text>
                <InputField
                placeholder={"Window Films WA Quote 12"}
                placeholderTextColor={colors.placeholderColor}
                containerStyle={[commonStyles.inputContainerStyle2,{width:'90%'}]}
                inputStyle={commonStyles.passwordInputinnerStyle}
                onChangeText={(text) => setSender(text)}
                value={sender}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.textView}>
                <Text style={styles.headerText1}>
                Quotation No. 14

23 Apr 2022

Customer details:

Sorrento Surf Club West Coast Hwy, Sorrento

Christine

Site details:

West Coast Hwy, Sorrento Dear Sorrento Surf Club,

I have great pleasure in submitting the

following quotation and have attached the following documents:

Quotation 14 (contained within thisdocument)

Natura 28 Internal Window Film Brochure • Sample copy of the Manufacturer's Warranty Form (attached to original email)

Scope of Works:

Provide quotation to supply and install Natura

28 as described

Project Requirements & Benefits Reduce Solar Heat Gain (Heat)

Reduce Ultra Violet Radiation (Fading)

Reduce Clare

Provide Daytime Privacy

About your Glass and Frames:

Glass Type: New window /glass type

Frame Type: =new window/frame type Film-to-Glass Application (Recommendation): Natura 28 Internal Window Film is recommended by the manufacturer

About SolarZone Internal Window Films:

• Deliver high levels of protection from solar

heat, cut energy costs by reducing the need

for air-conditioning, boosting energy

efficiency

• Dual Reflective films are ideal for

commercial and residential energy-upgrade

glazing projects when the customer wants quick payback but wants a neutral Interior that preserves the view outside

High levels of heat rejection cuts energy costs by reducing consumption and peak

load Outstanding glare control for enhanced

comfort Warm neutral interior with low reflectivity

preserves ambiance and views 99+% UV block limits fading and damage

from the sun Bold appearance upgrades building exterior and maintains daytime privacy

Fade Reduction:
 Manufacturer's Note: This data is a guide enabling an estimate only of fade reduction, as there are many variables that cause fading, it would be impossible to give an exact figure, therefore, does not constitute a warranty.

Installation of your Window Film:

Will be supplied and installed in accordance

with manufacturer's installation instructions.

Window Films WA employees are licenced and

approved window film applicators.

We are currently booking ahead for between 7-10 working days (if you require immediate

installation, please contact me directly and I - will endeavour to accommodate your requirements).

Please let me know directly when you are ready to proceed and I will schedule ASAP.

Window Energy Rating System

Window films WA is an accredited WERS installer. Upon completion you will issued a certification of the WERS rating appropriate to the film being installed on your current Glazing specifications. Based on the Natura 28 you will achieve a WERS rating 15 % heating ***32% Cooling Rating.

Warranty Period & Registration:
 Natura 28 Internal Window Film carries a Lifetime Warranty for Residential applications and 12 Years Warranty for Commercial applications. The warranty period on the External Window film applications varies depending on the film used and other site variables. Please refer to the sample copy of the manufacturer's warranty form attached to confirm the warranty period relevant to this particular application.

The original warranty document will be sent to

you after installation for this types of glazing.

Apples for Apples Policy:

Window Films WA pride ourselves on giving
                </Text>
            </View>
            </ScrollView>
            </View>
          {/* </KeyboardAwareScrollView> */}
          </View>
          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.lightGraay,paddingBottom:20,paddingHorizontal:20}}>
                <Button
                   buttonStyle={[commonStyles.buttonStyle,{backgroundColor:colors.primaryColor} ]}
                   textStyle={[commonStyles.buttonTextStyle,{fontWeight:'bold',color:colors.whiteColor}]}
                   text={'SUBMIT'}
                   onPress={() => props.navigation.navigate("Landing")}
                   />
             </View>
        </>
    )
}
export default Email;