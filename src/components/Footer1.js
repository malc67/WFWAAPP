import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {  Text, View, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import { colors } from "../themes/colors"
const Footer1 = (props) => {
    const [listOfItems, setListOfItems] = useState([
        { id:1,data: "All Quotes" }
        ,{ id:2,data: "Pending Quotes"},
        { id:3,data: 'Sent Quotes' },
    ])
        const [selectedId, setSelectedId] = useState(1);
        const route=useRoute()
        useEffect(()=>console.log('rouetet==>>>>',route),[])
    return (
        <View style={styles.Head}> 
        <View style={{borderRadius:15,backgroundColor:colors.lightGraay,elevation:5}}>
       <FlatList
            data={listOfItems}
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const iconVisible = item.id === selectedId ? true : false
                return(
                    <View style={styles.recomView}>
            <TouchableWithoutFeedback
            onPress={()=>{
                setSelectedId(item.id)
                if(props.onChangeTab){
                    props.onChangeTab(item.id)
                }
            }}
            >
        <View style={{...styles.view3,backgroundColor:iconVisible?route.name=='Quotes'?colors.whiteColor:colors.primaryColor:colors.lightGraay,elevation:iconVisible?10:0}}>
          <Text style={{color:iconVisible?colors.darkGray:colors.darkGray,fontSize:14,fontWeight:'500'}}>
                {item.data}
            </Text>
         </View>
       </TouchableWithoutFeedback>
       </View>
            )}}
            extraData={selectedId}/>
            </View>
        </View>
    )

}
export default Footer1;
const styles = StyleSheet.create(
    {
        Head: {
            backgroundColor: colors.whiteColor,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row',
            padding:10,
        },textHead:{
            fontSize:16,
            fontWeight:'400',
            color:colors.whiteColor
        },view3:{
            borderColor:colors.whiteColor,
            borderWidth:0.5,
            padding:8,
            flexDirection:'row',
            borderRadius:10,
            }, 
            recomView:{
            justifyContent:'space-around',
            }
    }
)