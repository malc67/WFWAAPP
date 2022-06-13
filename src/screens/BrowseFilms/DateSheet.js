import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./BrowseFilmsStyle";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import Pdf from "react-native-pdf";
const DateSheet = (props) => {
  const route = useRoute()
  const navigation = useNavigation()
  const [source, setSource] = useState({ uri: '', cache: true })
  useEffect(() => {
    console.log('CCC', route?.params)
    const { dataSheet } = route?.params
    setSource({ uri: dataSheet, cache: true })
  }, [route])
  return (
    <>
      <Header
        right2Icon={true}
        backArrow={true}
        leftOnPress={() => navigation.goBack()}
        left={"Details"} center={route.params.title} />
      <View style={styles.mainView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View>
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              trustAllCerts={false}
              style={styles.pdf} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  )
}
export default DateSheet;