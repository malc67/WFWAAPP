import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, SectionList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Notes.style";
import QuoteItem from "../../components/QuoteItem";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import Footer1 from "../../components/Footer1";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Icon } from "@rneui/base";
import Header1 from "../../components/MainHeader";
import { colors } from "../../themes/colors";

const SelectFilms = (props) => {

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

  return (
    <>
      <Header
        // rightIcon
        backArrow
        rightIconColor={`#646568`}
        left={`Room`}
        center={`Films`}
        leftOnPress={() => navigation.goBack()}
      />
      <View style={styles.mainView}>
        <View style={{ flex: 1, width: '100%', backgroundColor: colors.whiteColor, }}>
          {listOfItems.length > 0 &&
            <SectionList
              ItemSeparatorComponent={({ item, index }) => {
                return (<FlatListItemSeparator />)
              }
              }
              sections={[
                {
                  title: 'Reflective Films Interior',
                  data: [
                    { name: "R Silver 20i", group: 'Reflective', subGroups: 'Silver', code: "R06922W", type: "Interior" },
                    { name: "R Silver 35i", group: 'Reflective', subGroups: 'Silver', code: "R06934W", type: "Interior" },
                    { name: "R Silver 50i", group: 'Reflective', subGroups: 'Silver', code: "R05850S", type: "Interior" },
                    { name: "Silver 20, Low-Ei", group: 'Reflective', subGroups: 'Silver', code: "R06922E", type: "Interior" }
                  ]
                },
                {
                  title: 'Neutral Films Interior',
                  data: [
                    { name: "NT PerLite 20i", group: 'Neautral', subGroups: 'Perlite ', code: "R070L6W", type: "Interior" },
                    { name: "NT PerLite 35i", group: 'Neautral', subGroups: 'Perlite ', code: "R070L5W", type: "Interior" },
                    { name: "NT PerLite 50i", group: 'Neautral', subGroups: 'Perlite ', code: "R070L5W", type: "Interior" },
                    { name: "NT PerLite 70i", group: 'Neautral', subGroups: 'Perlite ', code: "", type: "Interior" },
                    { name: "NT Natura 05i", group: 'Neautral', subGroups: 'Perlite ', code: "R058L7W", type: "Interior" },
                    { name: "NT Natura 15i", group: 'Neautral', subGroups: 'Perlite ', code: "R058L9W", type: "Interior" },
                    { name: "NT Natura 30i", group: 'Neautral', subGroups: 'Perlite ', code: "R069L8W", type: "Interior" }
                  ]
                },
                {
                  title: 'Dual Reflective Films Interior',
                  data: [
                    { name: "DR OptiTune 05i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R070R0W", type: "Interior" },
                    { name: "DR OptiTune 15i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R070R1W", type: "Interior" },
                    { name: "DR OptiTune 20i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069R2W", type: "Interior" },
                    { name: "DR OptiTune 30i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069R3W", type: "Interior" },
                    { name: "DR OptiTune 40i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069R4W", type: "Interior" },
                    { name: "DR OptiShade 15i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069O1W", type: "Interior" },
                    { name: "DR OptiShade 25i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069O2W", type: "Interior" },
                    { name: "DR OptiShade 35i", group: 'Dual Reflective', subGroups: 'Optitune ', code: "R069O3W", type: "Interior" }
                  ]
                },
                {
                  title: 'Spectrally Selective Films Interior',
                  data: [
                    { name: "e-Lite 45i", group: 'Spectral Selective', subGroups: 'E-lite ', code: "R081I4W", type: "Interior" },
                    { name: "e-Lite 70i", group: 'Spectral Selective', subGroups: 'E-lite ', code: "R081ISW", type: "Interior" }
                  ]
                },
                {
                  title: 'Specialty Films Decorative/Privacy',
                  data: [
                    { name: "Matte Translucent, 2 mil", group: 'Decorative', subGroups: 'Frost Matte', code: "R07311", type: "Interior" },
                    { name: "Black Out", group: '', subGroups: 'Black out', code: "R06930S", type: "Interior" },
                    { name: "White Out", group: '', subGroups: 'White Out', code: "R073WO", type: "Interior" },
                    { name: "UV Filter, 2 mil", group: '', subGroups: 'Uv Filter', code: "R069UVS", type: "Interior" }
                  ]
                },
                {
                  title: 'SolarZone Xtra Films Exterior',
                  data: [
                    { name: "Silver 20 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R07022X", type: "Exterior" },
                    { name: "Silver 35 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R07035X", type: "Exterior" },
                    { name: "PolyZone Silver 20 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R0705XP", type: "Exterior" },
                    { name: "Solar Bronze 20 Xtra", group: 'Reflective', subGroups: 'Silver', code: "R069B2X", type: "Exterior" },
                    { name: "DR Grey 10 x", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R070W0X", type: "Exterior" },
                    { name: "DR Grey 20 x", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R070W6X", type: "Exterior" },
                    { name: "DR Grey 35 x", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R070W5X", type: "Exterior" },
                    { name: "e-Lite 45 Xtra", group: 'Spectrally selective', subGroups: '', code: "R105I4X", type: "Exterior" },
                    { name: "e-Lite 70 Xtra", group: 'Spectrally selective', subGroups: '', code: "R105I7X", type: "Exterior" }
                  ]
                },
                {
                  title: 'XTRM SolarZone Films Exterior',
                  data: [
                    { name: "XTRM Silver 20", group: 'Dual Reflective', subGroups: 'Reflective', code: "R12219X", type: "Exterior" },
                    { name: "XTRM Silver 35", group: 'Dual Reflective', subGroups: 'Reflective', code: "R122W5X", type: "Exterior" },
                    { name: "XTRM SkyLite S20X", group: 'Dual Reflective', subGroups: 'Reflective', code: "R157X15", type: "Exterior" },
                    { name: "XTRM PolyZone SkyLite", group: 'Dual Reflective', subGroups: 'Reflective', code: "R157X5P", type: "Exterior" },
                    { name: "XTRM DR Grey 10", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R122W0X", type: "Exterior" },
                    { name: "XTRM Dr Grey 20", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R122W6X", type: "Exterior" },
                    { name: "XTRM DR Grey 35", group: 'Dual Reflective', subGroups: 'DR Grey', code: "R122W5X", type: "Exterior" }
                  ]
                },
                {
                  title: 'Safety & Security Films',
                  data: [
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
                  ]
                },
                {
                  title: 'Surface Protection',
                  data: [
                    { name: "AG Clear 4 mil ix", group: 'Surface Protection', subGroups: 'Clear', code: "R123G3X", type: "Universal" },
                    { name: "AG Clear 6 mil ix", group: 'Surface Protection', subGroups: 'Clear', code: "R173G3X", type: "Universal" },
                    { name: "Clear 4 mil Poly X", group: 'Surface Protection', subGroups: 'Clear', code: "R1210XP", type: "External" },
                    { name: "Clear 6 mil Poly X", group: 'Surface Protection', subGroups: 'Clear', code: "R1731XP", type: "External" }
                  ]
                },
              ]}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => (
                <Text style={{ ...styles.QouteText1, fontSize: 15,marginLeft: 20 }}> {section.title}</Text>
              )}
              // renderSectionFooter={renderNoContent}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ marginHorizontal: 20, borderRadius: 5, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                    <QuoteItem
                      righArrow
                      title={item.name}
                      onPress={() => {
                        console.log(`i mhere`);
                        // navigation.navigate('SingleFilms', item)
                      }
                      }
                    />
                  </View>
                )
              }}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              extraData={{ list: listOfItems }}
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
      </View>
    </>
  )
}
export default SelectFilms;