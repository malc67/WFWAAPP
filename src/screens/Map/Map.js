import React, { useEffect, useState } from "react";
import { View ,Text,Image, TouchableOpacity, FlatList} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Map.style";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import Footer1 from "../../components/Footer1";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Icon } from "@rneui/base";
import Header1 from "../../components/MainHeader";

const Map = (props) => {
  const [data,setData]=useState([
    {lat:-25.274398,lng:133.775136,title:'Dev buttor warranty',description:'6, Forest Green Field',id:1},
    {lat:-33.865143,lng:151.209900,title:'Dev buttor warranty',description:'6, Forest Green Field',id:2},
    {lat:-35.473469,lng:149.012375,title:'Dev buttor warranty',description:'6, Forest Green Field',id:3},
    {lat:-36.473469,lng:148.012375,title:'Dev buttor warranty',description:'6, Forest Green Field',id:4},
  ])
  const navigation =useNavigation()
    return (
        <>
        <Header1 left="Near By Clients"/>
          <Footer1/>
          <View style={styles.mainView}>
          <View style={{flex:1}}>
          <MapView
            style={styles.map}
          loadingEnabled={true}
          initialRegion={{
            latitude: -25.274398,
            longitude: 133.775136,
            latitudeDelta: 30,
            longitudeDelta: 50,
            }}
            provider={PROVIDER_GOOGLE}
            >
              <FlatList
                data={data}
                keyExtractor={item =>item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                style={{ width: "100%" }}
                renderItem={({ item, index }) => {
                  return (
                    <Marker coordinate={{ latitude: item.lat, longitude: item.lng }}>
                      <Callout onPress={()=>navigation.navigate('MapClient')}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <View>
                            <Text style={styles.text1}>{item.title}</Text>
                            <Text style={styles.text2}>{item.description}</Text>
                          </View>
                          <TouchableOpacity>
                            <Icon
                            name="exclamationcircleo"
                            type="antdesign"
                            size={20}/>
                          </TouchableOpacity>
                        </View>
                      </Callout>
                    </Marker>
                  )}}/>
              </MapView>
          </View>
          </View>
        </>
    )
}
export default Map;