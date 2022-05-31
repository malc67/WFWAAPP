import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import { colors } from "../themes/colors"
import { Icon } from "@rneui/base";
import { AntDesign } from 'react-native-vector-icons';


const QuoteItem = (props) => {
    return (
        <View style={styles.Head}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title1}>
                        {props.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title2}>
                            {props.subTitle}
                        </Text>
                        {props.righArrow ?
                            <Icon
                                name='infocirlceo' type="antdesign" color={colors.greyColor} size={17} />
                            :
                            <Icon
                                name='right' type="antdesign" color={colors.primaryColor} size={17} />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )

}
export default QuoteItem;
const styles = StyleSheet.create(
    {
        Head: {
            padding: 15,
        }, title1: {
            fontSize: 17,
            fontWeight: '500',
            color: colors.blackTextColor
        }, title2: {
            fontSize: 15,
            fontWeight: '500',
            color: colors.greyTypeColor,
            paddingRight: 5
        }
    }
)