// import I18n from "react-native-i18n";
import Preference from "react-native-preference";

import en from "./en.json";
import sp from "./sp.json";
export function strings(name, params = {}) {
    return name
}

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
// I18n.fallbacks = true

// I18n.translations = {
//     en,
//     sp
// }
// if (Preference.get("language") == undefined) {
//     I18n.locale = "en";
//     Preference.set("language", "en");
// }
// else {
//     I18n.locale = Preference.get("language");
// }