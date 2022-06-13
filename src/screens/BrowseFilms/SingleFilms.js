import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./BrowseFilmsStyle";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import SingleFilmsItem from "../../components/SingleFilmsItem";
import { colors } from "../../themes/colors";
import Button from "../../components/Button";
import commonStyles from "../../themes/commonStyles";

const SingleFilms = (props) => {
  const [data, setData] = useState([
    { Title: 'Group', subtitle: '-', id: 1 },
    { Title: 'Sub-Group', subtitle: '-', id: 2 },
    { Title: 'Code', subtitle: '-', id: 4 },
    { Title: 'Type', subtitle: '-', id: 5 }
  ])
  const [data3, setData3] = useState([
    { Title: '24"wide', subtitle: '310 mm', id: 1 },
    { Title: '36"wide', subtitle: '510 mm', id: 2 },
    { Title: '62"wide', subtitle: '710 mm', id: 4 },
    { Title: '75"wide', subtitle: '910 mm', id: 5 }
  ])

  const [data2, setData2] = useState([
    { Title: 'Single Clear', name: 'checkmark-circle', iconType: 'ionicon', subtitle: '', id: 1 },
    { Title: 'Single Tinted', name: 'triangle', iconType: 'ionicon', subtitle: '', id: 2 },
    { Title: 'Single Tinted clear', name: 'triangle', iconType: 'ionicon', subtitle: 'RO5678Cv', id: 4 },
    { Title: 'Single lsminated clear', name: 'triangle', iconType: 'ionicon', subtitle: 'Interior', id: 5 },
    { Title: 'IGU Clear', name: 'triangle', iconType: 'ionicon', subtitle: '', id: 6 },
    { Title: 'IGU Tinted', name: 'triangle', iconType: 'ionicon', subtitle: '', id: 7 },
    { Title: 'IGU Tinted clear', name: 'triangle', iconType: 'ionicon', subtitle: 'RO5678Cv', id: 8 },
    { Title: 'IGU lsminated clear', name: 'triangle', iconType: 'ionicon', subtitle: 'Interior', id: 9 },
    { Title: 'IGU HP low-E', name: 'controller-stop', iconType: 'entypo', subtitle: 'Interior', id: 10 }
  ])
  const getIconCompatibilty = (type) => {
    switch (type) {
      case "C":
        return "checkmark-circle";
      case "CC":
        return "ellipse";
      case "T":
        return "triangle"
      default:
        return "close"
    }
  }

  const getColorIconCompatibilty = (type) => {
    switch (type) {
      case "C":
        return "#B25751";
      case "CC":
        return "#D5732E";
      case "T":
        return "#B12418"
      default:
        return "#000000"
    }
  }

  const getTextAlertCompatibiltyInfo = (nameFilm, type) => {
    switch (type) {
      case "C":
        return `${nameFilm} is compatible with this glass type.`;
      case "CC":
        return "Conditional Compatibility:\nFilm can be applied if VLT is lighter than 45% or if glass is fully tempered.";
      case "T":
        return "Tempered/Heat Strengthened:\nFilm can be applied only if the glass is tempered, and not annealed (for IGU requirement for both panels)."
      default:
        return "Incompatible"
    }
  }

  const route = useRoute()
  const navigation = useNavigation()
  const [ongoing, setOngoing] = useState(true)

  useEffect(() => {
    console.log('CCC', route?.params)
    setData([
      { Title: 'Group', subtitle: route?.params?.group || '-', id: 1 },
      { Title: 'Sub-Group', subtitle: route?.params?.subGroups || '-', id: 2 },
      { Title: 'Code', subtitle: route?.params?.code || '-', id: 4 },
      { Title: 'Type', subtitle: route?.params?.type || '-', id: 5 }
    ])
    let compatibilty = route?.params?.compatibilty
    let nameFilm = route?.params?.name
    setData2([
      { Title: 'Single clear', name: getIconCompatibilty(compatibilty[0]), color: getColorIconCompatibilty(compatibilty[0]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[0]), iconType: 'ionicon', subtitle: '', id: 1 },
      { Title: 'Single Tinted', name: getIconCompatibilty(compatibilty[1]), color: getColorIconCompatibilty(compatibilty[1]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[1]), iconType: 'ionicon', subtitle: '', id: 2 },
      { Title: 'Single Tinted clear', name: getIconCompatibilty(compatibilty[1]), color: getColorIconCompatibilty(compatibilty[1]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[1]), iconType: 'ionicon', subtitle: 'RO5678Cv', id: 4 },
      { Title: 'Single clear laminated', name: getIconCompatibilty(compatibilty[2]), color: getColorIconCompatibilty(compatibilty[2]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[2]), iconType: 'ionicon', subtitle: 'Interior', id: 5 },
      { Title: 'IGU Clear', name: getIconCompatibilty(compatibilty[3]), color: getColorIconCompatibilty(compatibilty[3]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[3]), iconType: 'ionicon', subtitle: '', id: 6 },
      { Title: 'IGU Tinted', name: getIconCompatibilty(compatibilty[4]), color: getColorIconCompatibilty(compatibilty[4]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[4]), iconType: 'ionicon', subtitle: '', id: 7 },
      // { Title: 'IGU Tinted clear', name: getIconCompatibilty(compatibilty[4]), iconType: 'ionicon', subtitle: 'RO5678Cv', id: 8 },
      { Title: 'IG Unit Low on # 3', name: getIconCompatibilty(compatibilty[5]), color: getColorIconCompatibilty(compatibilty[5]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[5]), iconType: 'ionicon', subtitle: 'Interior', id: 9 },
      { Title: 'IG Unit LowE on # 2', name: getIconCompatibilty(compatibilty[6]), color: getColorIconCompatibilty(compatibilty[6]), textAlert: getTextAlertCompatibiltyInfo(nameFilm, compatibilty[6]), iconType: 'ionicon', subtitle: 'Interior', id: 10 }
    ])

    let rolSize = route?.params?.rolSize
    let newRolSize = []
    rolSize.forEach((element, index) => {
      if (index == 0 && element === 'yes')
        newRolSize.push({ Title: '36"wide', subtitle: '915 mm', id: index })
      if (index == 1 && element === 'yes')
        newRolSize.push({ Title: '48"wide', subtitle: '1220 mm', id: index })
      if (index == 2 && element === 'yes')
        newRolSize.push({ Title: '60"wide', subtitle: '1520 mm', id: index })
      if (index == 3 && element === 'yes')
        newRolSize.push({ Title: '72"wide', subtitle: '1830 mm', id: index })
    });
    setData3(newRolSize)


  }, [route])
  return (
    <>
      <Header backArrow={true} rightOnPress={() =>
        navigation.navigate('DateSheet', route.params)
      } leftOnPress={() => navigation.goBack()} left={"Films"} right={"Datesheet"} center={route.params.title} />
      <View style={{ ...styles.mainView }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={{ marginTop: 15 }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              style={{ width: "100%" }}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ marginHorizontal: 20, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                    <SingleFilmsItem title={item.Title}
                      subtitle={item.subtitle} />
                  </View>
                )
              }} />
          </View>
          <Text style={styles.QouteText1}>GLASS COMPATIBILTY</Text>
          <FlatList
            data={data2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginHorizontal: 20, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <SingleFilmsItem
                    {...item}
                    title={item.Title}
                    iconVisible={true}
                    name={item.name}
                    type={item.iconType} />
                </View>
              )
            }}
          />
          <Text style={styles.QouteText1}>FULL ROLE SIZES</Text>
          <FlatList
            data={data3}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginHorizontal: 20, marginBottom: 2, backgroundColor: colors.whiteColor }}>
                  <SingleFilmsItem
                    title={item.Title}
                    subtitle={item.subtitle} />
                </View>
              )
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          buttonStyle={[commonStyles.buttonStyle1, ongoing && styles.selectedbtn]}
          textStyle={[commonStyles.buttonTextStyle, ongoing && styles.selectedbtn, { fontWeight: 'bold' }]}
          onPress={() => {
            setOngoing(true)
            props.navigation.navigate('CreateQuote')
          }}
          text={"Add to Order"}
        />
        <Button
          buttonStyle={[commonStyles.buttonStyle1, !ongoing && styles.selectedbtn,]}
          onPress={() => setOngoing(false)}
          textStyle={[commonStyles.buttonTextStyle, !ongoing && styles.selectedbtn, { fontWeight: 'bold' }]}
          text={"Current Order"}
        />
      </View>
    </>
  )
}
export default SingleFilms;