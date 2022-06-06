import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, SectionList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./BrowseFilmsStyle";
import Footer from "../../components/Footer";
import commonStyles from "../../themes/commonStyles";
import { colors } from "../../themes/colors";
import { useNavigation } from "@react-navigation/native";
import QuoteItem from "../../components/QuoteItem";
import InputField from "../../components/InputField";
import Header1 from "../../components/MainHeader";
import { useSelector } from "react-redux";

const BrowseFilms = (props) => {
  const [name, setName] = useState("")
  const navigation = useNavigation()
  const [listOfItems, setListOfItems] = useState([[
    { name: "R Silver 20i" },
    { name: "R Silver 35i" },
    { name: "R Silver 50i" },
    { name: "Silver 20, Low-Ei" },
    { name: "NT PerLite 20i" },
    { name: "NT PerLite 35i" },
    { name: "NT PerLite 50i" },
    { name: "NT PerLite 70i" },
    { name: "NT Natura 05i" },
    { name: "NT Natura 15i" },
    { name: "NT Natura 30i" },
    { name: "DR OptiTune 05i" },
    { name: "DR OptiTune 15i" },
    { name: "DR OptiTune 20i" },
    { name: "DR OptiTune 30i" },
    { name: "DR OptiTune 40i" },
    { name: "DR OptiShade 15i" },
    { name: "DR OptiShade 25i" },
    { name: "DR OptiShade 35i" },
    { name: "e-Lite 45i" },
    { name: "e-Lite 70i" },
    { name: "Matte Translucent, 2 mil" },
    { name: "Black Out" },
    { name: "White Out" },
    { name: "UV Filter, 2 mil" },
    { name: "Silver 20 Xtra" },
    { name: "Silver 35 Xtra" },
    { name: "PolyZone Silver 20 Xtra" },
    { name: "Solar Bronze 20 Xtra" },
    { name: "DR Grey 10 x" },
    { name: "DR Grey 20 x" },
    { name: "DR Grey 35 x" },
    { name: "e-Lite 45 Xtra" },
    { name: "e-Lite 70 Xtra" },
    { name: "XTRM Silver 20" },
    { name: "XTRM Silver 35" },
    { name: "XTRM SkyLite S20X" },
    { name: "XTRM PolyZone SkyLite" },
    { name: "XTRM DR Grey 10" },
    { name: "XTRM Dr Grey 20" },
    { name: "XTRM DR Grey 35" },
    { name: "SF Clear 4 mil i" },
    { name: "SF Clear 7 mil i" },
    { name: "SF Clear 8 mil i" },
    { name: "SF Clear 12 mil i" },
    { name: "SF Clear 15 mil i" },
    { name: "R Silver 20 4 mil" },
    { name: "NT PerLite Ceramic 35 6 mil" },
    { name: "NT PerLite Ceramic 35 10 mil" },
    { name: "SF Matte 5 mil i" },
    { name: "SF Matte 12 mil i" },
    { name: "SP elite 70 8 mil" },
    { name: "AG Clear 4 mil ix" },
    { name: "AG Clear 6 mil ix" },
    { name: "Clear 4 mil Poly X" },
    { name: "Clear 6 mil Poly X" }
  ]])

  const [reflectiveList, setReflectiveList] = useState([
    { name: "R Silver 20i", group: 'Reflective', subGroups: 'Silver', code: "R06922W", type: "Interior" },
    { name: "R Silver 35i", group: 'Reflective', subGroups: 'Silver', code: "R06934W", type: "Interior" },
    { name: "R Silver 50i", group: 'Reflective', subGroups: 'Silver', code: "R05850S", type: "Interior" },
    { name: "Silver 20, Low-Ei", group: 'Reflective', subGroups: 'Silver', code: "R06922E", type: "Interior" }
  ])
  const [neutralList, setNeutralList] = useState([
    { name: "NT PerLite 20i", group: 'Neautral', subGroups: 'Perlite ', code: "R070L6W", type: "Interior" },
    { name: "NT PerLite 35i", group: 'Neautral', subGroups: 'Perlite ', code: "R070L5W", type: "Interior" },
    { name: "NT PerLite 50i", group: 'Neautral', subGroups: 'Perlite ', code: "R070L5W", type: "Interior" },
    { name: "NT PerLite 70i", group: 'Neautral', subGroups: 'Perlite ', code: "", type: "Interior" },
    { name: "NT Natura 05i", group: 'Neautral', subGroups: 'Perlite ', code: "R058L7W", type: "Interior" },
    { name: "NT Natura 15i", group: 'Neautral', subGroups: 'Perlite ', code: "R058L9W", type: "Interior" },
    { name: "NT Natura 30i", group: 'Neautral', subGroups: 'Perlite ', code: "R069L8W", type: "Interior" }
  ])
  const [dualList, setDualList] = useState([
    { name: "DR OptiTune 05i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R070R0W", type: "Interior" },
    { name: "DR OptiTune 15i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R070R1W", type: "Interior" },
    { name: "DR OptiTune 20i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069R2W", type: "Interior" },
    { name: "DR OptiTune 30i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069R3W", type: "Interior" },
    { name: "DR OptiTune 40i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069R4W", type: "Interior" },
    { name: "DR OptiShade 15i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069O1W", type: "Interior" },
    { name: "DR OptiShade 25i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069O2W", type: "Interior" },
    { name: "DR OptiShade 35i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069O3W", type: "Interior" }
  ])
  const [spectrallyList, setSpectrallyList] = useState([
    { name: "e-Lite 45i", group: 'Spectral Selective', subGroups: 'E-lite ', code: "R081I4W", type: "Interior" },
    { name: "e-Lite 70i", group: 'Spectral Selective', subGroups: 'E-lite ', code: "R081ISW", type: "Interior" }
  ])
  const [specialtyList, setSpecialtyList] = useState([
    { name: "Matte Translucent, 2 mil", group: 'Decorative', subGroups: 'Frost Matte', code: "R07311", type: "Interior" },
    { name: "Black Out", group: '', subGroups: 'Black out', code: "R06930S", type: "Interior" },
    { name: "White Out", group: '', subGroups: 'White Out', code: "R073WO", type: "Interior" },
    { name: "UV Filter, 2 mil", group: '', subGroups: 'Uv Filter', code: "R069UVS", type: "Interior" }
  ])
  const [solarZoneList, setSolarZoneList] = useState([
    { name: "Silver 20 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R07022X", type: "Exterior" },
    { name: "Silver 35 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R07035X", type: "Exterior" },
    { name: "PolyZone Silver 20 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R0705XP", type: "Exterior" },
    { name: "Solar Bronze 20 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R069B2X", type: "Exterior" },
    { name: "DR Grey 10 x", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R070W0X", type: "Exterior" },
    { name: "DR Grey 20 x", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R070W6X", type: "Exterior" },
    { name: "DR Grey 35 x", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R070W5X", type: "Exterior" },
    { name: "e-Lite 45 Xtra", group: 'Spectrally selective', subGroups: '', code: "R105I4X", type: "Exterior" },
    { name: "e-Lite 70 Xtra", group: 'Spectrally selective', subGroups: '', code: "R105I7X", type: "Exterior" }
  ])
  const [XTRMList, setXTRMList] = useState([
    { name: "XTRM Silver 20", group: 'Dual Reflective', subGroups: 'Reflective', code: "R12219X", type: "Exterior" },
    { name: "XTRM Silver 35", group: 'Dual Reflective', subGroups: 'Reflective', code: "R122W5X", type: "Exterior" },
    { name: "XTRM SkyLite S20X", group: 'Dual Reflective', subGroups: 'Reflective', code: "R157X15", type: "Exterior" },
    { name: "XTRM PolyZone SkyLite", group: 'Dual Reflective', subGroups: 'Reflective', code: "R157X5P", type: "Exterior" },
    { name: "XTRM DR Grey 10", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R122W0X", type: "Exterior" },
    { name: "XTRM Dr Grey 20", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R122W6X", type: "Exterior" },
    { name: "XTRM DR Grey 35", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R122W5X", type: "Exterior" }
  ])
  const [safetyList, setSafetyList] = useState([
    { name: "SF Clear 4 mil i", group: 'Safety  & Security', subGroups: 'Clear', code: "R12306T", type: "Internal" },
    { name: "SF Clear 7 mil i", group: 'Safety  & Security', subGroups: 'Clear', code: "R19801T", type: "Internal" },
    { name: "SF Clear 8 mil i", group: 'Safety  & Security', subGroups: 'Clear', code: "R22301T", type: "Internal" },
    { name: "SF Clear 12 mil i", group: 'Safety  & Security', subGroups: 'Clear', code: "R32303T", type: "Internal" },
    { name: "SF Clear 15 mil i", group: 'Safety  & Security', subGroups: 'Clear', code: "R39803T", type: "Internal" },
    { name: "R Silver 20 4 mil", group: 'Safety  & Security', subGroups: 'Reflective', code: "R12122T", type: "Internal" },
    { name: "NT PerLite Ceramic 35 6 mil", group: 'Safety  & Security', subGroups: 'Neutral', code: "R170L5T", type: "Internal" },
    { name: "NT PerLite Ceramic 35 10 mil", group: 'Safety  & Security', subGroups: 'Neutral', code: "R270L5T", type: "Internal" },
    { name: "SF Matte 5 mil i", group: 'Safety  & Security', subGroups: 'Neutral', code: "R14811", type: "Internal" },
    { name: "SF Matte 12 mil i", group: '', subGroups: '', code: "R32311C", type: "" }
  ])
  const [surfaceList, setSurfaceList] = useState([
    { name: "AG Clear 4 mil ix", group: 'Surface Protection', subGroups: 'Clear', code: "R123G3X", type: "Universal" },
    { name: "AG Clear 6 mil ix", group: 'Surface Protection', subGroups: 'Clear', code: "R173G3X", type: "Universal" },
    { name: "Clear 4 mil Poly X", group: 'Surface Protection', subGroups: 'Clear', code: "R1210XP", type: "External" },
    { name: "Clear 6 mil Poly X", group: 'Surface Protection', subGroups: 'Clear', code: "R1731XP", type: "External" }
  ])


  const searchMovie = (keyword) => {
    setReflectiveList(reflectiveList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setNeutralList(neutralList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setDualList(dualList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setSpectrallyList(spectrallyList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setSpecialtyList(specialtyList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setSolarZoneList(solarZoneList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setXTRMList(XTRMList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setSafetyList(safetyList.filter((item) => {
      return item.name.includes(keyword)
    }))
    setSurfaceList(surfaceList.filter((item) => {
      return item.name.includes(keyword)
    }))

  }

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#E5E5E5",
          marginTop: 10,
          marginBottom: 9
        }}
      />
    );
  }
  const renderNoContent = ({ section }) => {
    if (section.data.length == 0) {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[commonStyles.bodyTextStyle, { color: colors.placeholderColor }]}>{section.title == "People who can send you verification request" ? "You have not allowed anyone to request you!" : "No iRhere user in your contact list!"}</Text>
        </View>
      )
    }
    return null
  }

  return (
    <View style={styles.mainView}>
      <Header1 left={"Window Films"} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
        <InputField
          placeholder={"Search films"}
          placeholderTextColor={colors.placeholderColor}
          containerStyle={[commonStyles.inputContainerStyle1, { width: "100%" }]}
          inputStyle={commonStyles.passwordInputinnerStyle}
          onSearch={() => searchMovie(name)}
          onChangeText={(text) => {
            setName(text)
            // if (text.length == 0) {
            //   setListOfItems([...filteredListOfItems])
            // }
            // else if (text.length > name.length) {
            //   let interestsDataTemp = listOfItems;
            //   interestsDataTemp = interestsDataTemp.filter((item) => (
            //     item?.name.toLowerCase().indexOf(text.toLowerCase()) == 0
            //   ))
            //   setListOfItems([...interestsDataTemp])

            // }
            // else if (name.length > text.length) {
            //   let interestsDataTemp = filteredListOfItems;
            //   interestsDataTemp = interestsDataTemp.filter((item) => (
            //     item?.name.toLowerCase().indexOf(text.toLowerCase()) == 0
            //   ))
            //   setListOfItems([...interestsDataTemp])
            // }
          }}
          value={name}
          search
        />
        <View style={{ flex: 1, width: '100%', backgroundColor: colors.whiteColor }}>
          {listOfItems.length > 0 &&
            <SectionList
              ItemSeparatorComponent={({ item, index }) => {
                return (<FlatListItemSeparator />)
              }
              }
              sections={[
                {
                  title: 'Reflective Films Interior',
                  data: reflectiveList
                },
                {
                  title: 'Neutral Films Interior',
                  data: neutralList
                },
                {
                  title: 'Dual Reflective Films Interior',
                  data: dualList
                },
                {
                  title: 'Spectrally Selective Films Interior',
                  data: spectrallyList
                },
                {
                  title: 'Specialty Films Decorative/Privacy',
                  data: specialtyList
                },
                {
                  title: 'SolarZone Xtra Films Exterior',
                  data: solarZoneList
                },
                {
                  title: 'XTRM SolarZone Films Exterior',
                  data: XTRMList
                },
                {
                  title: 'Safety & Security Films',
                  data: safetyList
                },
                {
                  title: 'Surface Protection',
                  data: surfaceList
                },
              ]}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => (
                <Text style={{ ...styles.QouteText1, fontSize: 15 }}> {section.title}</Text>
              )}
              // renderSectionFooter={renderNoContent}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                    <QuoteItem title={item.name} onPress={() => navigation.navigate('SingleFilms', item)} />
                  </View>
                )
              }}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              // extraData={{ list: listOfItems }}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
            />
          }
          {
            (listOfItems.length == 0) &&
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "800" }}>{"No Window Films!"}</Text>
            </View>
          }
        </View>
        {/* <Text style={{ ...styles.QouteText1, fontSize: 15 }}>BROWSE TINT FILMS</Text>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <QuoteItem title={item.Title} onPress={() => navigation.navigate('SingleFilms', { title: item.Title })} />
                </View>
              )
            }} />
          <Text style={{ ...styles.QouteText1, fontSize: 15 }}>DUAL REFLECTIVE FILMS</Text>
          <FlatList
            data={data2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <QuoteItem title={item.Title} />
                </View>
              )
            }}
          />
          <Text style={{ ...styles.QouteText1, fontSize: 15 }}>DUAL REFLECTIVE FILMS</Text>
          <FlatList
            data={data2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <QuoteItem title={item.Title} />
                </View>
              )
            }}
          /> */}
      </KeyboardAwareScrollView>
    </View>
  )
}
export default BrowseFilms;