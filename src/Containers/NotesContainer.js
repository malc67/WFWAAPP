import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const NotesContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [data, setData] = useState(route?.params?.notes)

  useEffect(() => {
    const { notes } = route?.params
    setData(notes)
  }, [route])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={route?.params?.title ? route?.params?.title : 'Notes'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    onUpdateNotes();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>{route?.params?.from}</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, route, data])
  )


  const onUpdateNotes = () => {
    route?.params?.onUpdateNotes(data);
    navigation.goBack()
  }


  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={[Layout.fill, styles.scrollview]}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />


          <TextInput
            onChangeText={(text) => setData(text)}
            multiline={true}
            value={data}
            style={[Layout.fullWidth, styles.inputContainer]} />


        </ScrollView>

      </View>

    </SafeAreaView>
  )
}

export default NotesContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  scrollview: {
    paddingHorizontal: Responsive.width(20),
  },
  textBack: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  inputContainer: {
    height: Responsive.height(160),
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: Responsive.height(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A7B0B5',
    borderWidth: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(14),
    borderRadius: Responsive.height(5),
    marginTop: Responsive.height(10),
    paddingHorizontal: Responsive.height(10),
  },
  actionWrapper: {
    paddingHorizontal: Responsive.width(60),
    paddingBottom: Responsive.height(10),
    position: 'absolute',
    bottom: 0
  },
  button: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  }

});
