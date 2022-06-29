/**
 * @format
 */

import { AppRegistry, LogBox, Text, TextInput } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App)
