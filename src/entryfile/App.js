import React from "react";
import { View, StatusBar, LogBox, Text, TouchableOpacity , SafeAreaView } from "react-native";
import { styles } from "./App.style";
import { strings } from "../localization/i18n";
// import Preference from "react-native-preference";
// import RNRestart from "react-native-restart";
import Routing from "../navigations/Routing.stack";
import { persistor, store } from "../Store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// import configureStore from '../store/index';

// const store = configureStore()

const App = () => {
    LogBox.ignoreAllLogs();
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.mainView}>
            {/* <StatusBar
                translucent={true}
                hidden={true}
            /> */}
            {/* <Text>{strings("loginScreen.Hi")}</Text>

            <TouchableOpacity onPress={() => {
                if (Preference.get("language") == "en") {
                    Preference.set("language", "sp")
                    RNRestart.Restart()
                } else if (Preference.get("language") == "sp") {
                    Preference.set("language", "en")
                    RNRestart.Restart()
                }

            }}>
                <Text>{"change language"}</Text>
            </TouchableOpacity> */}
            <Routing />
        </SafeAreaView>
        </PersistGate>
        </Provider>
    )
}
export default App;