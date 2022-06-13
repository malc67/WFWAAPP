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
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
    { id: 1, data: "N" }
    , { id: 2, data: "E" },
    { id: 3, data: 'S' },
    { id: 4, data: 'W' },
  ])
  const [listOfItems1, setListOfItems1] = useState([
    { id: 1, data: "Light" }
    , { id: 2, data: "Dark" },
  ])
  const [isFocus, setIsFocus] = useState(false);
  const [frameType, setFrameType] = useState([
    { label: 'Timber', value: 'Timber' },
    { label: 'Aluminium', value: 'Aluminium' },
    { label: 'Steel', value: 'Steel' },
    { label: 'PVC', value: 'PVC' },
    { label: 'Colonial', value: 'Colonial' },
    { label: 'Federation', value: 'Federation' }
  ]);

  const [isFocusGlassType, setIsFocusGlassType] = useState(false);
  const [glassType, setGlassType] = useState([
    { label: 'Laminated', value: 'Laminated' },
    { label: 'Toughened', value: 'Toughened' },
    { label: 'Double Glazed', value: 'Double Glazed' },
    { label: 'Float', value: 'Float' },
    { label: 'Low-E', value: 'Low-E' },
  ]);

  const [isFocusGlassThickness, setIsFocusGlassThickness] = useState(false);
  const [glassThickness, setGlassThickness] = useState([
    { label: '3mm', value: '3mm' },
    { label: '4mm', value: '4mm' },
    { label: '5mm', value: '5mm' },
    { label: '6mm', value: '6mm' },
    { label: '6.38mm', value: '6.38mm' },
    { label: '8.38mm', value: '8.38mm' },
    { label: '10.12mm', value: '10.12mm' },
    { label: '10.38mm', value: '10.38mm' },
  ]);

  const [isFocusLadderType, setIsFocusLadderType] = useState(false);
  const [ladderType, setLadderType] = useState([
    { label: 'Extension', value: 'Extension' },
    { label: 'Scaffold', value: 'Scaffold' },
    { label: 'Platform 600mm', value: 'Platform 600mm' },
    { label: 'Platform 900mm', value: 'Platform 900mm' },
    { label: 'Platform 1200mm', value: 'Platform 1200mm' },
    { label: 'Platfrom 1500mm', value: 'Platfrom 1500mm' },
    { label: 'Platform 1800mm', value: 'Platform 1800mm' },
    { label: 'Platform 2100mm', value: 'Platform 2100mm' },
    { label: 'Platform 2400mm', value: 'Platform 2400mm' },
    { label: 'Step 300mm', value: 'Step 300mm' },
    { label: 'Step 600mm', value: 'Step 600mm' },
    { label: 'Step 900mm', value: 'Step 900mm' },
    { label: 'Step 1200mm', value: 'Step 1200mm' },
    { label: 'Step 1500mm', value: 'Step 1500mm' },
    { label: 'Step 1800mm', value: 'Step 1800mm' },
  ]);



  const [selectedId, setSelectedId] = useState(1);
  const [selectedId1, setSelectedId1] = useState(1);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const navigation = useNavigation()
  const route = useRoute()
  return (
    <>
      <Header rightIcon backArrow leftOnPress={() => navigation.goBack()} left={'Room'} center={route?.params?.roomTitle ?? ''} />
      <View style={styles.mainView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={{ height: 20 }} />
          <View style={styles.headerView}>
            <Text style={[styles.headerText5, { color: colors.redTextColor }]}>
              Width
            </Text>
            <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <View style={styles.headerView}>
            <Text style={[styles.headerText5, { color: colors.redTextColor }]}>
              Height
            </Text>
            <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
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
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
          </View>
          <View style={{ height: 20 }} />
          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Name
            </Text>
            <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setState(text)}
              value={state}
            />
          </View>
          <TouchableOpacity >
            <View style={styles.headerView}>
              <Text style={styles.headerText5}>
                Tint film
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.headerText}>
                  Otpitune
                </Text>
                <Icon
                  name='right' type="antdesign" color={colors.primaryColor} size={17} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.headerView}>
              <Text style={styles.headerText5}>
                Notes
              </Text>
              <Icon
                name='right' type="antdesign" color={colors.primaryColor} size={17} />
            </View>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
          <TouchableOpacity onPress={() => navigation.navigate('Picture')}>
            <View style={styles.headerView}>
              <Text style={styles.headerText5}>
                Add Pictures
              </Text>
              <Icon
                name='right' type="antdesign" color={colors.primaryColor} size={17} />
            </View>
          </TouchableOpacity>
          <View style={{ height: 20 }} />

          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Aspect
            </Text>
            <View style={{ marginLeft: 15, overflow: 'hidden', borderRadius: 10, borderColor: colors.darkGray, borderWidth: 0.5 }}>
              <FlatList
                data={listOfItems}
                horizontal={true}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const iconVisible = item.id === selectedId ? true : false
                  return (
                    <View style={styles.recomView}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedId(item.id)
                        }}
                      >
                        <View style={{ ...styles.view3, backgroundColor: iconVisible ? colors.darkGray : colors.whiteColor }}>
                          <Text style={{ color: iconVisible ? colors.whiteColor : colors.darkGray }}>
                            {item.data}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                }}
                extraData={selectedId} />
            </View>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Frame Type
            </Text>
            {/* <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setPhone(text)}
              value={phone}
            /> */}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={frameType}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={phone}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPhone(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />

          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Frame colour
            </Text>
            <View style={{ marginLeft: 15, overflow: 'hidden', borderRadius: 10, borderColor: colors.darkGray, borderWidth: 0.5 }}>
              <FlatList
                data={listOfItems1}
                horizontal={true}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const iconVisible = item.id === selectedId1 ? true : false
                  return (
                    <View style={styles.recomView}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedId1(item.id)
                        }}
                      >
                        <View style={{ ...styles.view3, backgroundColor: iconVisible ? colors.darkGray : colors.whiteColor }}>
                          <Text style={{ color: iconVisible ? colors.whiteColor : colors.darkGray }}>
                            {item.data}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                }}
                extraData={selectedId1} />
            </View>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Glass type
            </Text>
            {/* <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setAddress1(text)}
              value={address1}
            /> */}
            <Dropdown
              style={[styles.dropdown, isFocusGlassType && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={glassType}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={address1}
              onFocus={() => setIsFocusGlassType(true)}
              onBlur={() => setIsFocusGlassType(false)}
              onChange={item => {
                setAddress1(item.value);
                setIsFocusGlassType(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Glass thickness
            </Text>
            {/* <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setState1(text)}
              value={state1}
            /> */}
            <Dropdown
              style={[styles.dropdown, isFocusGlassThickness && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={glassThickness}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={state1}
              onFocus={() => setIsFocusGlassThickness(true)}
              onBlur={() => setIsFocusGlassThickness(false)}
              onChange={item => {
                setState1(item.value);
                setIsFocusGlassThickness(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
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
                trackColor={{ true: colors.primaryColor, false: colors.greyColor }}
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
                trackColor={{ true: colors.primaryColor, false: colors.greyColor }}
                onValueChange={toggleSwitch1}
                value={isEnabled1}
              />
            </View>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText5}>
              Ladder type
            </Text>
            {/* <InputField
              placeholderTextColor={colors.greyTypeColor}
              containerStyle={[commonStyles.inputContainerStyle, { width: '40%', height: 30, borderColor: colors.whiteColor }]}
              inputStyle={[commonStyles.passwordInputinnerStyle, { color: colors.blue }]}
              onChangeText={(text) => setLadder(text)}
              value={ladder}
            /> */}
            <Dropdown
              style={[styles.dropdown, isFocusLadderType && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={ladderType}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={ladder}
              onFocus={() => setIsFocusLadderType(true)}
              onBlur={() => setIsFocusLadderType(false)}
              onChange={item => {
                setLadder(item.value);
                setIsFocusLadderType(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
          <View style={{ height: 40 }} />
        </KeyboardAwareScrollView>
      </View>
      {/* <Footer rightIcon/> */}
    </>
  )
}
export default Windows;