import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Dimensions, TextInput } from 'react-native'
import { useTheme } from '@/Hooks'
import { SelectCountry } from 'react-native-element-dropdown'
import Responsive from 'react-native-lightweight-responsive'
import { isEmpty, isUndefined } from 'lodash'


const screenWidth = Dimensions.get('window').width;

const countries = [
  {
    flag: require('@/Assets/Flags/af.png'),
    name: 'Afghanistan',
    alpha2Code: 'AF',
    callingCode: '93',
  },
  {
    flag: require('@/Assets/Flags/ax.png'),
    name: 'Åland Islands',
    alpha2Code: 'AX',
    callingCode: '358',
  },
  {
    flag: require('@/Assets/Flags/al.png'),
    name: 'Albania',
    alpha2Code: 'AL',
    callingCode: '355',
  },
  {
    flag: require('@/Assets/Flags/dz.png'),
    name: 'Algeria',
    alpha2Code: 'DZ',
    callingCode: '213',
  },
  {
    flag: require('@/Assets/Flags/as.png'),
    name: 'American Samoa',
    alpha2Code: 'AS',
    callingCode: '1684',
  },
  {
    flag: require('@/Assets/Flags/ad.png'),
    name: 'Andorra',
    alpha2Code: 'AD',
    callingCode: '376',
  },
  {
    flag: require('@/Assets/Flags/ao.png'),
    name: 'Angola',
    alpha2Code: 'AO',
    callingCode: '244',
  },
  {
    flag: require('@/Assets/Flags/ai.png'),
    name: 'Anguilla',
    alpha2Code: 'AI',
    callingCode: '1264',
  },
  {
    flag: require('@/Assets/Flags/aq.png'),
    name: 'Antarctica',
    alpha2Code: 'AQ',
    callingCode: '672',
  },
  {
    flag: require('@/Assets/Flags/ag.png'),
    name: 'Antigua and Barbuda',
    alpha2Code: 'AG',
    callingCode: '1268',
  },
  {
    flag: require('@/Assets/Flags/ar.png'),
    name: 'Argentina',
    alpha2Code: 'AR',
    callingCode: '54',
  },
  {
    flag: require('@/Assets/Flags/am.png'),
    name: 'Armenia',
    alpha2Code: 'AM',
    callingCode: '374',
  },
  {
    flag: require('@/Assets/Flags/aw.png'),
    name: 'Aruba',
    alpha2Code: 'AW',
    callingCode: '297',
  },
  {
    flag: require('@/Assets/Flags/au.png'),
    name: 'Australia',
    alpha2Code: 'AU',
    callingCode: '61',
  },
  {
    flag: require('@/Assets/Flags/at.png'),
    name: 'Austria',
    alpha2Code: 'AT',
    callingCode: '43',
  },
  {
    flag: require('@/Assets/Flags/az.png'),
    name: 'Azerbaijan',
    alpha2Code: 'AZ',
    callingCode: '994',
  },
  {
    flag: require('@/Assets/Flags/bs.png'),
    name: 'Bahamas',
    alpha2Code: 'BS',
    callingCode: '1242',
  },
  {
    flag: require('@/Assets/Flags/bh.png'),
    name: 'Bahrain',
    alpha2Code: 'BH',
    callingCode: '973',
  },
  {
    flag: require('@/Assets/Flags/bd.png'),
    name: 'Bangladesh',
    alpha2Code: 'BD',
    callingCode: '880',
  },
  {
    flag: require('@/Assets/Flags/bb.png'),
    name: 'Barbados',
    alpha2Code: 'BB',
    callingCode: '1246',
  },
  {
    flag: require('@/Assets/Flags/by.png'),
    name: 'Belarus',
    alpha2Code: 'BY',
    callingCode: '375',
  },
  {
    flag: require('@/Assets/Flags/be.png'),
    name: 'Belgium',
    alpha2Code: 'BE',
    callingCode: '32',
  },
  {
    flag: require('@/Assets/Flags/bz.png'),
    name: 'Belize',
    alpha2Code: 'BZ',
    callingCode: '501',
  },
  {
    flag: require('@/Assets/Flags/bj.png'),
    name: 'Benin',
    alpha2Code: 'BJ',
    callingCode: '229',
  },
  {
    flag: require('@/Assets/Flags/bm.png'),
    name: 'Bermuda',
    alpha2Code: 'BM',
    callingCode: '1441',
  },
  {
    flag: require('@/Assets/Flags/bt.png'),
    name: 'Bhutan',
    alpha2Code: 'BT',
    callingCode: '975',
  },
  {
    flag: require('@/Assets/Flags/bo.png'),
    name: 'Bolivia (Plurinational State of)',
    alpha2Code: 'BO',
    callingCode: '591',
  },
  {
    flag: require('@/Assets/Flags/bq.png'),
    name: 'Bonaire, Sint Eustatius and Saba',
    alpha2Code: 'BQ',
    callingCode: '5997',
  },
  {
    flag: require('@/Assets/Flags/ba.png'),
    name: 'Bosnia and Herzegovina',
    alpha2Code: 'BA',
    callingCode: '387',
  },
  {
    flag: require('@/Assets/Flags/bw.png'),
    name: 'Botswana',
    alpha2Code: 'BW',
    callingCode: '267',
  },
  {
    flag: require('@/Assets/Flags/br.png'),
    name: 'Brazil',
    alpha2Code: 'BR',
    callingCode: '55',
  },
  {
    flag: require('@/Assets/Flags/io.png'),
    name: 'British Indian Ocean Territory',
    alpha2Code: 'IO',
    callingCode: '246',
  },
  {
    flag: require('@/Assets/Flags/vg.png'),
    name: 'Virgin Islands (British)',
    alpha2Code: 'VG',
    callingCode: '1284',
  },
  {
    flag: require('@/Assets/Flags/vi.png'),
    name: 'Virgin Islands (U.S.)',
    alpha2Code: 'VI',
    callingCode: '1 340',
  },
  {
    flag: require('@/Assets/Flags/bn.png'),
    name: 'Brunei Darussalam',
    alpha2Code: 'BN',
    callingCode: '673',
  },
  {
    flag: require('@/Assets/Flags/bg.png'),
    name: 'Bulgaria',
    alpha2Code: 'BG',
    callingCode: '359',
  },
  {
    flag: require('@/Assets/Flags/bf.png'),
    name: 'Burkina Faso',
    alpha2Code: 'BF',
    callingCode: '226',
  },
  {
    flag: require('@/Assets/Flags/bi.png'),
    name: 'Burundi',
    alpha2Code: 'BI',
    callingCode: '257',
  },
  {
    flag: require('@/Assets/Flags/kh.png'),
    name: 'Cambodia',
    alpha2Code: 'KH',
    callingCode: '855',
  },
  {
    flag: require('@/Assets/Flags/cm.png'),
    name: 'Cameroon',
    alpha2Code: 'CM',
    callingCode: '237',
  },
  {
    flag: require('@/Assets/Flags/ca.png'),
    name: 'Canada',
    alpha2Code: 'CA',
    callingCode: '1',
  },
  {
    flag: require('@/Assets/Flags/cv.png'),
    name: 'Cabo Verde',
    alpha2Code: 'CV',
    callingCode: '238',
  },
  {
    flag: require('@/Assets/Flags/ky.png'),
    name: 'Cayman Islands',
    alpha2Code: 'KY',
    callingCode: '1345',
  },
  {
    flag: require('@/Assets/Flags/cf.png'),
    name: 'Central African Republic',
    alpha2Code: 'CF',
    callingCode: '236',
  },
  {
    flag: require('@/Assets/Flags/td.png'),
    name: 'Chad',
    alpha2Code: 'TD',
    callingCode: '235',
  },
  {
    flag: require('@/Assets/Flags/cl.png'),
    name: 'Chile',
    alpha2Code: 'CL',
    callingCode: '56',
  },
  {
    flag: require('@/Assets/Flags/cn.png'),
    name: 'China',
    alpha2Code: 'CN',
    callingCode: '86',
  },
  {
    flag: require('@/Assets/Flags/cx.png'),
    name: 'Christmas Island',
    alpha2Code: 'CX',
    callingCode: '61',
  },
  {
    flag: require('@/Assets/Flags/cc.png'),
    name: 'Cocos (Keeling) Islands',
    alpha2Code: 'CC',
    callingCode: '61',
  },
  {
    flag: require('@/Assets/Flags/co.png'),
    name: 'Colombia',
    alpha2Code: 'CO',
    callingCode: '57',
  },
  {
    flag: require('@/Assets/Flags/km.png'),
    name: 'Comoros',
    alpha2Code: 'KM',
    callingCode: '269',
  },
  {
    flag: require('@/Assets/Flags/cg.png'),
    name: 'Congo',
    alpha2Code: 'CG',
    callingCode: '242',
  },
  {
    flag: require('@/Assets/Flags/cd.png'),
    name: 'Congo (Democratic Republic of the)',
    alpha2Code: 'CD',
    callingCode: '243',
  },
  {
    flag: require('@/Assets/Flags/ck.png'),
    name: 'Cook Islands',
    alpha2Code: 'CK',
    callingCode: '682',
  },
  {
    flag: require('@/Assets/Flags/cr.png'),
    name: 'Costa Rica',
    alpha2Code: 'CR',
    callingCode: '506',
  },
  {
    flag: require('@/Assets/Flags/hr.png'),
    name: 'Croatia',
    alpha2Code: 'HR',
    callingCode: '385',
  },
  {
    flag: require('@/Assets/Flags/cu.png'),
    name: 'Cuba',
    alpha2Code: 'CU',
    callingCode: '53',
  },
  {
    flag: require('@/Assets/Flags/cw.png'),
    name: 'Curaçao',
    alpha2Code: 'CW',
    callingCode: '599',
  },
  {
    flag: require('@/Assets/Flags/cy.png'),
    name: 'Cyprus',
    alpha2Code: 'CY',
    callingCode: '357',
  },
  {
    flag: require('@/Assets/Flags/cz.png'),
    name: 'Czech Republic',
    alpha2Code: 'CZ',
    callingCode: '420',
  },
  {
    flag: require('@/Assets/Flags/dk.png'),
    name: 'Denmark',
    alpha2Code: 'DK',
    callingCode: '45',
  },
  {
    flag: require('@/Assets/Flags/dj.png'),
    name: 'Djibouti',
    alpha2Code: 'DJ',
    callingCode: '253',
  },
  {
    flag: require('@/Assets/Flags/dm.png'),
    name: 'Dominica',
    alpha2Code: 'DM',
    callingCode: '1767',
  },
  {
    flag: require('@/Assets/Flags/do.png'),
    name: 'Dominican Republic',
    alpha2Code: 'DO',
    callingCode: '1809',
  },
  {
    flag: require('@/Assets/Flags/ec.png'),
    name: 'Ecuador',
    alpha2Code: 'EC',
    callingCode: '593',
  },
  {
    flag: require('@/Assets/Flags/eg.png'),
    name: 'Egypt',
    alpha2Code: 'EG',
    callingCode: '20',
  },
  {
    flag: require('@/Assets/Flags/sv.png'),
    name: 'El Salvador',
    alpha2Code: 'SV',
    callingCode: '503',
  },
  {
    flag: require('@/Assets/Flags/gq.png'),
    name: 'Equatorial Guinea',
    alpha2Code: 'GQ',
    callingCode: '240',
  },
  {
    flag: require('@/Assets/Flags/er.png'),
    name: 'Eritrea',
    alpha2Code: 'ER',
    callingCode: '291',
  },
  {
    flag: require('@/Assets/Flags/ee.png'),
    name: 'Estonia',
    alpha2Code: 'EE',
    callingCode: '372',
  },
  {
    flag: require('@/Assets/Flags/et.png'),
    name: 'Ethiopia',
    alpha2Code: 'ET',
    callingCode: '251',
  },
  {
    flag: require('@/Assets/Flags/fk.png'),
    name: 'Falkland Islands (Malvinas)',
    alpha2Code: 'FK',
    callingCode: '500',
  },
  {
    flag: require('@/Assets/Flags/fo.png'),
    name: 'Faroe Islands',
    alpha2Code: 'FO',
    callingCode: '298',
  },
  {
    flag: require('@/Assets/Flags/fj.png'),
    name: 'Fiji',
    alpha2Code: 'FJ',
    callingCode: '679',
  },
  {
    flag: require('@/Assets/Flags/fi.png'),
    name: 'Finland',
    alpha2Code: 'FI',
    callingCode: '358',
  },
  {
    flag: require('@/Assets/Flags/fr.png'),
    name: 'France',
    alpha2Code: 'FR',
    callingCode: '33',
  },
  {
    flag: require('@/Assets/Flags/gf.png'),
    name: 'French Guiana',
    alpha2Code: 'GF',
    callingCode: '594',
  },
  {
    flag: require('@/Assets/Flags/pf.png'),
    name: 'French Polynesia',
    alpha2Code: 'PF',
    callingCode: '689',
  },
  {
    flag: require('@/Assets/Flags/ga.png'),
    name: 'Gabon',
    alpha2Code: 'GA',
    callingCode: '241',
  },
  {
    flag: require('@/Assets/Flags/gm.png'),
    name: 'Gambia',
    alpha2Code: 'GM',
    callingCode: '220',
  },
  {
    flag: require('@/Assets/Flags/ge.png'),
    name: 'Georgia',
    alpha2Code: 'GE',
    callingCode: '995',
  },
  {
    flag: require('@/Assets/Flags/de.png'),
    name: 'Germany',
    alpha2Code: 'DE',
    callingCode: '49',
  },
  {
    flag: require('@/Assets/Flags/gh.png'),
    name: 'Ghana',
    alpha2Code: 'GH',
    callingCode: '233',
  },
  {
    flag: require('@/Assets/Flags/gi.png'),
    name: 'Gibraltar',
    alpha2Code: 'GI',
    callingCode: '350',
  },
  {
    flag: require('@/Assets/Flags/gr.png'),
    name: 'Greece',
    alpha2Code: 'GR',
    callingCode: '30',
  },
  {
    flag: require('@/Assets/Flags/gl.png'),
    name: 'Greenland',
    alpha2Code: 'GL',
    callingCode: '299',
  },
  {
    flag: require('@/Assets/Flags/gd.png'),
    name: 'Grenada',
    alpha2Code: 'GD',
    callingCode: '1473',
  },
  {
    flag: require('@/Assets/Flags/gp.png'),
    name: 'Guadeloupe',
    alpha2Code: 'GP',
    callingCode: '590',
  },
  {
    flag: require('@/Assets/Flags/gu.png'),
    name: 'Guam',
    alpha2Code: 'GU',
    callingCode: '1671',
  },
  {
    flag: require('@/Assets/Flags/gt.png'),
    name: 'Guatemala',
    alpha2Code: 'GT',
    callingCode: '502',
  },
  {
    flag: require('@/Assets/Flags/gg.png'),
    name: 'Guernsey',
    alpha2Code: 'GG',
    callingCode: '44',
  },
  {
    flag: require('@/Assets/Flags/gn.png'),
    name: 'Guinea',
    alpha2Code: 'GN',
    callingCode: '224',
  },
  {
    flag: require('@/Assets/Flags/gw.png'),
    name: 'Guinea-Bissau',
    alpha2Code: 'GW',
    callingCode: '245',
  },
  {
    flag: require('@/Assets/Flags/gy.png'),
    name: 'Guyana',
    alpha2Code: 'GY',
    callingCode: '592',
  },
  {
    flag: require('@/Assets/Flags/ht.png'),
    name: 'Haiti',
    alpha2Code: 'HT',
    callingCode: '509',
  },
  {
    flag: require('@/Assets/Flags/va.png'),
    name: 'Holy See',
    alpha2Code: 'VA',
    callingCode: '379',
  },
  {
    flag: require('@/Assets/Flags/hn.png'),
    name: 'Honduras',
    alpha2Code: 'HN',
    callingCode: '504',
  },
  {
    flag: require('@/Assets/Flags/hk.png'),
    name: 'Hong Kong',
    alpha2Code: 'HK',
    callingCode: '852',
  },
  {
    flag: require('@/Assets/Flags/hu.png'),
    name: 'Hungary',
    alpha2Code: 'HU',
    callingCode: '36',
  },
  {
    flag: require('@/Assets/Flags/is.png'),
    name: 'Iceland',
    alpha2Code: 'IS',
    callingCode: '354',
  },
  {
    flag: require('@/Assets/Flags/in.png'),
    name: 'India',
    alpha2Code: 'IN',
    callingCode: '91',
  },
  {
    flag: require('@/Assets/Flags/id.png'),
    name: 'Indonesia',
    alpha2Code: 'ID',
    callingCode: '62',
  },
  {
    flag: require('@/Assets/Flags/ci.png'),
    name: "Côte d'Ivoire",
    alpha2Code: 'CI',
    callingCode: '225',
  },
  {
    flag: require('@/Assets/Flags/ir.png'),
    name: 'Iran (Islamic Republic of)',
    alpha2Code: 'IR',
    callingCode: '98',
  },
  {
    flag: require('@/Assets/Flags/iq.png'),
    name: 'Iraq',
    alpha2Code: 'IQ',
    callingCode: '964',
  },
  {
    flag: require('@/Assets/Flags/ie.png'),
    name: 'Ireland',
    alpha2Code: 'IE',
    callingCode: '353',
  },
  {
    flag: require('@/Assets/Flags/im.png'),
    name: 'Isle of Man',
    alpha2Code: 'IM',
    callingCode: '44',
  },
  {
    flag: require('@/Assets/Flags/il.png'),
    name: 'Israel',
    alpha2Code: 'IL',
    callingCode: '972',
  },
  {
    flag: require('@/Assets/Flags/it.png'),
    name: 'Italy',
    alpha2Code: 'IT',
    callingCode: '39',
  },
  {
    flag: require('@/Assets/Flags/jm.png'),
    name: 'Jamaica',
    alpha2Code: 'JM',
    callingCode: '1876',
  },
  {
    flag: require('@/Assets/Flags/jp.png'),
    name: 'Japan',
    alpha2Code: 'JP',
    callingCode: '81',
  },
  {
    flag: require('@/Assets/Flags/je.png'),
    name: 'Jersey',
    alpha2Code: 'JE',
    callingCode: '44',
  },
  {
    flag: require('@/Assets/Flags/jo.png'),
    name: 'Jordan',
    alpha2Code: 'JO',
    callingCode: '962',
  },
  {
    flag: require('@/Assets/Flags/kz.png'),
    name: 'Kazakhstan',
    alpha2Code: 'KZ',
    callingCode: '76',
  },
  {
    flag: require('@/Assets/Flags/ke.png'),
    name: 'Kenya',
    alpha2Code: 'KE',
    callingCode: '254',
  },
  {
    flag: require('@/Assets/Flags/ki.png'),
    name: 'Kiribati',
    alpha2Code: 'KI',
    callingCode: '686',
  },
  {
    flag: require('@/Assets/Flags/kw.png'),
    name: 'Kuwait',
    alpha2Code: 'KW',
    callingCode: '965',
  },
  {
    flag: require('@/Assets/Flags/kg.png'),
    name: 'Kyrgyzstan',
    alpha2Code: 'KG',
    callingCode: '996',
  },
  {
    flag: require('@/Assets/Flags/la.png'),
    name: "Lao People's Democratic Republic",
    alpha2Code: 'LA',
    callingCode: '856',
  },
  {
    flag: require('@/Assets/Flags/lv.png'),
    name: 'Latvia',
    alpha2Code: 'LV',
    callingCode: '371',
  },
  {
    flag: require('@/Assets/Flags/lb.png'),
    name: 'Lebanon',
    alpha2Code: 'LB',
    callingCode: '961',
  },
  {
    flag: require('@/Assets/Flags/ls.png'),
    name: 'Lesotho',
    alpha2Code: 'LS',
    callingCode: '266',
  },
  {
    flag: require('@/Assets/Flags/lr.png'),
    name: 'Liberia',
    alpha2Code: 'LR',
    callingCode: '231',
  },
  {
    flag: require('@/Assets/Flags/ly.png'),
    name: 'Libya',
    alpha2Code: 'LY',
    callingCode: '218',
  },
  {
    flag: require('@/Assets/Flags/li.png'),
    name: 'Liechtenstein',
    alpha2Code: 'LI',
    callingCode: '423',
  },
  {
    flag: require('@/Assets/Flags/lt.png'),
    name: 'Lithuania',
    alpha2Code: 'LT',
    callingCode: '370',
  },
  {
    flag: require('@/Assets/Flags/lu.png'),
    name: 'Luxembourg',
    alpha2Code: 'LU',
    callingCode: '352',
  },
  {
    flag: require('@/Assets/Flags/mo.png'),
    name: 'Macao',
    alpha2Code: 'MO',
    callingCode: '853',
  },
  {
    flag: require('@/Assets/Flags/mk.png'),
    name: 'Macedonia (the former Yugoslav Republic of)',
    alpha2Code: 'MK',
    callingCode: '389',
  },
  {
    flag: require('@/Assets/Flags/mg.png'),
    name: 'Madagascar',
    alpha2Code: 'MG',
    callingCode: '261',
  },
  {
    flag: require('@/Assets/Flags/mw.png'),
    name: 'Malawi',
    alpha2Code: 'MW',
    callingCode: '265',
  },
  {
    flag: require('@/Assets/Flags/my.png'),
    name: 'Malaysia',
    alpha2Code: 'MY',
    callingCode: '60',
  },
  {
    flag: require('@/Assets/Flags/mv.png'),
    name: 'Maldives',
    alpha2Code: 'MV',
    callingCode: '960',
  },
  {
    flag: require('@/Assets/Flags/ml.png'),
    name: 'Mali',
    alpha2Code: 'ML',
    callingCode: '223',
  },
  {
    flag: require('@/Assets/Flags/mt.png'),
    name: 'Malta',
    alpha2Code: 'MT',
    callingCode: '356',
  },
  {
    flag: require('@/Assets/Flags/mh.png'),
    name: 'Marshall Islands',
    alpha2Code: 'MH',
    callingCode: '692',
  },
  {
    flag: require('@/Assets/Flags/mq.png'),
    name: 'Martinique',
    alpha2Code: 'MQ',
    callingCode: '596',
  },
  {
    flag: require('@/Assets/Flags/mr.png'),
    name: 'Mauritania',
    alpha2Code: 'MR',
    callingCode: '222',
  },
  {
    flag: require('@/Assets/Flags/mu.png'),
    name: 'Mauritius',
    alpha2Code: 'MU',
    callingCode: '230',
  },
  {
    flag: require('@/Assets/Flags/yt.png'),
    name: 'Mayotte',
    alpha2Code: 'YT',
    callingCode: '262',
  },
  {
    flag: require('@/Assets/Flags/mx.png'),
    name: 'Mexico',
    alpha2Code: 'MX',
    callingCode: '52',
  },
  {
    flag: require('@/Assets/Flags/fm.png'),
    name: 'Micronesia (Federated States of)',
    alpha2Code: 'FM',
    callingCode: '691',
  },
  {
    flag: require('@/Assets/Flags/md.png'),
    name: 'Moldova (Republic of)',
    alpha2Code: 'MD',
    callingCode: '373',
  },
  {
    flag: require('@/Assets/Flags/mc.png'),
    name: 'Monaco',
    alpha2Code: 'MC',
    callingCode: '377',
  },
  {
    flag: require('@/Assets/Flags/mn.png'),
    name: 'Mongolia',
    alpha2Code: 'MN',
    callingCode: '976',
  },
  {
    flag: require('@/Assets/Flags/me.png'),
    name: 'Montenegro',
    alpha2Code: 'ME',
    callingCode: '382',
  },
  {
    flag: require('@/Assets/Flags/ms.png'),
    name: 'Montserrat',
    alpha2Code: 'MS',
    callingCode: '1664',
  },
  {
    flag: require('@/Assets/Flags/ma.png'),
    name: 'Morocco',
    alpha2Code: 'MA',
    callingCode: '212',
  },
  {
    flag: require('@/Assets/Flags/mz.png'),
    name: 'Mozambique',
    alpha2Code: 'MZ',
    callingCode: '258',
  },
  {
    flag: require('@/Assets/Flags/mm.png'),
    name: 'Myanmar',
    alpha2Code: 'MM',
    callingCode: '95',
  },
  {
    flag: require('@/Assets/Flags/na.png'),
    name: 'Namibia',
    alpha2Code: 'NA',
    callingCode: '264',
  },
  {
    flag: require('@/Assets/Flags/nr.png'),
    name: 'Nauru',
    alpha2Code: 'NR',
    callingCode: '674',
  },
  {
    flag: require('@/Assets/Flags/np.png'),
    name: 'Nepal',
    alpha2Code: 'NP',
    callingCode: '977',
  },
  {
    flag: require('@/Assets/Flags/nl.png'),
    name: 'Netherlands',
    alpha2Code: 'NL',
    callingCode: '31',
  },
  {
    flag: require('@/Assets/Flags/nc.png'),
    name: 'New Caledonia',
    alpha2Code: 'NC',
    callingCode: '687',
  },
  {
    flag: require('@/Assets/Flags/nz.png'),
    name: 'New Zealand',
    alpha2Code: 'NZ',
    callingCode: '64',
  },
  {
    flag: require('@/Assets/Flags/ni.png'),
    name: 'Nicaragua',
    alpha2Code: 'NI',
    callingCode: '505',
  },
  {
    flag: require('@/Assets/Flags/ne.png'),
    name: 'Niger',
    alpha2Code: 'NE',
    callingCode: '227',
  },
  {
    flag: require('@/Assets/Flags/ng.png'),
    name: 'Nigeria',
    alpha2Code: 'NG',
    callingCode: '234',
  },
  {
    flag: require('@/Assets/Flags/nu.png'),
    name: 'Niue',
    alpha2Code: 'NU',
    callingCode: '683',
  },
  {
    flag: require('@/Assets/Flags/nf.png'),
    name: 'Norfolk Island',
    alpha2Code: 'NF',
    callingCode: '672',
  },
  {
    flag: require('@/Assets/Flags/kp.png'),
    name: "Korea (Democratic People's Republic of)",
    alpha2Code: 'KP',
    callingCode: '850',
  },
  {
    flag: require('@/Assets/Flags/mp.png'),
    name: 'Northern Mariana Islands',
    alpha2Code: 'MP',
    callingCode: '1670',
  },
  {
    flag: require('@/Assets/Flags/no.png'),
    name: 'Norway',
    alpha2Code: 'NO',
    callingCode: '47',
  },
  {
    flag: require('@/Assets/Flags/om.png'),
    name: 'Oman',
    alpha2Code: 'OM',
    callingCode: '968',
  },
  {
    flag: require('@/Assets/Flags/pk.png'),
    name: 'Pakistan',
    alpha2Code: 'PK',
    callingCode: '92',
  },
  {
    flag: require('@/Assets/Flags/pw.png'),
    name: 'Palau',
    alpha2Code: 'PW',
    callingCode: '680',
  },
  {
    flag: require('@/Assets/Flags/ps.png'),
    name: 'Palestine, State of',
    alpha2Code: 'PS',
    callingCode: '970',
  },
  {
    flag: require('@/Assets/Flags/pa.png'),
    name: 'Panama',
    alpha2Code: 'PA',
    callingCode: '507',
  },
  {
    flag: require('@/Assets/Flags/pg.png'),
    name: 'Papua New Guinea',
    alpha2Code: 'PG',
    callingCode: '675',
  },
  {
    flag: require('@/Assets/Flags/py.png'),
    name: 'Paraguay',
    alpha2Code: 'PY',
    callingCode: '595',
  },
  {
    flag: require('@/Assets/Flags/pe.png'),
    name: 'Peru',
    alpha2Code: 'PE',
    callingCode: '51',
  },
  {
    flag: require('@/Assets/Flags/ph.png'),
    name: 'Philippines',
    alpha2Code: 'PH',
    callingCode: '63',
  },
  {
    flag: require('@/Assets/Flags/pn.png'),
    name: 'Pitcairn',
    alpha2Code: 'PN',
    callingCode: '64',
  },
  {
    flag: require('@/Assets/Flags/pl.png'),
    name: 'Poland',
    alpha2Code: 'PL',
    callingCode: '48',
  },
  {
    flag: require('@/Assets/Flags/pt.png'),
    name: 'Portugal',
    alpha2Code: 'PT',
    callingCode: '351',
  },
  {
    flag: require('@/Assets/Flags/pr.png'),
    name: 'Puerto Rico',
    alpha2Code: 'PR',
    callingCode: '1787',
  },
  {
    flag: require('@/Assets/Flags/qa.png'),
    name: 'Qatar',
    alpha2Code: 'QA',
    callingCode: '974',
  },
  {
    flag: require('@/Assets/Flags/xk.png'),
    name: 'Republic of Kosovo',
    alpha2Code: 'XK',
    callingCode: '383',
  },
  {
    flag: require('@/Assets/Flags/re.png'),
    name: 'Réunion',
    alpha2Code: 'RE',
    callingCode: '262',
  },
  {
    flag: require('@/Assets/Flags/ro.png'),
    name: 'Romania',
    alpha2Code: 'RO',
    callingCode: '40',
  },
  {
    flag: require('@/Assets/Flags/ru.png'),
    name: 'Russian Federation',
    alpha2Code: 'RU',
    callingCode: '7',
  },
  {
    flag: require('@/Assets/Flags/rw.png'),
    name: 'Rwanda',
    alpha2Code: 'RW',
    callingCode: '250',
  },
  {
    flag: require('@/Assets/Flags/bl.png'),
    name: 'Saint Barthélemy',
    alpha2Code: 'BL',
    callingCode: '590',
  },
  {
    flag: require('@/Assets/Flags/sh.png'),
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    alpha2Code: 'SH',
    callingCode: '290',
  },
  {
    flag: require('@/Assets/Flags/kn.png'),
    name: 'Saint Kitts and Nevis',
    alpha2Code: 'KN',
    callingCode: '1869',
  },
  {
    flag: require('@/Assets/Flags/lc.png'),
    name: 'Saint Lucia',
    alpha2Code: 'LC',
    callingCode: '1758',
  },
  {
    flag: require('@/Assets/Flags/mf.png'),
    name: 'Saint Martin (French part)',
    alpha2Code: 'MF',
    callingCode: '590',
  },
  {
    flag: require('@/Assets/Flags/pm.png'),
    name: 'Saint Pierre and Miquelon',
    alpha2Code: 'PM',
    callingCode: '508',
  },
  {
    flag: require('@/Assets/Flags/vc.png'),
    name: 'Saint Vincent and the Grenadines',
    alpha2Code: 'VC',
    callingCode: '1784',
  },
  {
    flag: require('@/Assets/Flags/ws.png'),
    name: 'Samoa',
    alpha2Code: 'WS',
    callingCode: '685',
  },
  {
    flag: require('@/Assets/Flags/sm.png'),
    name: 'San Marino',
    alpha2Code: 'SM',
    callingCode: '378',
  },
  {
    flag: require('@/Assets/Flags/st.png'),
    name: 'Sao Tome and Principe',
    alpha2Code: 'ST',
    callingCode: '239',
  },
  {
    flag: require('@/Assets/Flags/sa.png'),
    name: 'Saudi Arabia',
    alpha2Code: 'SA',
    callingCode: '966',
  },
  {
    flag: require('@/Assets/Flags/sn.png'),
    name: 'Senegal',
    alpha2Code: 'SN',
    callingCode: '221',
  },
  {
    flag: require('@/Assets/Flags/rs.png'),
    name: 'Serbia',
    alpha2Code: 'RS',
    callingCode: '381',
  },
  {
    flag: require('@/Assets/Flags/sc.png'),
    name: 'Seychelles',
    alpha2Code: 'SC',
    callingCode: '248',
  },
  {
    flag: require('@/Assets/Flags/sl.png'),
    name: 'Sierra Leone',
    alpha2Code: 'SL',
    callingCode: '232',
  },
  {
    flag: require('@/Assets/Flags/sg.png'),
    name: 'Singapore',
    alpha2Code: 'SG',
    callingCode: '65',
  },
  {
    flag: require('@/Assets/Flags/sx.png'),
    name: 'Sint Maarten (Dutch part)',
    alpha2Code: 'SX',
    callingCode: '1721',
  },
  {
    flag: require('@/Assets/Flags/sk.png'),
    name: 'Slovakia',
    alpha2Code: 'SK',
    callingCode: '421',
  },
  {
    flag: require('@/Assets/Flags/si.png'),
    name: 'Slovenia',
    alpha2Code: 'SI',
    callingCode: '386',
  },
  {
    flag: require('@/Assets/Flags/sb.png'),
    name: 'Solomon Islands',
    alpha2Code: 'SB',
    callingCode: '677',
  },
  {
    flag: require('@/Assets/Flags/so.png'),
    name: 'Somalia',
    alpha2Code: 'SO',
    callingCode: '252',
  },
  {
    flag: require('@/Assets/Flags/za.png'),
    name: 'South Africa',
    alpha2Code: 'ZA',
    callingCode: '27',
  },
  {
    flag: require('@/Assets/Flags/gs.png'),
    name: 'South Georgia and the South Sandwich Islands',
    alpha2Code: 'GS',
    callingCode: '500',
  },
  {
    flag: require('@/Assets/Flags/kr.png'),
    name: 'Korea (Republic of)',
    alpha2Code: 'KR',
    callingCode: '82',
  },
  {
    flag: require('@/Assets/Flags/ss.png'),
    name: 'South Sudan',
    alpha2Code: 'SS',
    callingCode: '211',
  },
  {
    flag: require('@/Assets/Flags/es.png'),
    name: 'Spain',
    alpha2Code: 'ES',
    callingCode: '34',
  },
  {
    flag: require('@/Assets/Flags/lk.png'),
    name: 'Sri Lanka',
    alpha2Code: 'LK',
    callingCode: '94',
  },
  {
    flag: require('@/Assets/Flags/sd.png'),
    name: 'Sudan',
    alpha2Code: 'SD',
    callingCode: '249',
  },
  {
    flag: require('@/Assets/Flags/sr.png'),
    name: 'Suriname',
    alpha2Code: 'SR',
    callingCode: '597',
  },
  {
    flag: require('@/Assets/Flags/sj.png'),
    name: 'Svalbard and Jan Mayen',
    alpha2Code: 'SJ',
    callingCode: '4779',
  },
  {
    flag: require('@/Assets/Flags/sz.png'),
    name: 'Swaziland',
    alpha2Code: 'SZ',
    callingCode: '268',
  },
  {
    flag: require('@/Assets/Flags/se.png'),
    name: 'Sweden',
    alpha2Code: 'SE',
    callingCode: '46',
  },
  {
    flag: require('@/Assets/Flags/ch.png'),
    name: 'Switzerland',
    alpha2Code: 'CH',
    callingCode: '41',
  },
  {
    flag: require('@/Assets/Flags/sy.png'),
    name: 'Syrian Arab Republic',
    alpha2Code: 'SY',
    callingCode: '963',
  },
  {
    flag: require('@/Assets/Flags/tw.png'),
    name: 'Taiwan',
    alpha2Code: 'TW',
    callingCode: '886',
  },
  {
    flag: require('@/Assets/Flags/tj.png'),
    name: 'Tajikistan',
    alpha2Code: 'TJ',
    callingCode: '992',
  },
  {
    flag: require('@/Assets/Flags/tz.png'),
    name: 'Tanzania, United Republic of',
    alpha2Code: 'TZ',
    callingCode: '255',
  },
  {
    flag: require('@/Assets/Flags/th.png'),
    name: 'Thailand',
    alpha2Code: 'TH',
    callingCode: '66',
  },
  {
    flag: require('@/Assets/Flags/tl.png'),
    name: 'Timor-Leste',
    alpha2Code: 'TL',
    callingCode: '670',
  },
  {
    flag: require('@/Assets/Flags/tg.png'),
    name: 'Togo',
    alpha2Code: 'TG',
    callingCode: '228',
  },
  {
    flag: require('@/Assets/Flags/tk.png'),
    name: 'Tokelau',
    alpha2Code: 'TK',
    callingCode: '690',
  },
  {
    flag: require('@/Assets/Flags/to.png'),
    name: 'Tonga',
    alpha2Code: 'TO',
    callingCode: '676',
  },
  {
    flag: require('@/Assets/Flags/tt.png'),
    name: 'Trinidad and Tobago',
    alpha2Code: 'TT',
    callingCode: '1868',
  },
  {
    flag: require('@/Assets/Flags/tn.png'),
    name: 'Tunisia',
    alpha2Code: 'TN',
    callingCode: '216',
  },
  {
    flag: require('@/Assets/Flags/tr.png'),
    name: 'Turkey',
    alpha2Code: 'TR',
    callingCode: '90',
  },
  {
    flag: require('@/Assets/Flags/tm.png'),
    name: 'Turkmenistan',
    alpha2Code: 'TM',
    callingCode: '993',
  },
  {
    flag: require('@/Assets/Flags/tc.png'),
    name: 'Turks and Caicos Islands',
    alpha2Code: 'TC',
    callingCode: '1649',
  },
  {
    flag: require('@/Assets/Flags/tv.png'),
    name: 'Tuvalu',
    alpha2Code: 'TV',
    callingCode: '688',
  },
  {
    flag: require('@/Assets/Flags/ug.png'),
    name: 'Uganda',
    alpha2Code: 'UG',
    callingCode: '256',
  },
  {
    flag: require('@/Assets/Flags/ua.png'),
    name: 'Ukraine',
    alpha2Code: 'UA',
    callingCode: '380',
  },
  {
    flag: require('@/Assets/Flags/ae.png'),
    name: 'United Arab Emirates',
    alpha2Code: 'AE',
    callingCode: '971',
  },
  {
    flag: require('@/Assets/Flags/gb.png'),
    name: 'United Kingdom of Great Britain and Northern Ireland',
    alpha2Code: 'GB',
    callingCode: '44',
  },
  {
    flag: require('@/Assets/Flags/us.png'),
    name: 'United States of America',
    alpha2Code: 'US',
    callingCode: '1',
  },
  {
    flag: require('@/Assets/Flags/uy.png'),
    name: 'Uruguay',
    alpha2Code: 'UY',
    callingCode: '598',
  },
  {
    flag: require('@/Assets/Flags/uz.png'),
    name: 'Uzbekistan',
    alpha2Code: 'UZ',
    callingCode: '998',
  },
  {
    flag: require('@/Assets/Flags/vu.png'),
    name: 'Vanuatu',
    alpha2Code: 'VU',
    callingCode: '678',
  },
  {
    flag: require('@/Assets/Flags/ve.png'),
    name: 'Venezuela (Bolivarian Republic of)',
    alpha2Code: 'VE',
    callingCode: '58',
  },
  {
    flag: require('@/Assets/Flags/vn.png'),
    name: 'Viet Nam',
    alpha2Code: 'VN',
    callingCode: '84',
  },
  {
    flag: require('@/Assets/Flags/wf.png'),
    name: 'Wallis and Futuna',
    alpha2Code: 'WF',
    callingCode: '681',
  },
  {
    flag: require('@/Assets/Flags/eh.png'),
    name: 'Western Sahara',
    alpha2Code: 'EH',
    callingCode: '212',
  },
  {
    flag: require('@/Assets/Flags/ye.png'),
    name: 'Yemen',
    alpha2Code: 'YE',
    callingCode: '967',
  },
  {
    flag: require('@/Assets/Flags/zm.png'),
    name: 'Zambia',
    alpha2Code: 'ZM',
    callingCode: '260',
  },
  {
    flag: require('@/Assets/Flags/zw.png'),
    name: 'Zimbabwe',
    alpha2Code: 'ZW',
    callingCode: '263',
  },
];



const CustomSelectCountry = ({ height, value, onValueChange, flexValue }) => {
  const { Layout, Images } = useTheme()

  const [isFocus, setIsFocus] = useState(false);
  const [callingCode, setCallingCode] = useState('61');

  useEffect(() => {
    if (!isUndefined(value) && !isEmpty(value)) {
      setCallingCode(value)
    }
  }, [value])

  return (
    <View style={{ height: Responsive.height(50), flexDirection: 'row', flex: flexValue }}>
      <SelectCountry
        style={[styles.dropdown, isFocus && { borderColor: '#B2C249' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={countries}
        fontFamily={'NewJune'}
        search
        maxHeight={300}
        valueField="callingCode"
        labelField="name"
        displayField="flag"
        imageField="flag"
        type="image"
        placeholder="Select country"
        searchPlaceholder="Search..."
        value={callingCode}
        containerStyle={styles.concainerDropdown}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onValueChange(item.callingCode);
          setCallingCode(item.callingCode)
          setIsFocus(false);
        }}
      />
      <View style={{ flex: 1 }} />
      <TextInput
        editable={false}
        numberOfLines={1}
        multiline={false}
        ellipsizeMode='tail'
        style={styles.callingCodeStyle}
        value={`+${callingCode}`} />
    </View>
  )
}

CustomSelectCountry.propTypes = {
  flexValue: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.string,
  items: PropTypes.array,
  onValueChange: PropTypes.func
}

CustomSelectCountry.defaultProps = {
  flexValue: 1,
  height: Responsive.height(50),
  value: '',
  items: [],
  onValueChange: (value) => { }
}

export default CustomSelectCountry


const styles = StyleSheet.create({
  container: {
  },
  dropdown: {
    height: Responsive.height(50),
    flex: 1,
    paddingHorizontal: Responsive.height(8),
  },
  concainerDropdown: {
    width: Responsive.width(screenWidth) - Responsive.width(20 * 2)
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F'
  },
  selectedTextStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F'
  },
  inputSearchStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F'
  },
  callingCodeStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F'
  },
});
