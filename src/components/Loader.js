import React from "react";
import PropTypes from 'prop-types'
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { colors } from "../themes/colors";
import Responsive from "react-native-lightweight-responsive";


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const Loader = ({ visible, containerStyle, text }) => {
    if (visible) {
        return (
            <View style={[styles.container, containerStyle]}>
                {text ?
                    <View style={styles.containerWrapper}>
                        <ActivityIndicator size={"large"} color={'#B2C249'} />
                        <Text style={styles.textStyle}>{text}</Text>
                    </View>
                    :
                    <ActivityIndicator size={"large"} color={'#B2C249'} />
                }
            </View>
        )
    }
    else {
        return null;
    }
}

Loader.propTypes = {
    visible: PropTypes.bool,
    containerStyle: PropTypes.object,
    text: PropTypes.string,
}

Loader.defaultProps = {
    visible: false,
    containerStyle: {},
    text: ''
}

export default Loader

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "#80808066",
        alignItems: "center",
        justifyContent: "center"
    },
    containerWrapper: {
        backgroundColor: '#FFFFFF',
        width: 200,
        height: 200,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5
    },
    textStyle: {
        color: '#B2C249',
        fontFamily: 'NewJune',
        fontSize: Responsive.font(15),
        textAlign: "center"
    }

});