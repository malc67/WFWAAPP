import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import _ from "lodash";
import { images } from "../assets/images/index";
import { colors } from "../themes/colors";
import { Icon } from "@rneui/base";
const InputField = (props) => {
    const [hidePass, setHidePass] = useState(true);
    const [isFocused, setIsFocused] = useState(false)
    const handleInputFocus = () => setIsFocused(true)

    const handleInputBlur = () => setIsFocused(false)
    return (
        <View style={[props.containerStyle, { borderColor: isFocused ? colors.primaryColor : colors.lightGraay }]}>
            {!_.isNil(props.image) &&
                <View style={props.imageViewStyle}>
                    <Image style={props.imageStyle} source={props.image} />
                </View>
            }
            {!_.isNil(props.countryCode) &&
                <View style={props.textViewStyle}>
                    <Text style={props.countryCodeStyle}>{props.countryCode}</Text>
                </View>
            }
            {!_.isNil(props.sterick) &&
                <View style={props.sterickTextViewStyle}>
                    <Text style={props.sterickTextStyle}>{props.sterick}</Text>
                </View>
            }
            {!_.isNil(props.search) &&
                    <Icon name="search1" type="antdesign" style={{marginRight:10}} size={16} color={colors.primaryColor}/>
            }
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                style={props.inputStyle}
                onChangeText={props.onChangeText}
                value={props.value}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry ? hidePass ? true : false : false}
                editable={props.editable}
                maxLength={props.maxLength}
                autoComplete={props.autoComplete}
                onEndEditing={props.onEndEditing}
                onFocus={() => handleInputFocus()}
                onBlur={() => handleInputBlur()}
            />
            {!_.isNil(props.secureTextEntry) &&
                <TouchableOpacity style={{ height: "100%", width: "15%", alignItems: "flex-end", justifyContent: "center" }}
                    onPress={() => { setHidePass(!hidePass) }}>
                    <Image style={{ height: 8, width: 14, resizeMode: "cover"}} source={hidePass ? images.hidePasswordIcon : images.unhidePasswordIcon} />
                </TouchableOpacity>
            }
        </View>
    )
}
export default InputField;