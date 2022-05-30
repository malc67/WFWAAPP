import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList , TextInput} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Notes.style";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import Footer1 from "../../components/Footer1";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Icon } from "@rneui/base";
import Header1 from "../../components/MainHeader";

const Notes = (props) => {
  const [data, setData] = useState([
    { lat: -25.274398, lng: 133.775136, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 1 },
    { lat: -33.865143, lng: 151.209900, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 2 },
    { lat: -35.473469, lng: 149.012375, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 3 },
    { lat: -36.473469, lng: 148.012375, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 4 },
  ])
  const navigation = useNavigation()
  return (
    <>
      <Header
        right={`Done`}
        backArrow
        left={`Room`}
        center={`Notes`}
        leftOnPress={() => navigation.goBack()}
      />
      {/* <Footer1/> */}
      <View style={styles.mainView}>
        <TextInput 
        style={{
          borderWidth: 0.5,
          height: 200,
          borderRadius: 20,
          margin: 10,
          paddingTop: 20,
          padding: 20,
          
        }}
        placeholderTextColor={`#646568`}
        placeholder={`Enter notes`}
        multiline
        />
      </View>
    </>
  )
}
export default Notes;