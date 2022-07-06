import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Aspect, Colour, CustomDropdown } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import { Modalize } from 'react-native-modalize';


const FRAME_TYPE_ITEMS = [
  { label: 'Timber', value: 'Timber' },
  { label: 'Aluminium', value: 'Aluminium' },
  { label: 'Steel', value: 'Steel' },
  { label: 'PVC', value: 'PVC' },
  { label: 'Colonial', value: 'Colonial' },
  { label: 'Federation', value: 'Federation' }
]

const GLASS_TYPE_ITEMS = [
  { label: 'Float Clear', value: 'Float Clear' },
  { label: 'Clear Laminated', value: 'Clear Laminated' },
  { label: 'Toughned Clear', value: 'Toughned Clear' },
  { label: 'Tinted Float', value: 'Tinted Float' },
  { label: 'Tinted Laminated', value: 'Tinted Laminated' },
  { label: 'Double Glazed Clear', value: 'Double Glazed Clear' },
  { label: 'Double Glazed Tinted', value: 'Double Glazed Tinted' },
  { label: 'Double Glazed low-E', value: 'Double Glazed low-E' },
  { label: 'Double Glazed Tinted Low- E', value: 'Double Glazed Tinted Low- E' },
]
const GLASS_THICKNESS_ITEMS = [
  { label: '3mm', value: '3mm' },
  { label: '4mm', value: '4mm' },
  { label: '5mm', value: '5mm' },
  { label: '6mm', value: '6mm' },
  { label: '6.38mm', value: '6.38mm' },
  { label: '8.38mm', value: '8.38mm' },
  { label: '10.12mm', value: '10.12mm' },
  { label: '10.38mm', value: '10.38mm' },
]
const LADDER_TYPE_ITEMS = [
  { label: 'Extension', value: 'Extension' },
  { label: 'Scaffold', value: 'Scaffold' },
  { label: 'Platform 600mm', value: 'Platform 600mm' },
  { label: 'Platform 900mm', value: 'Platform 900mm' },
  { label: 'Platform 1200mm', value: 'Platform 1200mm' },
  { label: 'Platfrom 1500mm', value: 'Platfrom 1500mm' },
  { label: 'Platform 1800mm', value: 'Platform 1800mm' },
  { label: 'Platform 2100mm', value: 'Platform 2100mm' },
  { label: 'Platform 2400mm', value: 'Platform 2400mm' },
  { label: 'Step 300mm', value: 'Step 300mm' },
  { label: 'Step 600mm', value: 'Step 600mm' },
  { label: 'Step 900mm', value: 'Step 900mm' },
  { label: 'Step 1200mm', value: 'Step 1200mm' },
  { label: 'Step 1500mm', value: 'Step 1500mm' },
  { label: 'Step 1800mm', value: 'Step 1800mm' },
]


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const WindowContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [data, setData] = useState(route?.params?.item)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [name, setName] = useState('')
  const [tintFilm, setTintFilm] = useState('')
  const [notes, setNotes] = useState('')
  const [picture, setPicture] = useState('');

  const [aspect, setAspect] = useState('N')
  const [frameType, setFrameType] = useState('')
  const [frameColour, setFrameColour] = useState('Light')
  const [glassType, setGlassType] = useState('')
  const [glassThickness, setGlassThickness] = useState('')
  const [includeCorking, setIncludeCorking] = useState(false)
  const [filmRemovalRequired, setFilmRemovalRequired] = useState(true)
  const [ladderType, setLadderType] = useState('')

  const modalizeFrameTypeRef = useRef(null);
  const modalizeGlassTypeRef = useRef(null);
  const modalizeGlassThicknessRef = useRef(null);
  const modalizeLadderTypeRef = useRef(null);

  useEffect(() => {
    const { item } = route?.params
    setData(item)
    console.log('Data', item)
    if (item) {
      setWidth(item['width'])
      setHeight(item['height'])
      setQuantity(item['quantity'])
      setName(item['name'])
      setTintFilm(item['tintFilm'])
      setNotes(item['notes'])
      setAspect(item['aspect'])
      setFrameType(item['frameType'])
      setFrameColour(item['frameColour'])
      setGlassType(item['glassType'])
      setGlassThickness(item['glassThickness'])
      setIncludeCorking(item['includeCorking'])
      setFilmRemovalRequired(item['filmRemovalRequired'])
      setLadderType(item['ladderType'])
      setPicture(item['picture'] ? { uri: item['picture'] } : '')
    }
  }, [route])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={name ? name : 'Window'}
              type={'normal'}
              rightOption={
                data ? (
                  <TouchableOpacity onPress={() => {
                    Alert.alert(
                      "Are your sure?",
                      "Are you sure you want to remove this window?",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            route?.params?.onDeleteWindow(data)
                            navigation.goBack()
                          },
                        },
                        {
                          text: "No",
                        },
                      ]
                    );
                  }}>
                    <MaterialCommunityIcons name='delete' size={24} color={'#B2C249'} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity disabled>
                    <MaterialCommunityIcons style={{ opacity: 0 }} name='delete' size={24} color={'#B2C249'} />
                  </TouchableOpacity>
                )
              }
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    onCreateOrUpdateWindow()
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Room</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, data, width, height, quantity, name, tintFilm, notes, aspect, frameType, frameColour, glassType, glassThickness, includeCorking, filmRemovalRequired, ladderType, picture])
  )

  const onUpdateName = (width, height, quantity) => {
    setName(`${width}mm x ${height}mm x ${quantity}`)
  }

  const onUpdateTintFilm = (film) => {
    setTintFilm(film['name'])
  }

  const onUpdateNotes = (notes) => {
    setNotes(notes)
  }

  const onCreateOrUpdateWindow = () => {
    let dataUpdate = {
      width: width,
      height: height,
      quantity: quantity,
      name: name,
      tintFilm: tintFilm,
      notes: notes,
      aspect: aspect ?? '',
      frameType: frameType ?? '',
      frameColour: frameColour ?? '',
      glassType: glassType ?? '',
      glassThickness: glassThickness ?? '',
      includeCorking: includeCorking ?? '',
      filmRemovalRequired: filmRemovalRequired ?? '',
      ladderType: ladderType ?? '',
      picture: picture
    }
    console.log('XXX->', dataUpdate)
    if (data) {
      if (width > 0 && height > 0 && quantity > 0) {
        route?.params?.onAddNewOrUpdateWindow(data['id'], dataUpdate)
      }
    } else {
      if (width > 0 && height > 0 && quantity > 0) {
        route?.params?.onAddNewOrUpdateWindow(undefined, dataUpdate)
      }
    }
    route?.params?.onUpdateListQuote()
  }

  const onUpdatePicture = (source) => {
    setPicture(source)
  }


  const getTextDisplayNotes = () => {
    if (notes && notes.length > 15) return `${notes.substring(0, 15)}...`
    return notes
  }

  const onOpenModalizeFrameTypeRef = () => {
    modalizeFrameTypeRef.current?.open();
  };
  const onOpenModalizeGlassTypeRef = () => {
    modalizeGlassTypeRef.current?.open();
  };
  const onOpenModalizeGlassThicknessRef = () => {
    modalizeGlassThicknessRef.current?.open();
  };
  const onOpenModalizeLadderTypeRef = () => {
    modalizeLadderTypeRef.current?.open();
  };

  console.log('window', data)
  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={Layout.fill}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ height: Responsive.height(20), width: '100%' }} />

            <View style={styles.item}>
              <Text style={[styles.title]}>Width</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'Required'}
                  value={width}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => {
                    setWidth(text)
                    onUpdateName(text, height, quantity)
                  }}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Height</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'Required'}
                  value={height}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => {
                    setHeight(text)
                    onUpdateName(width, text, quantity)
                  }}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Quantity</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'Required'}
                  value={quantity}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => {
                    setQuantity(text)
                    onUpdateName(width, height, text)
                  }}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={{ height: Responsive.height(20), width: '100%' }} />

            <View style={styles.item}>
              <Text style={[styles.title]}>Name</Text>
              <View style={[styles.inputContainer, { flex: 2 }]}>
                <TextInput
                  style={styles.input}
                  placeholder={''}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectFilm', { from: 'Window', onUpdateTintFilm })}
              style={styles.item}>
              <Text style={styles.title}>Tint Film</Text>
              <Text style={styles.subValue}>{tintFilm}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Notes', { notes: notes, from: 'Window', onUpdateNotes })}
              style={styles.item}>
              <Text style={styles.title}>Notes</Text>
              <Text style={styles.subValue}>{getTextDisplayNotes()}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={{ height: Responsive.height(20), width: '100%' }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPicture', { picture, from: 'Window', onUpdatePicture })}
              style={styles.item}>
              <Text style={styles.title}>Add Picture</Text>
              <Text style={styles.subValue}>{''}</Text>
              <Image style={styles.imgPreview} source={picture} resizeMode={'contain'} />
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={{ height: Responsive.height(20), width: '100%' }} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Aspect</Text>
              <Aspect
                value={aspect}
                onValueChange={value => setAspect(value)} />
              <View style={{ width: Responsive.width(15) }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Frame Type</Text>
              <TouchableOpacity
                onPress={onOpenModalizeFrameTypeRef}
                style={styles.inputContainer}>
                <TextInput
                  pointerEvents="none"
                  style={[styles.input, { color: '#434A4F' }]}
                  value={frameType}
                  editable={false}
                  placeholderTextColor={'#606A70'} />
              </TouchableOpacity>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Frame Colour</Text>
              <Colour
                value={frameColour}
                onValueChange={value => {
                  setFrameColour(value)
                }} />
              <View style={{ width: Responsive.width(15) }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Glass Type</Text>
              <TouchableOpacity
                onPress={onOpenModalizeGlassTypeRef}
                style={styles.inputContainer}>
                <TextInput
                  pointerEvents="none"
                  style={[styles.input, { color: '#434A4F' }]}
                  value={glassType}
                  editable={false}
                  placeholderTextColor={'#606A70'} />
              </TouchableOpacity>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Glass Thickness</Text>
              <TouchableOpacity
                onPress={onOpenModalizeGlassThicknessRef}
                style={styles.inputContainer}>
                <TextInput
                  pointerEvents="none"
                  style={[styles.input, { color: '#434A4F' }]}
                  value={glassThickness}
                  editable={false}
                  placeholderTextColor={'#606A70'} />
              </TouchableOpacity>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Include Corking</Text>
              <Switch
                ios_backgroundColor={"#E0E0E0"}
                thumbColor={'#FFFFFF'}
                trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
                onValueChange={(value) => {
                  setIncludeCorking(value)
                }}
                value={includeCorking} />
              <View style={{ width: Responsive.width(15) }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Film Removal Required</Text>
              <Switch
                ios_backgroundColor={"#E0E0E0"}
                thumbColor={'#FFFFFF'}
                trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
                onValueChange={(value) => {
                  setFilmRemovalRequired(value)
                }}
                value={filmRemovalRequired} />
              <View style={{ width: Responsive.width(15) }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Ladder Type</Text>
              <TouchableOpacity
                onPress={onOpenModalizeLadderTypeRef}
                style={styles.inputContainer}>
                <TextInput
                  pointerEvents="none"
                  style={[styles.input, { color: '#434A4F' }]}
                  value={ladderType}
                  editable={false}
                  placeholderTextColor={'#606A70'} />
              </TouchableOpacity>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={{ height: Responsive.height(20), width: '100%' }} />
          </ScrollView>
          <Modalize
            ref={modalizeFrameTypeRef}
            handlePosition={'inside'}
            adjustToContentHeight={true}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={frameType}
              pickerData={FRAME_TYPE_ITEMS}
              onValueChange={value => setFrameType(value)}
            />
          </Modalize>
          <Modalize
            ref={modalizeGlassTypeRef}
            handlePosition={'inside'}
            adjustToContentHeight={true}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={glassType}
              pickerData={GLASS_TYPE_ITEMS}
              onValueChange={value => setGlassType(value)}
            />
          </Modalize>
          <Modalize
            ref={modalizeGlassThicknessRef}
            handlePosition={'inside'}
            adjustToContentHeight={true}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={glassThickness}
              pickerData={GLASS_THICKNESS_ITEMS}
              onValueChange={value => setGlassThickness(value)}
            />
          </Modalize>
          <Modalize
            ref={modalizeLadderTypeRef}
            handlePosition={'inside'}
            adjustToContentHeight={true}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={ladderType}
              pickerData={LADDER_TYPE_ITEMS}
              onValueChange={value => setLadderType(value)}
            />
          </Modalize>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default WindowContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  textSave: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(48),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  header: {
    fontSize: 14,
    fontFamily: 'NewJune',
    textTransform: 'uppercase',
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.width(15),
    paddingBottom: Responsive.height(10)
  },
  value: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subValue: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  separator: {
    height: Responsive.height(2)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },
  imgPreview: {
    marginRight: Responsive.width(10),
    height: Responsive.height(35),
    width: Responsive.height(45),
  },
  inputContainer: {
    borderColor: 'rgb(224, 224, 224)',
    height: Responsive.height(32),
    flex: 1,
    borderWidth: Responsive.height(1),
    borderRadius: Responsive.height(5)
  },
  input: {
    flex: 1,
    textAlign: 'right',
    color: '#B2C249',
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: Responsive.width(10)
  },
  pickerStyle: {
    backgroundColor: 'white',
    width: '100%',
    height: Responsive.height(220)
  }


});
