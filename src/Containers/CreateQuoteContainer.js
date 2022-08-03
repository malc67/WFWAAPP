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
  Switch,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth, useQuote, useTheme, useWindow } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import _, { findLast, isEmpty, isUndefined } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import email from 'react-native-email'
import Mailer from 'react-native-mail';
import moment from 'moment'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import ReactNativeBlobUtil from 'react-native-blob-util'


const DATA_FILM = [
  {
    name: "R Silver 20i",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R06922W",
    type: "Interior",
    compatibilty: ['C', 'C', 'C', 'C', 'CC', 'C', 'C'],
    savings: [Number(295, 10), Number(142, 78), 0, Number(165, 29), Number(82, 73), Number(132, 39), Number(`58,05`)],
    rolSize: ["yes", "no", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020i%20Datasheet.pdf?alt=media&token=0588dff2-c886-4fa3-bd60-c363e6abec0d'
  },
  {
    name: "R Silver 35i",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R06934W",
    type: "Interior",
    compatibilty: ['C', 'C', 'C', 'C', 'CC', 'C', 'C'],
    savings: [Number(225, 78), Number(111, 15), 0, Number(116, 57), Number(59, 63), Number(88, 31), Number(35, 83)],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2035i%20Datasheet.pdf?alt=media&token=caaa6d24-bbc1-4d0e-9c9f-5c40ee07e689'
  },
  {
    name: "R Silver 50i",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R05850S",
    type: "Interior",
    compatibilty: ['C', 'C', 'C', 'C', 'CC', 'C', 'C'],
    savings: [Number(148, 21), Number(71, 78), 0, Number(65, 67), Number(34, 90), Number(44, 81), Number(17, 18)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2050i%20Datasheet.pdf?alt=media&token=8ee8d631-d8a9-4a32-b101-f9ddd44cf8ac'
  },
  {
    name: "Silver 20, Low-Ei",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R06922E",
    type: "Interior",
    compatibilty: ['C', 'C', 'C', 'C', 'CC', 'C', 'C'],
    savings: [Number(305, 31), Number(169, 73), 0, Number(167, 57), Number(89, 89), Number(126, 70), Number(52, 76)],
    rolSize: ["no", "no", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020i%20Low%20E%20Datasheet.pdf?alt=media&token=211bd1e3-17ba-45c5-a2e1-9b8b253e9ac4'
  },
  {
    name: "NT PerLite 20i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R070L6W",
    type: "Interior",
    compatibilty: ['C', 'C', 'T', 'T', 'CC', 'T', 'T'],
    savings: [Number(226, 77), Number(`116,01`), 0, Number(100, 31), Number(52, 84), Number(66, 61), Number(25, 34)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2020i%20Datasheet.pdf?alt=media&token=45597ebf-07d5-489c-9600-17cb117b8ce6'
  },
  {
    name: "NT PerLite 35i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R070L5W",
    type: "Interior",
    compatibilty: ['C', 'C', 'C', 'C', 'C', 'T', 'C'],
    savings: [Number(`158,02`), Number(80, 13), 0, Number(58, 18), Number(31, 39), Number(32, 61), Number(11, 36)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2035i%20Datasheet.pdf?alt=media&token=86ac56a6-c95d-489f-895f-484c70c602ea'
  },
  {
    name: "NT PerLite 50i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R070L5W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(140, 16), Number(66, 13), 0, Number(56, 14), Number(30, 15), Number(`36,04`), Number(13, 61)],
    rolSize: ["yes", "no", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2050i%20Datasheet.pdf?alt=media&token=8ee8d631-d8a9-4a32-b101-f9ddd44cf8ac'
  },
  {
    name: "NT PerLite 70i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "no", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2070i%20Datasheet.pdf?alt=media&token=586074d7-67c5-41a9-9a0e-2f60bab414a6'
  },
  {
    name: "NT Natura 05i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R058L7W",
    type: "Interior",
    compatibilty: ["C", "T", "T", "T", "T", "T", "T"],
    savings: [Number(210, 69), Number(`103,03`), 0, Number(76, 37), Number(32, 96), Number(38, 53), Number(12, 31)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20Natura%2005i%20Datasheet.pdf?alt=media&token=4b575ffa-20e7-4296-a04f-e1ca69806102'
  },
  {
    name: "NT Natura 15i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R058L9W",
    type: "Interior",
    compatibilty: ["C", "T", "T", "T", "T", "T", "C"],
    savings: [Number(188, 74), Number(91, 58), 0, Number(65, 46), Number(31, 39), Number(35, 57), Number(11, 36)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20Natura%2015i%20Datasheet.pdf?alt=media&token=42fa0092-6bb1-4967-9aaf-990d0c73cf16'
  },
  {
    name: "NT Natura 30i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R069L8W",
    type: "Interior",
    compatibilty: ["C", "CC", "C", "C", "CC", "T", "C"],
    savings: [Number(144, 85), Number(68, 69), 0, Number(50, 91), Number(21, 97), Number(29, 64), Number(9, 47)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20Natura%2030i%20Datasheet.pdf?alt=media&token=7d4af4be-c32a-452c-9e57-e1126f8fa7a8'
  },
  {
    name: "DR OptiTune 05i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R070R0W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    savings: [Number(315, 44), Number(150, 56), 0, Number(173, 59), Number(86, 74), Number(137, 63), Number(60, 28)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiTune%2005i%20Datasheet.pdf?alt=media&token=5649ff14-3b6c-4f51-8023-35f86516b0c2'
  },
  {
    name: "DR OptiTune 15i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R070R1W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "C", "C"],
    savings: [Number(286, 18), Number(137, 31), 0, Number(154, 52), Number(77, 24), Number(121, 57), Number(51, 74)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiTune%2015i%20Datasheet.pdf?alt=media&token=dcb17ced-8ed6-4dab-8afe-da3551692758'
  },
  {
    name: "DR OptiTune 20i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R069R2W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    savings: [Number(221, 76), Number(`109,05`), 0, Number(101, 48), Number(52, 42), Number(70, 55), Number(27, 11)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiTune%2020i%20Datasheet.pdf?alt=media&token=7ef1bf0a-53cb-4dcb-a4bf-c8ca2e3bb35c'
  },
  {
    name: "DR OptiTune 30i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R069R3W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    savings: [Number(204, 43), Number(98, 60), 0, Number(97, 19), Number(49, 70), Number(69, 58), Number(27, 14)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiTune%2030i%20Datasheet.pdf?alt=media&token=254635f5-8bb1-4c57-9ca4-207e63da621a'
  },
  {
    name: "DR OptiTune 40i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R069R4W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "C", "T", "C"],
    savings: [Number(170, 36), Number(82, 17), 0, Number(70, 95), Number(36, 28), Number(48, 71), Number(`9,04`)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiTune%2040i%20Datasheet.pdf?alt=media&token=bbcaf10e-966a-4b46-a850-cbec087e7ad7'
  },
  {
    name: "DR OptiShade 15i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R069O1W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiShade%2015i%20Datasheet.pdf?alt=media&token=efac7ea7-08b9-4c0f-b884-2413747aeb7c'
  },
  {
    name: "DR OptiShade 25i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R069O2W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiShade%2025i%20Datasheet.pdf?alt=media&token=e1562e1d-a418-4efa-aa72-73b8883f3ea0'
  },
  {
    name: "DR OptiShade 35i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R069O3W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20OptiShade%2035i%20Datasheet.pdf?alt=media&token=2b41207a-8492-49aa-ac19-c8453ca5e168'
  },
  {
    name: "e-Lite 45i",
    group: 'Spectral Selective',
    subGroups: 'E-lite ',
    code: "R081I4W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "C", "T", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSP%20e-Lite%2045i%20Datasheet.pdf?alt=media&token=72a26ec3-6835-4d3a-a153-33b1ec33e61a'
  },
  {
    name: "e-Lite 70i",
    group: 'Spectral Selective',
    subGroups: 'E-lite ',
    code: "R081ISW",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(157, 57), Number(`80,05`), 0, Number(67, 36), Number(35, 49), Number(43, 91), Number(16, 85)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSP%20e-Lite%2070i%20Datasheet.pdf?alt=media&token=840f5f7f-4993-4e72-af7d-007c26568d63'
  },
  {
    name: "Matte Translucent, 2 mil",
    group: 'Decorative',
    subGroups: 'Frost Matte',
    code: "R07311",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDS%20UV%20Filter%20i.pdf?alt=media&token=7562b161-2041-412f-b144-a84a386bc4a8'
  },
  {
    name: "Black Out",
    group: '',
    subGroups: 'Black out',
    code: "R06930S",
    type: "Interior",
    compatibilty: ["T", "T", "T", "X", "X", "X", "X"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDS%20UV%20Filter%20i.pdf?alt=media&token=7562b161-2041-412f-b144-a84a386bc4a8'
  },
  {
    name: "White Out",
    group: '',
    subGroups: 'White Out',
    code: "R073WO",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "T"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDS%20UV%20Filter%20i.pdf?alt=media&token=7562b161-2041-412f-b144-a84a386bc4a8'
  },
  {
    name: "UV Filter, 2 mil",
    group: '',
    subGroups: 'Uv Filter',
    code: "R069UVS",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDS%20UV%20Filter%20i.pdf?alt=media&token=7562b161-2041-412f-b144-a84a386bc4a8'
  },
  {
    name: "Silver 20 Xtra",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R07022X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(`342,01`), Number(263, 92), 0, Number(302, 31), Number(210, 48), Number(276, 31), Number(168, 70)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020X%20Datasheet.pdf?alt=media&token=ccf8ec07-8930-49a2-b976-ea54e45a843a'
  },
  {
    name: "Silver 35 Xtra",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R07035X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(254, 94), Number(190, 44), 0, Number(229, 66), Number(157, 27), Number(210, 51), Number(`121,01`)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2035X%20Datasheet.pdf?alt=media&token=c0cf0d6a-1a73-4396-a385-e5105a4c6393'
  },
  {
    name: "PolyZone Silver 20 Xtra",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R0705XP",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020X%20Poly%20Datasheet.pdf?alt=media&token=5a2d12e6-702f-4895-8060-2aa722a49a5e'
  },
  {
    name: "Solar Bronze 20 Xtra",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R069B2X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(348, 29), Number(266, 38), 0, Number(307, 56), Number(213, 88), Number(285, 32), Number(173, 30)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2020%20XTRM%20Datasheet.pdf?alt=media&token=89f5eb3f-9dcb-4dd3-b7d2-6f8a8f43abfa'
  },
  {
    name: "DR Grey 10 x",
    group: 'Dual Reflective',
    subGroups: 'DR Grey',
    code: "R070W0X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(337, 93), Number(254, 15), 0, Number(305, 90), Number(208, 71), Number(287, 59), Number(173, 61)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2010%20XTRM%20Datasheet.pdf?alt=media&token=15c761c4-12f1-4c99-81a9-db9d03501465'
  },
  {
    name: "DR Grey 20 x",
    group: 'Dual Reflective',
    subGroups: 'DR Grey',
    code: "R070W6X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(`258,02`), Number(186, 58), 0, Number(246, 36), Number(163, 70), Number(232, 27), Number(141, 87)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2020%20XTRM%20Datasheet.pdf?alt=media&token=89f5eb3f-9dcb-4dd3-b7d2-6f8a8f43abfa'
  },
  {
    name: "DR Grey 35 x",
    group: 'Dual Reflective',
    subGroups: 'DR Grey',
    code: "R070W5X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "T"],
    savings: [Number(187, 42), Number(129, 64), 0, Number(185, 32), Number(118, 97), Number(176, 15), Number(99, 96)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2035%20XTRM%20Datasheet.pdf?alt=media&token=affd5377-0869-449f-bf63-e8f174edbea4'
  },
  {
    name: "e-Lite 45 Xtra",
    group: 'Spectrally selective',
    subGroups: '',
    code: "R105I4X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "T"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSP%20e-Lite%2045X%20Datasheet.pdf?alt=media&token=92789cd7-d7d0-471c-ba1f-2830049c44b0'
  },
  {
    name: "e-Lite 70 Xtra",
    group: 'Spectrally selective',
    subGroups: '',
    code: "R105I7X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSP%20e-Lite%2070X%20Datasheet.pdf?alt=media&token=c0484b10-6454-4c1b-84e3-eda02c0734b7'
  },
  {
    name: "XTRM Silver 20",
    group: 'Dual Reflective',
    subGroups: 'Reflective',
    code: "R12219X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020%20XTRM%20Datasheet.pdf?alt=media&token=1417dc29-1c6a-4e5e-8dae-3bca0a082eb1'
  },
  {
    name: "XTRM Silver 35",
    group: 'Dual Reflective',
    subGroups: 'Reflective',
    code: "R122W5X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2035%20XTRM%20Datasheet.pdf?alt=media&token=affd5377-0869-449f-bf63-e8f174edbea4'
  },
  {
    name: "XTRM SkyLite S20X",
    group: 'Dual Reflective',
    subGroups: 'Reflective',
    code: "R157X15",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20SkyLite%2020%20XTRM%20Datasheet.pdf?alt=media&token=4d788423-9226-4512-8add-a5934354c033'
  },
  {
    name: "XTRM PolyZone SkyLite",
    group: 'Dual Reflective',
    subGroups: 'Reflective',
    code: "R157X5P",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "no", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20SkyLite%2020%20XTRM%20Poly%20Datasheet.pdf?alt=media&token=4a7ce342-bcef-498c-b3cd-fc407dffac43'
  },
  {
    name: "XTRM DR Grey 10",
    group: 'Dual Reflective',
    subGroups: 'DR Grey',
    code: "R122W0X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2010%20XTRM%20Datasheet.pdf?alt=media&token=15c761c4-12f1-4c99-81a9-db9d03501465'
  },
  {
    name: "XTRM Dr Grey 20",
    group: 'Dual Reflective',
    subGroups: 'DR Grey',
    code: "R122W6X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2020%20XTRM%20Datasheet.pdf?alt=media&token=89f5eb3f-9dcb-4dd3-b7d2-6f8a8f43abfa'
  },
  {
    name: "XTRM DR Grey 35",
    group: 'Dual Reflective',
    subGroups: 'DR Grey',
    code: "R122W5X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "T"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FDR%20Grey%2035%20XTRM%20Datasheet.pdf?alt=media&token=affd5377-0869-449f-bf63-e8f174edbea4'
  },
  {
    name: "SF Clear 4 mil i",
    group: 'Safety  & Security',
    subGroups: 'Clear',
    code: "R12306T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Clear%204%20mil%20i%20datasheet.pdf?alt=media&token=08e17583-c24e-461b-be92-265438b166f5'
  },
  {
    name: "SF Clear 7 mil i",
    group: 'Safety  & Security',
    subGroups: 'Clear',
    code: "R19801T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Clear%207%20mil%20i%20datasheet.pdf?alt=media&token=92f06888-77c9-4135-bdf0-63acdde8d221'
  },
  {
    name: "SF Clear 8 mil i",
    group: 'Safety  & Security',
    subGroups: 'Clear',
    code: "R22301T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Clear%208%20mil%20i%20datasheet.pdf?alt=media&token=6631d3e8-df74-4b22-94d6-13526bca0b7a'
  },
  {
    name: "SF Clear 12 mil i",
    group: 'Safety  & Security',
    subGroups: 'Clear',
    code: "R32303T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Clear%2012%20mil%20i%20datasheet.pdf?alt=media&token=6be70281-ffab-44d0-8bc6-b996ee5d57f2'
  },
  {
    name: "SF Clear 15 mil i",
    group: 'Safety  & Security',
    subGroups: 'Clear',
    code: "R39803T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Clear%2012%20mil%20i%20datasheet.pdf?alt=media&token=6be70281-ffab-44d0-8bc6-b996ee5d57f2'
  },
  {
    name: "R Silver 20 4 mil",
    group: 'Safety  & Security',
    subGroups: 'Reflective',
    code: "R12122T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "CC", "C", "C"],
    rolSize: ["no", "yes", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020%204%20mil%20datasheet.pdf?alt=media&token=df53f190-a687-4193-8576-36d3b3f596d5'
  },
  {
    name: "NT PerLite Ceramic 35 6 mil",
    group: 'Safety  & Security',
    subGroups: 'Neutral',
    code: "R170L5T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "CC", "C", "C"],
    rolSize: ["no", "yes", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2035%206%20mil%20datasheet.pdf?alt=media&token=30c61e74-2a67-4319-9671-9516da1c7e31'
  },
  {
    name: "NT PerLite Ceramic 35 10 mil",
    group: 'Safety  & Security',
    subGroups: 'Neutral',
    code: "R270L5T",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "C", "T", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20PerLite%20Ceramic%2035%2010%20mil%20datasheet.pdf?alt=media&token=8d3c2493-35ef-420d-ad46-595a6dc98c5b'
  },
  {
    name: "SF Matte 5 mil i",
    group: 'Safety  & Security',
    subGroups: 'Neutral',
    code: "R14811",
    type: "Internal",
    compatibilty: ["C", "C", "C", "C", "CC", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Matte%205%20mil%20i%20datasheet.pdf?alt=media&token=fe166998-260e-4daf-baff-e218108ecd9b'
  },
  {
    name: "SF Matte 12 mil i",
    group: '',
    subGroups: '',
    code: "R32311C",
    type: "",
    compatibilty: ["C", "C", "C", "C", "CC", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSF%20Matte%205%20mil%20i%20datasheet.pdf?alt=media&token=fe166998-260e-4daf-baff-e218108ecd9b'
  },
  {
    name: "AG Clear 4 mil ix",
    group: 'Surface Protection',
    subGroups: 'Clear',
    code: "R123G3X",
    type: "Universal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FAG%20Clear%204%20mil%20ix%20datasheet.pdf?alt=media&token=c6f93b9c-17f3-4deb-8335-e2cc8faa1529'
  },
  {
    name: "AG Clear 6 mil ix",
    group: 'Surface Protection',
    subGroups: 'Clear',
    code: "R173G3X",
    type: "Universal",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FAG%20Clear%206%20mil%20ix%20datasheet.pdf?alt=media&token=b820aafd-5a5d-4c9c-90b8-a3926230e84c'
  },
  {
    name: "Clear 4 mil Poly X",
    group: 'Surface Protection',
    subGroups: 'Clear',
    code: "R1210XP",
    type: "External",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FClear%204%20mil%20Poly%20X%20datasheet.pdf?alt=media&token=6448a0d9-9fd9-4cc6-a99b-1326e4d0e3da'
  },
  {
    name: "Clear 6 mil Poly X",
    group: 'Surface Protection',
    subGroups: 'Clear',
    code: "R1731XP",
    type: "External",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    rolSize: ["no", "no", "yes", "no"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FClear%206%20mil%20Poly%20X%20datasheet.pdf?alt=media&token=0d19532a-12ab-4abf-b1d1-28d47582fd84'
  }
]




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const CreateQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const { profile, setting } = useAuth().Data

  const [, , , , , updateQuote, deleteQuote] = useQuote()

  const [loading, errors, windows, getWindowsApi, , ,] = useWindow()

  const [room, setRoom] = useState(route?.params?.room)
  const [data, setData] = useState(route?.params?.item)

  const [price, setPrice] = useState('')
  const [priceForSealing, setPriceForSealing] = useState('')
  const [priceFilmRemoval, setPriceFilmRemoval] = useState({})
  const [discount, setDiscount] = useState({ type: 'Amount', value: 0 })
  const [extraCosts, setExtraCosts] = useState([])

  const [roomSelected, setRoomSelected] = useState([])
  const [isAttachEnergySaving, setIsAttachEnergySaving] = useState(false)

  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false)

  useEffect(() => {
    const { item, room } = route?.params
    setData(item)
    setRoom(room)

    let rooms = []
    if (room) {
      rooms.push(room)
    } else {
      rooms.push(...data['rooms'])
    }
    setRoomSelected(rooms)
  }, [route])



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Quote Cost Calculations'}
              type={'normal'}
              rightOption={
                <TouchableOpacity>
                  <MaterialCommunityIcons name='delete' size={24} color={'#B2C249'} />
                </TouchableOpacity>
              }
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Map</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation])
  )

  const onUpdatePriceRemoval = (data) => {
    setPriceFilmRemoval(data)
  }

  const onUpdateDiscount = (data) => {
    console.log('DISCOUNT', data)
    setDiscount(data)
  }

  const onUpdateExtraCost = (data) => {
    console.log('EXtraCost', data)
    setExtraCosts(data)
  }

  const onUpdateStatusQuote = () => {
    updateQuote(data['id'], { status: true })
    setData({ ...data, status: true })
    route?.params?.onUpdateListQuote()
  }

  const getDiscountDisplay = () => {
    if (discount && discount['type'] === 'Amount') {
      return `$${discount['value']}`
    }
    if (discount && discount['type'] === 'Percent') {
      return `${discount['value']}%`
    }
  }

  const getGlassArea = () => {
    let glassArea = 0
    for (let room of roomSelected) {
      if (room['windows']) {
        room['windows'].forEach(item => {
          glassArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
        })
      }
    }
    return Math.round(glassArea * 1.1 * 100) / 100
  }

  const getPriceFilmRemoval = () => {
    if (isUndefined(priceFilmRemoval) || isEmpty(priceFilmRemoval)) {
      return 0
    } else {
      let area = priceFilmRemoval['width'] / 1000 * priceFilmRemoval['drop'] / 1000 * priceFilmRemoval['quantity']
      return Math.round(area * priceFilmRemoval['price'] * 100) / 100
    }
  }

  const getTotalExtra = () => {
    let totalExtra = 0
    if (!_.isEmpty(extraCosts)) {
      extraCosts.forEach(item => {
        if (item['value']) {
          totalExtra += Number(item['value'])
        }
      })
    }
    return totalExtra
  }


  const getPriceTotal = (percent = 1) => {
    let priceFilm = getGlassArea() * price + getPriceFilmRemoval() + Number(priceForSealing)

    if (discount && discount['type'] === 'Amount') {
      priceFilm = priceFilm - discount['value']
    }
    if (discount && discount['type'] === 'Percent') {
      priceFilm = priceFilm - ((priceFilm * discount['value']) / 100)
    }

    if (!_.isEmpty(extraCosts)) {
      priceFilm += getTotalExtra()
    }

    return Math.round(priceFilm * percent * 100) / 100
  }

  const getTintFilm = () => {
    if (room && !isUndefined(room['tint_film']) && !isEmpty(room['tint_film'])) {
      return room['tint_film']
    }
    return data['tint_film']
  }



  const getGlassType = () => {
    let result = ''
    for (let room of roomSelected) {
      if (room['windows']) {
        result += '<br/>'
        room['windows'].forEach(item => {
          result += `${item['glassType']}<br/>`
        })
      }
    }
    return result
  }

  const getFrameType = () => {
    let result = ''
    for (let room of roomSelected) {
      if (room['windows']) {
        result += '<br/>'
        room['windows'].forEach(item => {
          result += `${item['frameType']}<br/>`
        })
      }
    }
    return result
  }


  const getConstByGlassType = (film, glassType) => {
    if (!film['savings']) return 0
    switch (glassType) {
      case 'Float Clear':
        return film['savings'][0];
      case 'Clear Laminated':
        return film['savings'][0];
      case 'Toughned Clear':
        return film['savings'][0];
      case 'Tinted Float':
        return film['savings'][1];
      case 'Tinted Laminated':
        return film['savings'][0];
      case 'Double Glazed Clear':
        return film['savings'][3];
      case 'Double Glazed Tinted':
        return film['savings'][4];
      case 'Double Glazed low-E':
        return film['savings'][5];
      case 'Double Glazed Tinted Low- E':
        return film['savings'][6];
    }
    return 0
  }

  const getPowerCost = () => {
    return (setting && setting['powerCost']) ? setting['powerCost'] : 0.27
  }

  const getSaving = () => {
    let filmSelected = findLast(DATA_FILM, item => item['name'] === getTintFilm())
    let value = 0
    for (let room of roomSelected) {
      if (room['windows']) {
        room['windows'].forEach(item => {
          value += getConstByGlassType(filmSelected, item['glassType'])
        })
      }
    }
    return Math.round((value * getPowerCost()) * getGlassArea() * 100) / 100
  }

  const getSignature = (chars = '<br />') => {
    if (setting && setting['signature']) {
      return setting['signature'].replace(new RegExp('\r?\n', 'g'), chars);
    } else {
      return `Window Films WA
      77 Boulder Road 
      MALAGA 6090`
    }
  }

  const getCompanyLogo = () => {
    return profile['companyLogo'] || setting['companyLogo']
  }
  const getRooms = () => {
    let rooms = []
    if (room) {
      rooms.push(room)
    } else {
      rooms.push(...data['rooms'])
    }
    return rooms
  }

  const getEmailHtml = (isQuick = false, isPdf = false, dataSheet = '') => {
    onUpdateStatusQuote()
    if (!isQuick) {
      return (`<div style="text-align: left;"><img src="${getCompanyLogo()}" alt="Logo" height="80">
      ${profile['member'] ? `<img src="https://www.wfaanz.org.au/wp-content/uploads/2018/11/WFAANZ-logo-e1541639610957.png" alt="Logo" height="50"></div>` : ``}</div>
      <h1>Quotation No. ${data['quote_number']}</h1>
    <h1>${moment().format('DD MMM YYYY')}</h1>
    <p><strong>Customer details: </strong>${data['customer_name']}</br>${data['site_address']}, ${data['site_state']}</p>
    <p><strong>Site details: </strong>${data['site_address']}, ${data['site_state']}</p>
    <p>Dear ${data['customer_name']},</p>
    <p>I have great pleasure in submitting the following quotation and have attached the following documents:</p>
    <ul>
    <li>Quotation ${data['quote_number']} ${(Platform.OS === 'android' && isPdf) ? '' : '(contained within this document)'}</li>
    ${getTintFilm() ? `<li>${getTintFilm()} Internal Window Film Brochure ${(Platform.OS === 'android' && dataSheet) ? `(<a href="${dataSheet}">Here</a>)` : ''}</li>` : ''}
    <li>Sample copy of the Manufacturer&rsquo;s Warranty Form ${Platform.OS === 'android' ? `(<a href="https://graphicsap.averydennison.com/content/dam/averydennison/graphics/ap/en/warranty/windowfilm/Architectural%20Window%20Film%20-%20Warranty%20Bulletin%201.0_SAPSSA_Rev_0.pdf">Here</a>)` : ''}</li>
    </ul>
    <p>Scope of Works:</p>
    <p><strong>Provide quotation to supply and install ${getTintFilm() && `${getTintFilm()}`} as described</strong></p>
    <p>Project Requirements &amp; Benefits:</p>
    <p>Reduce Solar Heat Gain (Heat)</p>
    <p>Reduce Ultra Violet Radiation (Fading)</p>
    <p>Reduce Glare</p>
    <p>Provide Daytime Privacy</p>
    <p><strong>About your Glass and Frames:</strong></p>
    <p>Glass Type: ${getGlassType()}</p>
    <p>Frame Type: ${getFrameType()}</p>
    <p><strong>Film-to-Glass Application (Recommendation):</strong></p>
    ${getTintFilm() ? `<p>${getTintFilm()} Internal Window Film is recommended by the manufacturer</p>` : ''}
    <p><strong>About SolarZone Internal Window Films:</strong></p>
    <ul>
    <li>Deliver high levels of protection from solar heat, cut energy costs by reducing the need for air-conditioning, boosting energy efficiency</li>
    <li>Dual Reflective films are ideal for commercial and residential energy-upgrade glazing projects when the customer wants quick payback but wants a neutral interior that preserves the view outside</li>
    <li>High levels of heat rejection cuts energy costs by reducing consumption and peak load</li>
    <li>Outstanding glare control for enhanced comfort</li>
    <li>Warm neutral interior with low reflectivity preserves ambiance and views</li>
    <li>99+% UV block limits fading and damage from the sun</li>
    <li>Bold appearance upgrades building exterior and maintains daytime privacy</li>
    </ul>
    <p><strong>Fade Reduction:</strong></p>
    <p>Manufacturer&rsquo;s Note: This data is a guide enabling an estimate only of fade reduction, as there are many variables that cause fading, it would be impossible to give an exact figure, therefore, does not constitute a warranty.</p>
    <p><strong>Installation of your Window Film:</strong></p>
    <p>Will be supplied and installed in accordance with manufacturer&rsquo;s installation instructions.</p>
    <p>Window Films WA employees are licenced and approved window film applicators.</p>
    <p>We are currently booking ahead for between 7 - 10 working days (if you require immediate installation, please contact me directly and I will endeavour to accommodate your requirements).</p>
    <p>Please let me know directly when you are ready to proceed and I will schedule ASAP.</p>
    ${profile['installer'] ? `
      <p><strong>Window Energy Rating System&nbsp;</strong><img src="https://awa.associationonline.com.au/sitebuilder/wershome/knowledge/asset/small/17/werslogo1.png" alt="Logo" height="30"></p>
      <p>Window films WA is an accredited WERS installer. Upon completion you will issued a certification of the WERS rating appropriate to the film being installed on your current&nbsp; Glazing specifications. Based on the ${getTintFilm() && `${getTintFilm()}`}&nbsp; you will achieve a WERS rating <span style="color: #ff0000;">★</span><span style="color: #ff0000;">15 %&nbsp; </span>heating <span style="color: #8eaadb;">★★★</span><span style="color: #8eaadb;">32%&nbsp; </span>Cooling<span style="color: #8eaadb;">&nbsp; Rating</span><span style="color: #8eaadb;">.&nbsp;</span></p>
     ` : ``
        }
    <p><strong>Warranty Period &amp; Registration:</strong></p>
    <p>${getTintFilm() ? `${getTintFilm()}` : ''} Internal Window Film carries a Lifetime Warranty for Residential applications and 12 Years Warranty for Commercial applications. The warranty period on the External Window film applications varies depending on the film used and other site variables. Please refer to the sample copy of the manufacturer&rsquo;s warranty form attached to confirm the warranty period relevant to this particular application.</p>
    <p>The original warranty document will be sent to you after installation for this types of glazing.</p>
    <p><strong>Apples for Apples Policy:</strong></p>
    <p>Window Films WA pride ourselves on giving best value pricing for quality products but if you receive a cheaper quote from our competitors we will do our very best to match it. Competitor&rsquo;s quotes must be in writing and comparable to our quoted product and service.</p>
   ${isAttachEnergySaving ? `
    <p><strong>Energy savings and Payback period</strong></p>
    <p>The film manufacturers have calculated the energy savings (kwh/sqm2) based on applying film to the different glass types of commercial buildings that require air-conditioning. While we haven&rsquo;t energy modelled your particular building yet, if we apply the same reduction in Solar Energy Gain achieved by applying this film and multiply that by the amount you actually pay to run your air-conditioning we can get this estimate of the savings in your power costs.</p>
    <p>Our estimate is that you will save $${getSaving()} a year and have a payback period of 3.1 years.</p>` : ``
        }
    <p><em>Please note that this is only a guide and more accurate figures can be obtained by employing an energy auditor.</em></p>
    <div>
    ${Platform.OS === 'ios' ? `
      <table>
      <tbody>
      <tr>
      <td>Total</td>
      <td>$${getPriceTotal(1)}</td>
      </tr>
      <tr>
      <td>GST</td>
      <td>$${getPriceTotal(0.1)}</td>
      </tr>
      <tr>
      <td>Total (including GST)</td>
      <td>$${getPriceTotal(1.1)}</td>
      </tr>
      </tbody>
      </table>` : `
      <p>Total: $${getPriceTotal(1)}</p>
      <p>GST: $${getPriceTotal(0.1)}</p>
      <p>Total (including GST): $${getPriceTotal(1.1)}</p>
      `
        }
    </div>
    <p>Payment Types:</p>
    <p>Cheque, EFT (see bank details below)</p>
    <p>Please contact me directly should you require any additional information.</p>
    <p style="text-align: center;">${getSignature()}</p>`
      )
    } else {
      return (`<div style="text-align: left;"><img src="${getCompanyLogo()}" alt="Logo" height="80">
      ${profile['member'] ? `<img src="https://www.wfaanz.org.au/wp-content/uploads/2018/11/WFAANZ-logo-e1541639610957.png" alt="Logo" height="50"></div>` : ``}</div>
      <h1>Quotation No. ${data['quote_number']}</h1>
      <h1>${moment().format('DD MMM YYYY')}</h1>
      <p><strong>Customer details:</strong>${data['customer_name']}</p>
      <p><strong>Site details:</strong>${data['site_address']}, ${data['site_state']}</p>
      <p>Dear ${data['customer_name']},</p>
      <p>I have great pleasure in submitting the following quotation and have attached the following documents:</p>
      <ul>
      <li>Quotation ${data['quote_number']} ${(Platform.OS === 'android' && isPdf) ? '' : '(contained within this document)'}</li>
      ${getTintFilm() ? `<li>${getTintFilm()} Internal Window Film Brochure ${(Platform.OS === 'android' && dataSheet) ? `(<a href="${dataSheet}">Here</a>)` : ''}</li>` : ''}
      <li>Sample copy of the Manufacturer&rsquo;s Warranty Form ${Platform.OS === 'android' ? `(<a href="https://graphicsap.averydennison.com/content/dam/averydennison/graphics/ap/en/warranty/windowfilm/Architectural%20Window%20Film%20-%20Warranty%20Bulletin%201.0_SAPSSA_Rev_0.pdf">Here</a>)` : ''}</li>
      </ul>
      <div>
      ${Platform.OS === 'ios' ? `
        <table>
        <tbody>
        <tr>
        <td>Total</td>
        <td>$${getPriceTotal(1)}</td>
        </tr>
        <tr>
        <td>GST</td>
        <td>$${getPriceTotal(0.1)}</td>
        </tr>
        <tr>
        <td>Total (including GST)</td>
        <td>$${getPriceTotal(1.1)}</td>
        </tr>
        </tbody>
        </table>` : `
        <p>Total: $${getPriceTotal(1)}</p>
        <p>GST: $${getPriceTotal(0.1)}</p>
        <p>Total (including GST): $${getPriceTotal(1.1)}</p>
        `
        }
      </div>
      <p>Payment Types:</p>
      <p>EFT (see bank details below)</p>
      <p>Please contact me directly should you require any additional information.</p>
      <p>${getSignature()}</p>`)
    }
  }

  const downloadDataSheet = async (data) => {
    const { config, fs } = ReactNativeBlobUtil
    const { CacheDir } = fs.dirs;
    if (data) {
      const options = {
        fileCache: true,
        path: CacheDir + '/' + `${data['name']}.pdf`
      };
      let dataSheet = config(options).fetch('GET', data['dataSheet'])
      const warrantyOptions = {
        fileCache: true,
        path: CacheDir + '/' + `Architectural Window Film - Warranty Bulletin SAPSSA.pdf`
      };
      let warranty = config(warrantyOptions).fetch('GET', `https://graphicsap.averydennison.com/content/dam/averydennison/graphics/ap/en/warranty/windowfilm/Architectural%20Window%20Film%20-%20Warranty%20Bulletin%201.0_SAPSSA_Rev_0.pdf`)

      let responses = await Promise.all([dataSheet, warranty]);
      return [responses[0].path(), responses[1].path()]
    } else {
      const warrantyOptions = {
        fileCache: true,
        path: CacheDir + '/' + `Architectural Window Film - Warranty Bulletin SAPSSA.pdf`
      };
      let warranty = await config(warrantyOptions).fetch('GET', `https://graphicsap.averydennison.com/content/dam/averydennison/graphics/ap/en/warranty/windowfilm/Architectural%20Window%20Film%20-%20Warranty%20Bulletin%201.0_SAPSSA_Rev_0.pdf`)
      return [warranty.path()]
    }
  }


  const createPdfEmailAndroid = async (isQuick = false, dataSheet = '') => {
    let options = {
      html: `${getEmailHtml(isQuick, true, dataSheet)}`,
      fileName: `Window Film WA Quote ${data['quote_number']}`,
      directory: 'Documents',
      fonts: [resolveAssetSource(require('../../fonts/NewJune-Regular.otf')).uri],
      paddingLeft: 20,
      paddingRight: 20,
      bgColor: '#ffffff'
    };

    let file = await RNHTMLtoPDF.convert(options)
    return file.filePath
  }


  const handleEmail = async (isQuick = false) => {
    setIsLoadingGenerate(true)
    const to = [(setting && setting['cutListsTo']) ? setting['cutListsTo'] : data['contact_email']]
    const cc = [(setting && setting['bccQuotesTo']) ? setting['bccQuotesTo'] : 'malc@windowfilmswa.com.au']
    const bcc = [(setting && setting['bccQuotesTo']) ? setting['bccQuotesTo'] : 'malc@windowfilmswa.com.au']
    const subject = `Window Film WA Quote ${data['quote_number']}`
    let body = ''
    let attachments = []
    let filmSelected = findLast(DATA_FILM, item => item['name'] === getTintFilm())
    let files = await downloadDataSheet(filmSelected)
    if (Platform.OS === 'ios') {
      if (files && files.length >= 2) {
        attachments = [{
          path: files[0],
          type: 'pdf',
          name: filmSelected['name']
        },
        {
          path: files[1],
          type: 'pdf',
          name: `Architectural Window Film - Warranty Bulletin SAPSSA`
        }]
      } else {
        if (files) {
          attachments = [
            {
              path: files[0],
              type: 'pdf',
              name: `Architectural Window Film - Warranty Bulletin SAPSSA`
            }]
        }
      }
      body = getEmailHtml(isQuick)
    } else {
      body = `Dear ${data['customer_name']}\n\n
I have great pleasure in submitting the following quotation and have attached the following documents:\n
Quotation ${data['quote_number']}\n
Sample of the Manufacturers warranty Document\n
Specified film performance data sheet\n\n
Please contact us directly if you  have any issues downloading these attachments or require any further information\n
${getSignature('\n')}
      `
      let pathPdfEmailAndroid = await createPdfEmailAndroid(isQuick, filmSelected ? filmSelected['dataSheet'] : '')
      attachments = [{
        path: pathPdfEmailAndroid,
        type: 'pdf',
        name: `Window Film WA Quote ${data['quote_number']}`,
      }]
      if (files && files.length >= 2) {
        attachments.push({
          path: files[0],
          type: 'pdf',
          name: filmSelected['name']
        })
        attachments.push({
          path: files[1],
          type: 'pdf',
          name: `Architectural Window Film - Warranty Bulletin SAPSSA`
        })
      } else {
        if (files) {
          attachments.push({
            path: files[0],
            type: 'pdf',
            name: `Architectural Window Film - Warranty Bulletin SAPSSA`
          })
        }
      }
    }
    setIsLoadingGenerate(false)
    Mailer.mail({
      subject: subject,
      recipients: to,
      ccRecipients: cc,
      bccRecipients: bcc,
      body: body,
      customChooserTitle: 'Send Mail',
      isHTML: Platform.OS === 'ios',
      attachments: attachments
    }, (error, event) => {

    });
  }

  const onAddOrRemoveRoom = (val) => {
    let newRoomSelected = [...roomSelected]
    if (!_.includes(roomSelected, val)) {
      newRoomSelected.push(val);
    } else {
      _.remove(newRoomSelected, item => item === val);
    }
    setRoomSelected(newRoomSelected)
  }

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
              <Text style={styles.title}>Office</Text>
              <CheckBox
                disabled={false}
                value={false}
                style={styles.checkBox}
                boxType={'square'}
                tintColor={'#B2C249'}
                onCheckColor={'#FFFFFF'}
                onTintColor={'#B2C249'}
                onFillColor={'#B2C249'}
                onValueChange={(newValue) => { }}
              />
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={styles.title}>Glass Area</Text>
              <Text style={styles.subValue}>{getGlassArea()}m²</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title, { color: '#C40215' }]}>Price Per m²</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={price}
                  keyboardType={'numeric'}
                  onChangeText={text => setPrice(text)}
                  placeholder={'$ per m²'}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title, { color: '#C40215' }]}>Price Film Removal</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'$ per m²'}
                  keyboardType={'numeric'}
                  value={priceFilmRemoval['price']}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title, { color: '#C40215' }]}>Price for Sealing</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'$ per m²'}
                  value={priceForSealing}
                  keyboardType={'numeric'}
                  onChangeText={text => setPriceForSealing(text)}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={styles.title}>Film and labour total</Text>
              <Text style={styles.subValue}>$0.00</Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => navigation.navigate('PriceRemoval', { item: priceFilmRemoval, onUpdatePriceRemoval })}
              style={styles.item}>
              <Text style={styles.title}>Film Removal</Text>
              <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getPriceFilmRemoval()}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>


            <View style={{ height: Responsive.height(20), width: '100%' }} />

            {
              getRooms().map(item => {
                return (<>
                  <View style={styles.item}>
                    <Text style={styles.title}>{item['title']}</Text>
                    <CheckBox
                      disabled={false}
                      value={_.includes(roomSelected, item)}
                      style={styles.checkBox}
                      boxType={'square'}
                      tintColor={'#B2C249'}
                      onCheckColor={'#FFFFFF'}
                      onTintColor={'#B2C249'}
                      onFillColor={'#B2C249'}
                      onValueChange={(newValue) => onAddOrRemoveRoom(item)}
                    />
                    <View style={{ width: Responsive.width(15) }} />
                  </View>
                  <View style={styles.separator} />
                </>
                )
              })
            }
            <View style={{ height: Responsive.height(20), width: '100%' }} />


            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Notes</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={{ height: Responsive.height(20), width: '100%' }} />


            <TouchableOpacity
              onPress={() => navigation.navigate('Discount', { item: discount, onUpdateDiscount })}
              style={styles.item}>
              <Text style={styles.title}>Discount</Text>
              <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>{getDiscountDisplay()}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => navigation.navigate('ExtraCost', { item: extraCosts, onUpdateExtraCost })}
              style={styles.item}>
              <Text style={styles.title}>Extra Costs</Text>
              <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getTotalExtra()}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>

            <View style={{ height: Responsive.height(20), width: '100%' }} />


            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>GST (10%)</Text>
              <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getPriceTotal(0.1)}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Total</Text>
              <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getPriceTotal(1.1)}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>

            <View style={{ height: Responsive.height(20), width: '100%' }} />
            <View style={styles.item}>
              <Text style={styles.title}>Attach energy saving</Text>
              <Switch
                ios_backgroundColor={"#E0E0E0"}
                thumbColor={'#FFFFFF'}
                trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
                onValueChange={(value) => setIsAttachEnergySaving(!isAttachEnergySaving)}
                value={isAttachEnergySaving} />
              <View style={{ width: Responsive.width(15) }} />
            </View>



            <View style={{ height: Responsive.height(140), width: '100%' }} />

          </ScrollView>
        </KeyboardAvoidingView>
        <View style={[Layout.fullWidth, Layout.colHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {
              handleEmail(false)
            }}
            style={[Layout.fill, Layout.center, styles.buttonAdd]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Deatiled Proposal</Text>
          </TouchableOpacity>
          <View style={{ height: Responsive.height(10) }} />
          <TouchableOpacity
            onPress={() => {
              handleEmail(true)
            }}
            style={[Layout.fill, Layout.center, styles.buttonOrder]}>
            <Text style={[styles.textButton, { color: '#434A4F' }]}>Quick Quote</Text>
          </TouchableOpacity>

        </View>

      </View>
      <Loader visible={isLoadingGenerate} />
    </SafeAreaView>
  )
}

export default CreateQuoteContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  checkBox: {
    ...Platform.select({
      ios: {
        height: Responsive.height(20),
        width: Responsive.height(20)
      },
      android: {

      }
    })
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
  value: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subValue: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20)
  },
  separator: {
    height: Responsive.height(2)
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
  subTitle: {
    flex: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(10)
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
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: Responsive.width(10)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },




  actionWrapper: {
    paddingHorizontal: Responsive.width(20),
    paddingBottom: Responsive.height(10),
    position: 'absolute',
    bottom: 0
  },
  buttonAdd: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  buttonOrder: {
    height: Responsive.height(50),
    backgroundColor: '#FFFFFF',
    borderRadius: Responsive.height(10)
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  }


});
