const COUNTRYCODES = [
    {
        value: 'AD',
        label: 'ANDORRA',
    },
    {
        value: 'AE',
        label: 'UNITED ARAB EMIRATES',
    },
    {
        value: 'AF',
        label: 'AFGHANISTAN',
    },
    {
        value: 'AG',
        label: 'ANTIGUA AND BARBUDA',
    },
    {
        value: 'AI',
        label: 'ANGUILLA',
    },
    {
        value: 'AL',
        label: 'ALBANIA',
    },
    {
        value: 'AM',
        label: 'ARMENIA',
    },
    {
        value: 'AN',
        label: 'NETHERLANDS ANTILLES',
    },
    {
        value: 'AO',
        label: 'ANGOLA',
    },
    {
        value: 'AQ',
        label: 'ANTARCTICA',
    },
    {
        value: 'AR',
        label: 'ARGENTINA',
    },
    {
        value: 'AS',
        label: 'AMERICAN SAMOA',
    },
    {
        value: 'AT',
        label: 'AUSTRIA',
    },
    {
        value: 'AU',
        label: 'AUSTRALIA',
    },
    {
        value: 'AW',
        label: 'ARUBA',
    },
    {
        value: 'AZ',
        label: 'AZERBAIJAN',
    },
    {
        value: 'BA',
        label: 'BOSNIA AND HERZEGOVINA',
    },
    {
        value: 'BB',
        label: 'BARBADOS',
    },
    {
        value: 'BD',
        label: 'BANGLADESH',
    },
    {
        value: 'BE',
        label: 'BELGIUM',
    },
    {
        value: 'BF',
        label: 'BURKINA FASO',
    },
    {
        value: 'BG',
        label: 'BULGARIA',
    },
    {
        value: 'BH',
        label: 'BAHRAIN',
    },
    {
        value: 'BI',
        label: 'BURUNDI',
    },
    {
        value: 'BJ',
        label: 'BENIN',
    },
    {
        value: 'BL',
        label: 'SAINT BARTHELEMY',
    },
    {
        value: 'BM',
        label: 'BERMUDA',
    },
    {
        value: 'BN',
        label: 'BRUNEI DARUSSALAM',
    },
    {
        value: 'BO',
        label: 'BOLIVIA',
    },
    {
        value: 'BR',
        label: 'BRAZIL',
    },
    {
        value: 'BS',
        label: 'BAHAMAS',
    },
    {
        value: 'BT',
        label: 'BHUTAN',
    },
    {
        value: 'BW',
        label: 'BOTSWANA',
    },
    {
        value: 'BY',
        label: 'BELARUS',
    },
    {
        value: 'BZ',
        label: 'BELIZE',
    },
    {
        value: 'CA',
        label: 'CANADA',
    },
    {
        value: 'CC',
        label: 'COCOS (KEELING) ISLANDS',
    },
    {
        value: 'CD',
        label: 'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
    },
    {
        value: 'CF',
        label: 'CENTRAL AFRICAN REPUBLIC',
    },
    {
        value: 'CG',
        label: 'CONGO',
    },
    {
        value: 'CH',
        label: 'SWITZERLAND',
    },
    {
        value: 'CI',
        label: 'COTE D IVOIRE',
    },
    {
        value: 'CK',
        label: 'COOK ISLANDS',
    },
    {
        value: 'CL',
        label: 'CHILE',
    },
    {
        value: 'CM',
        label: 'CAMEROON',
    },
    {
        value: 'CN',
        label: 'CHINA',
    },
    {
        value: 'CO',
        label: 'COLOMBIA',
    },
    {
        value: 'CR',
        label: 'COSTA RICA',
    },
    {
        value: 'CU',
        label: 'CUBA',
    },
    {
        value: 'CV',
        label: 'CAPE VERDE',
    },
    {
        value: 'CX',
        label: 'CHRISTMAS ISLAND',
    },
    {
        value: 'CY',
        label: 'CYPRUS',
    },
    {
        value: 'CZ',
        label: 'CZECH REPUBLIC',
    },
    {
        value: 'DE',
        label: 'GERMANY',
    },
    {
        value: 'DJ',
        label: 'DJIBOUTI',
    },
    {
        value: 'DK',
        label: 'DENMARK',
    },
    {
        value: 'DM',
        label: 'DOMINICA',
    },
    {
        value: 'DO',
        label: 'DOMINICAN REPUBLIC',
    },
    {
        value: 'DZ',
        label: 'ALGERIA',
    },
    {
        value: 'EC',
        label: 'ECUADOR',
    },
    {
        value: 'EE',
        label: 'ESTONIA',
    },
    {
        value: 'EG',
        label: 'EGYPT',
    },
    {
        value: 'ER',
        label: 'ERITREA',
    },
    {
        value: 'ES',
        label: 'SPAIN',
    },
    {
        value: 'ET',
        label: 'ETHIOPIA',
    },
    {
        value: 'FI',
        label: 'FINLAND',
    },
    {
        value: 'FJ',
        label: 'FIJI',
    },
    {
        value: 'FK',
        label: 'FALKLAND ISLANDS (MALVINAS)',
    },
    {
        value: 'FM',
        label: 'MICRONESIA, FEDERATED STATES OF',
    },
    {
        value: 'FO',
        label: 'FAROE ISLANDS',
    },
    {
        value: 'FR',
        label: 'FRANCE',
    },
    {
        value: 'GA',
        label: 'GABON',
    },
    {
        value: 'GB',
        label: 'UNITED KINGDOM',
    },
    {
        value: 'GD',
        label: 'GRENADA',
    },
    {
        value: 'GE',
        label: 'GEORGIA',
    },
    {
        value: 'GH',
        label: 'GHANA',
    },
    {
        value: 'GI',
        label: 'GIBRALTAR',
    },
    {
        value: 'GL',
        label: 'GREENLAND',
    },
    {
        value: 'GM',
        label: 'GAMBIA',
    },
    {
        value: 'GN',
        label: 'GUINEA',
    },
    {
        value: 'GQ',
        label: 'EQUATORIAL GUINEA',
    },
    {
        value: 'GR',
        label: 'GREECE',
    },
    {
        value: 'GT',
        label: 'GUATEMALA',
    },
    {
        value: 'GU',
        label: 'GUAM',
    },
    {
        value: 'GW',
        label: 'GUINEA-BISSAU',
    },
    {
        value: 'GY',
        label: 'GUYANA',
    },
    {
        value: 'HK',
        label: 'HONG KONG',
    },
    {
        value: 'HN',
        label: 'HONDURAS',
    },
    {
        value: 'HR',
        label: 'CROATIA',
    },
    {
        value: 'HT',
        label: 'HAITI',
    },
    {
        value: 'HU',
        label: 'HUNGARY',
    },
    {
        value: 'ID',
        label: 'INDONESIA',
    },
    {
        value: 'IE',
        label: 'IRELAND',
    },
    {
        value: 'IL',
        label: 'ISRAEL',
    },
    {
        value: 'IM',
        label: 'ISLE OF MAN',
    },
    {
        value: 'IN',
        label: 'INDIA',
    },
    {
        value: 'IQ',
        label: 'IRAQ',
    },
    {
        value: 'IR',
        label: 'IRAN, ISLAMIC REPUBLIC OF',
    },
    {
        value: 'IS',
        label: 'ICELAND',
    },
    {
        value: 'IT',
        label: 'ITALY',
    },
    {
        value: 'JM',
        label: 'JAMAICA',
    },
    {
        value: 'JO',
        label: 'JORDAN',
    },
    {
        value: 'JP',
        label: 'JAPAN',
    },
    {
        value: 'KE',
        label: 'KENYA',
    },
    {
        value: 'KG',
        label: 'KYRGYZSTAN',
    },
    {
        value: 'KH',
        label: 'CAMBODIA',
    },
    {
        value: 'KI',
        label: 'KIRIBATI',
    },
    {
        value: 'KM',
        label: 'COMOROS',
    },
    {
        value: 'KN',
        label: 'SAINT KITTS AND NEVIS',
    },
    {
        value: 'KP',
        label: 'KOREA DEMOCRATIC PEOPLES REPUBLIC OF',
    },
    {
        value: 'KR',
        label: 'KOREA REPUBLIC OF',
    },
    {
        value: 'KW',
        label: 'KUWAIT',
    },
    {
        value: 'KY',
        label: 'CAYMAN ISLANDS',
    },
    {
        value: 'KZ',
        label: 'KAZAKSTAN',
    },
    {
        value: 'LA',
        label: 'LAO PEOPLES DEMOCRATIC REPUBLIC',
    },
    {
        value: 'LB',
        label: 'LEBANON',
    },
    {
        value: 'LC',
        label: 'SAINT LUCIA',
    },
    {
        value: 'LI',
        label: 'LIECHTENSTEIN',
    },
    {
        value: 'LK',
        label: 'SRI LANKA',
    },
    {
        value: 'LR',
        label: 'LIBERIA',
    },
    {
        value: 'LS',
        label: 'LESOTHO',
    },
    {
        value: 'LT',
        label: 'LITHUANIA',
    },
    {
        value: 'LU',
        label: 'LUXEMBOURG',
    },
    {
        value: 'LV',
        label: 'LATVIA',
    },
    {
        value: 'LY',
        label: 'LIBYAN ARAB JAMAHIRIYA',
    },
    {
        value: 'MA',
        label: 'MOROCCO',
    },
    {
        value: 'MC',
        label: 'MONACO',
    },
    {
        value: 'MD',
        label: 'MOLDOVA, REPUBLIC OF',
    },
    {
        value: 'ME',
        label: 'MONTENEGRO',
    },
    {
        value: 'MF',
        label: 'SAINT MARTIN',
    },
    {
        value: 'MG',
        label: 'MADAGASCAR',
    },
    {
        value: 'MH',
        label: 'MARSHALL ISLANDS',
    },
    {
        value: 'MK',
        label: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
    },
    {
        value: 'ML',
        label: 'MALI',
    },
    {
        value: 'MM',
        label: 'MYANMAR',
    },
    {
        value: 'MN',
        label: 'MONGOLIA',
    },
    {
        value: 'MO',
        label: 'MACAU',
    },
    {
        value: 'MP',
        label: 'NORTHERN MARIANA ISLANDS',
    },
    {
        value: 'MR',
        label: 'MAURITANIA',
    },
    {
        value: 'MS',
        label: 'MONTSERRAT',
    },
    {
        value: 'MT',
        label: 'MALTA',
    },
    {
        value: 'MU',
        label: 'MAURITIUS',
    },
    {
        value: 'MV',
        label: 'MALDIVES',
    },
    {
        value: 'MW',
        label: 'MALAWI',
    },
    {
        value: 'MX',
        label: 'MEXICO',
    },
    {
        value: 'MY',
        label: 'MALAYSIA',
    },
    {
        value: 'MZ',
        label: 'MOZAMBIQUE',
    },
    {
        value: 'NA',
        label: 'NAMIBIA',
    },
    {
        value: 'NC',
        label: 'NEW CALEDONIA',
    },
    {
        value: 'NE',
        label: 'NIGER',
    },
    {
        value: 'NG',
        label: 'NIGERIA',
    },
    {
        value: 'NI',
        label: 'NICARAGUA',
    },
    {
        value: 'NL',
        label: 'NETHERLANDS',
    },
    {
        value: 'NO',
        label: 'NORWAY',
    },
    {
        value: 'NP',
        label: 'NEPAL',
    },
    {
        value: 'NR',
        label: 'NAURU',
    },
    {
        value: 'NU',
        label: 'NIUE',
    },
    {
        value: 'NZ',
        label: 'NEW ZEALAND',
    },
    {
        value: 'OM',
        label: 'OMAN',
    },
    {
        value: 'PA',
        label: 'PANAMA',
    },
    {
        value: 'PE',
        label: 'PERU',
    },
    {
        value: 'PF',
        label: 'FRENCH POLYNESIA',
    },
    {
        value: 'PG',
        label: 'PAPUA NEW GUINEA',
    },
    {
        value: 'PH',
        label: 'PHILIPPINES',
    },
    {
        value: 'PK',
        label: 'PAKISTAN',
    },
    {
        value: 'PL',
        label: 'POLAND',
    },
    {
        value: 'PM',
        label: 'SAINT PIERRE AND MIQUELON',
    },
    {
        value: 'PN',
        label: 'PITCAIRN',
    },
    {
        value: 'PR',
        label: 'PUERTO RICO',
    },
    {
        value: 'PT',
        label: 'PORTUGAL',
    },
    {
        value: 'PW',
        label: 'PALAU',
    },
    {
        value: 'PY',
        label: 'PARAGUAY',
    },
    {
        value: 'QA',
        label: 'QATAR',
    },
    {
        value: 'RO',
        label: 'ROMANIA',
    },
    {
        value: 'RS',
        label: 'SERBIA',
    },
    {
        value: 'RU',
        label: 'RUSSIAN FEDERATION',
    },
    {
        value: 'RW',
        label: 'RWANDA',
    },
    {
        value: 'SA',
        label: 'SAUDI ARABIA',
    },
    {
        value: 'SB',
        label: 'SOLOMON ISLANDS',
    },
    {
        value: 'SC',
        label: 'SEYCHELLES',
    },
    {
        value: 'SD',
        label: 'SUDAN',
    },
    {
        value: 'SE',
        label: 'SWEDEN',
    },
    {
        value: 'SG',
        label: 'SINGAPORE',
    },
    {
        value: 'SH',
        label: 'SAINT HELENA',
    },
    {
        value: 'SI',
        label: 'SLOVENIA',
    },
    {
        value: 'SK',
        label: 'SLOVAKIA',
    },
    {
        value: 'SL',
        label: 'SIERRA LEONE',
    },
    {
        value: 'SM',
        label: 'SAN MARINO',
    },
    {
        value: 'SN',
        label: 'SENEGAL',
    },
    {
        value: 'SO',
        label: 'SOMALIA',
    },
    {
        value: 'SR',
        label: 'SURINAME',
    },
    {
        value: 'ST',
        label: 'SAO TOME AND PRINCIPE',
    },
    {
        value: 'SV',
        label: 'EL SALVADOR',
    },
    {
        value: 'SY',
        label: 'SYRIAN ARAB REPUBLIC',
    },
    {
        value: 'SZ',
        label: 'SWAZILAND',
    },
    {
        value: 'TC',
        label: 'TURKS AND CAICOS ISLANDS',
    },
    {
        value: 'TD',
        label: 'CHAD',
    },
    {
        value: 'TG',
        label: 'TOGO',
    },
    {
        value: 'TH',
        label: 'THAILAND',
    },
    {
        value: 'TJ',
        label: 'TAJIKISTAN',
    },
    {
        value: 'TK',
        label: 'TOKELAU',
    },
    {
        value: 'TL',
        label: 'TIMOR-LESTE',
    },
    {
        value: 'TM',
        label: 'TURKMENISTAN',
    },
    {
        value: 'TN',
        label: 'TUNISIA',
    },
    {
        value: 'TO',
        label: 'TONGA',
    },
    {
        value: 'TR',
        label: 'TURKEY',
    },
    {
        value: 'TT',
        label: 'TRINIDAD AND TOBAGO',
    },
    {
        value: 'TV',
        label: 'TUVALU',
    },
    {
        value: 'TW',
        label: 'TAIWAN, PROVINCE OF CHINA',
    },
    {
        value: 'TZ',
        label: 'TANZANIA, UNITED REPUBLIC OF',
    },
    {
        value: 'UA',
        label: 'UKRAINE',
    },
    {
        value: 'UG',
        label: 'UGANDA',
    },
    {
        value: 'US',
        label: 'UNITED STATES',
    },
    {
        value: 'UY',
        label: 'URUGUAY',
    },
    {
        value: 'UZ',
        label: 'UZBEKISTAN',
    },
    {
        value: 'VA',
        label: 'HOLY SEE (VATICAN CITY STATE)',
    },
    {
        value: 'VC',
        label: 'SAINT VINCENT AND THE GRENADINES',
    },
    {
        value: 'VE',
        label: 'VENEZUELA',
    },
    {
        value: 'VG',
        label: 'VIRGIN ISLANDS, BRITISH',
    },
    {
        value: 'VI',
        label: 'VIRGIN ISLANDS, U.S.',
    },
    {
        value: 'VN',
        label: 'VIET NAM',
    },
    {
        value: 'VU',
        label: 'VANUATU',
    },
    {
        value: 'WF',
        label: 'WALLIS AND FUTUNA',
    },
    {
        value: 'WS',
        label: 'SAMOA',
    },
    {
        value: 'XK',
        label: 'KOSOVO',
    },
    {
        value: 'YE',
        label: 'YEMEN',
    },
    {
        value: 'YT',
        label: 'MAYOTTE',
    },
    {
        value: 'ZA',
        label: 'SOUTH AFRICA',
    },
    {
        value: 'ZM',
        label: 'ZAMBIA',
    },
    {
        value: 'ZW',
        label: 'ZIMBABWE',
    },
]

export default COUNTRYCODES
