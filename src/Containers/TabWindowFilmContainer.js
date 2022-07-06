import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { filter, includes, isEmpty } from 'lodash'
import { Header, SearchBar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'

const reflectiveListOrigin = [
  {
    name: "R Silver 20i",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R06922W",
    type: "Interior",
    compatibilty: ['C', 'C', 'C', 'C', 'CC', 'C', 'C'],
    savings: [Number(295,10), Number(142,78), 0, Number(165,29), Number(82,73), Number(132,39), Number(`58,05`)],
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
    savings: [Number(225,78), Number(111,15), 0, Number(116,57), Number(59,63), Number(88,31), Number(35,83)],
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
    savings: [Number(148,21), Number(71,78), 0, Number(65,67), Number(34,90), Number(44,81), Number(17,18)],
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
    savings: [Number(305,31), Number(169,73), 0, Number(167,57), Number(89,89), Number(126,70), Number(52,76)],
    rolSize: ["no", "no", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FR%20Silver%2020i%20Low%20E%20Datasheet.pdf?alt=media&token=211bd1e3-17ba-45c5-a2e1-9b8b253e9ac4'
  }
]


const neutralListOrigin = [
  {
    name: "NT PerLite 20i",
    group: 'Neautral',
    subGroups: 'Perlite ',
    code: "R070L6W",
    type: "Interior",
    compatibilty: ['C', 'C', 'T', 'T', 'CC', 'T', 'T'],
    savings: [Number(226,77), Number(`116,01`), 0, Number(100,31), Number(52,84), Number(66,61), Number(25,34)],
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
    savings: [Number(`158,02`), Number(80,13), 0, Number(58,18), Number(31,39), Number(32,61), Number(11,36)],
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
    savings: [Number(140,16), Number(66,13), 0, Number(56,14), Number(30,15), Number(`36,04`), Number(13,61)],
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
    savings: [Number(210,69), Number(`103,03`), 0, Number(76,37), Number(32,96), Number(38,53), Number(12,31)],
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
    savings: [Number(188,74), Number(91,58), 0, Number(65,46), Number(31,39), Number(35,57), Number(11,36)],
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
    savings: [Number(144,85), Number(68,69), 0, Number(50,91), Number(21,97), Number(29,64), Number(9,47)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FNT%20Natura%2030i%20Datasheet.pdf?alt=media&token=7d4af4be-c32a-452c-9e57-e1126f8fa7a8'
  }
]

const dualListOrigin = [
  {
    name: "DR OptiTune 05i",
    group: 'Dual Reflective',
    subGroups: 'Optitune ',
    code: "R070R0W",
    type: "Interior",
    compatibilty: ["C", "C", "C", "C", "CC", "T", "C"],
    savings: [Number(315,44), Number(150,56), 0, Number(173,59), Number(86,74), Number(137,63), Number(60,28)],
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
    savings: [Number(286,18), Number(137,31), 0, Number(154,52), Number(77,24), Number(121,57), Number(51,74)],
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
    savings: [Number(221,76), Number(`109,05`), 0, Number(101,48), Number(52,42), Number(70,55), Number(27,11)],
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
    savings: [Number(204,43), Number(98,60), 0, Number(97,19), Number(49,70), Number(69,58), Number(27,14)],
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
    savings: [Number(170,36), Number(82,17), 0, Number(70,95), Number(36,28), Number(48,71), Number(`9,04`)],
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
  }
]


const spectrallyListOrigin = [
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
    savings: [Number(157,57), Number(`80,05`), 0, Number(67,36), Number(35,49), Number(43,91), Number(16,85)],
    rolSize: ["yes", "yes", "yes", "yes"],
    dataSheet: 'https://firebasestorage.googleapis.com/v0/b/wfwaapp.appspot.com/o/FilmDataSheets%2FSP%20e-Lite%2070i%20Datasheet.pdf?alt=media&token=840f5f7f-4993-4e72-af7d-007c26568d63'
  }
]


const specialtyListOrigin = [
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
  }
]

const solarZoneListOrigin = [
  {
    name: "Silver 20 Xtra",
    group: 'Reflective',
    subGroups: 'Silver',
    code: "R07022X",
    type: "Exterior",
    compatibilty: ["C", "C", "C", "C", "C", "C", "C"],
    savings: [Number(`342,01`), Number(263,92), 0, Number(302,31), Number(210,48), Number(276,31), Number(168,70)],
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
    savings: [Number(254,94), Number(190,44), 0, Number(229,66), Number(157,27), Number(210,51), Number(`121,01`)],
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
    savings: [Number(348,29), Number(266,38), 0, Number(307,56), Number(213,88), Number(285,32), Number(173,30)],
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
    savings: [Number(337,93), Number(254,15), 0, Number(305,90), Number(208,71), Number(287,59), Number(173,61)],
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
    savings: [Number(`258,02`), Number(186,58), 0, Number(246,36), Number(163,70), Number(232,27), Number(141,87)],
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
    savings: [Number(187,42), Number(129,64), 0, Number(185,32), Number(118,97), Number(176,15), Number(99,96)],
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
  }
]


const XTRMListOrigin = [
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
  }
]

const safetyListOrigin = [
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
  }
]

const surfaceListOrigin = [
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
const TabWindowFilmContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()


  const [reflectiveList, setReflectiveList] = useState(reflectiveListOrigin)
  const [neutralList, setNeutralList] = useState(neutralListOrigin)
  const [dualList, setDualList] = useState(dualListOrigin)
  const [spectrallyList, setSpectrallyList] = useState(spectrallyListOrigin)
  const [specialtyList, setSpecialtyList] = useState(specialtyListOrigin)
  const [solarZoneList, setSolarZoneList] = useState(solarZoneListOrigin)
  const [XTRMList, setXTRMList] = useState(XTRMListOrigin)
  const [safetyList, setSafetyList] = useState(safetyListOrigin)
  const [surfaceList, setSurfaceList] = useState(surfaceListOrigin)

  const onSearch = (keyword) => {
    if (isEmpty(keyword)) {
      setReflectiveList(reflectiveListOrigin)
      setNeutralList(neutralListOrigin)
      setDualList(dualListOrigin)
      setSpectrallyList(spectrallyListOrigin)
      setSpecialtyList(specialtyListOrigin)
      setSolarZoneList(solarZoneListOrigin)
      setXTRMList(XTRMListOrigin)
      setSafetyList(safetyListOrigin)
      setSurfaceList(surfaceListOrigin)
    } else {
      setReflectiveList(filter(reflectiveListOrigin, item => item.name.includes(keyword)))
      setNeutralList(filter(neutralListOrigin, item => item.name.includes(keyword)))
      setDualList(filter(dualListOrigin, item => item.name.includes(keyword)))
      setSpectrallyList(filter(spectrallyList, item => item.name.includes(keyword)))
      setSpecialtyList(filter(specialtyListOrigin, item => item.name.includes(keyword)))
      setSolarZoneList(filter(solarZoneListOrigin, item => item.name.includes(keyword)))
      setXTRMList(filter(XTRMListOrigin, item => item.name.includes(keyword)))
      setSafetyList(filter(safetyListOrigin, item => item.name.includes(keyword)))
      setSurfaceList(filter(surfaceListOrigin, item => item.name.includes(keyword)))
    }
  }


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return <Header text={'Window Films'} type={'large'} />;
        },
      })
    }, [navigation])
  )


  const HeaderItem = ({ title }) => (
    <Text style={styles.header}>{title}</Text>
  )

  const Item = ({ title, item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FilmDetail', { item })
      }}
      style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
    </TouchableOpacity>
  );


  return (
    <SafeAreaView
      style={Layout.fill}>
      <SearchBar textLabel='Search Films' onSearch={onSearch} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
        style={{ flex: 1 }}
      >
        <SectionList
          sections={[
            {
              title: 'Reflective Films Interior',
              data: reflectiveList
            },
            {
              title: 'Neutral Films Interior',
              data: neutralList
            },
            {
              title: 'Dual Reflective Films Interior',
              data: dualList
            },
            {
              title: 'Spectrally Selective Films Interior',
              data: spectrallyList
            },
            {
              title: 'Specialty Films Decorative/Privacy',
              data: specialtyList
            },
            {
              title: 'SolarZone Xtra Films Exterior',
              data: solarZoneList
            },
            {
              title: 'XTRM SolarZone Films Exterior',
              data: XTRMList
            },
            {
              title: 'Safety & Security Films',
              data: safetyList
            },
            {
              title: 'Surface Protection',
              data: surfaceList
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item item={item} title={item['name']} />}
          renderSectionHeader={({ section: { title } }) => <HeaderItem title={title} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          stickySectionHeadersEnabled={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default TabWindowFilmContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(48),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    alignItems: 'center',
    flexDirection: 'row'
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
  itemTitle: {
    flex: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  }

});
