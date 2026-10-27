const BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
const BASE64_INDEX = new Int32Array([
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  -1,
  -1,
  -1,
  -1,
  -1
]);
const base64_encode = (b, len) => {
  let off = 0, c1, c2;
  let rs = "";
  if (len <= 0 || len > b.length)
    throw Error("Illegal len: " + len);
  while (off < len) {
    c1 = b[off++] & 255;
    rs += BASE64_CODE[c1 >> 2 & 63];
    c1 = (c1 & 3) << 4;
    if (off >= len) {
      rs += BASE64_CODE[c1 & 63];
      break;
    }
    c2 = b[off++] & 255;
    c1 |= c2 >> 4 & 15;
    rs += BASE64_CODE[c1 & 63];
    c1 = (c2 & 15) << 2;
    if (off >= len) {
      rs += BASE64_CODE[c1 & 63];
      break;
    }
    c2 = b[off++] & 255;
    c1 |= c2 >> 6 & 3;
    rs += BASE64_CODE[c1 & 63];
    rs += BASE64_CODE[c2 & 63];
  }
  return rs;
};
const base64_decode = (s, len) => {
  const slen = s.length;
  let rs = "";
  let off = 0, olen = 0, c1, c2, c3, c4, o, code;
  while (off < slen - 1 && olen < len) {
    code = s.charCodeAt(off++);
    c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    code = s.charCodeAt(off++);
    c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c1 == -1 || c2 == -1)
      break;
    o = c1 << 2 >>> 0;
    o |= (c2 & 48) >> 4;
    rs += String.fromCharCode(o);
    if (++olen >= len || off >= slen)
      break;
    code = s.charCodeAt(off++);
    c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c3 == -1)
      break;
    o = (c2 & 15) << 4 >>> 0;
    o |= (c3 & 60) >> 2;
    rs += String.fromCharCode(o);
    if (++olen >= len || off >= slen)
      break;
    code = s.charCodeAt(off++);
    c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    o = (c3 & 3) << 6 >>> 0;
    o |= c4;
    rs += String.fromCharCode(o);
    ++olen;
  }
  const res = new Int32Array(olen);
  for (off = 0; off < olen; off++)
    res[off] = rs[off].charCodeAt(0);
  return res;
};
function utf8Array(value) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(value);
  const int32Array = new Int32Array(uint8Array.byteLength);
  int32Array.set(uint8Array);
  return int32Array;
}
const BCRYPT_SALT_LEN = 16;
const GENSALT_DEFAULT_LOG2_ROUNDS = 10;
const BLOWFISH_NUM_ROUNDS = 16;
const MAX_EXECUTION_TIME = 100;
const P_ORIG = new Int32Array([
  608135816,
  2242054355,
  320440878,
  57701188,
  2752067618,
  698298832,
  137296536,
  3964562569,
  1160258022,
  953160567,
  3193202383,
  887688300,
  3232508343,
  3380367581,
  1065670069,
  3041331479,
  2450970073,
  2306472731
]);
const S_ORIG = new Int32Array([
  3509652390,
  2564797868,
  805139163,
  3491422135,
  3101798381,
  1780907670,
  3128725573,
  4046225305,
  614570311,
  3012652279,
  134345442,
  2240740374,
  1667834072,
  1901547113,
  2757295779,
  4103290238,
  227898511,
  1921955416,
  1904987480,
  2182433518,
  2069144605,
  3260701109,
  2620446009,
  720527379,
  3318853667,
  677414384,
  3393288472,
  3101374703,
  2390351024,
  1614419982,
  1822297739,
  2954791486,
  3608508353,
  3174124327,
  2024746970,
  1432378464,
  3864339955,
  2857741204,
  1464375394,
  1676153920,
  1439316330,
  715854006,
  3033291828,
  289532110,
  2706671279,
  2087905683,
  3018724369,
  1668267050,
  732546397,
  1947742710,
  3462151702,
  2609353502,
  2950085171,
  1814351708,
  2050118529,
  680887927,
  999245976,
  1800124847,
  3300911131,
  1713906067,
  1641548236,
  4213287313,
  1216130144,
  1575780402,
  4018429277,
  3917837745,
  3693486850,
  3949271944,
  596196993,
  3549867205,
  258830323,
  2213823033,
  772490370,
  2760122372,
  1774776394,
  2652871518,
  566650946,
  4142492826,
  1728879713,
  2882767088,
  1783734482,
  3629395816,
  2517608232,
  2874225571,
  1861159788,
  326777828,
  3124490320,
  2130389656,
  2716951837,
  967770486,
  1724537150,
  2185432712,
  2364442137,
  1164943284,
  2105845187,
  998989502,
  3765401048,
  2244026483,
  1075463327,
  1455516326,
  1322494562,
  910128902,
  469688178,
  1117454909,
  936433444,
  3490320968,
  3675253459,
  1240580251,
  122909385,
  2157517691,
  634681816,
  4142456567,
  3825094682,
  3061402683,
  2540495037,
  79693498,
  3249098678,
  1084186820,
  1583128258,
  426386531,
  1761308591,
  1047286709,
  322548459,
  995290223,
  1845252383,
  2603652396,
  3431023940,
  2942221577,
  3202600964,
  3727903485,
  1712269319,
  422464435,
  3234572375,
  1170764815,
  3523960633,
  3117677531,
  1434042557,
  442511882,
  3600875718,
  1076654713,
  1738483198,
  4213154764,
  2393238008,
  3677496056,
  1014306527,
  4251020053,
  793779912,
  2902807211,
  842905082,
  4246964064,
  1395751752,
  1040244610,
  2656851899,
  3396308128,
  445077038,
  3742853595,
  3577915638,
  679411651,
  2892444358,
  2354009459,
  1767581616,
  3150600392,
  3791627101,
  3102740896,
  284835224,
  4246832056,
  1258075500,
  768725851,
  2589189241,
  3069724005,
  3532540348,
  1274779536,
  3789419226,
  2764799539,
  1660621633,
  3471099624,
  4011903706,
  913787905,
  3497959166,
  737222580,
  2514213453,
  2928710040,
  3937242737,
  1804850592,
  3499020752,
  2949064160,
  2386320175,
  2390070455,
  2415321851,
  4061277028,
  2290661394,
  2416832540,
  1336762016,
  1754252060,
  3520065937,
  3014181293,
  791618072,
  3188594551,
  3933548030,
  2332172193,
  3852520463,
  3043980520,
  413987798,
  3465142937,
  3030929376,
  4245938359,
  2093235073,
  3534596313,
  375366246,
  2157278981,
  2479649556,
  555357303,
  3870105701,
  2008414854,
  3344188149,
  4221384143,
  3956125452,
  2067696032,
  3594591187,
  2921233993,
  2428461,
  544322398,
  577241275,
  1471733935,
  610547355,
  4027169054,
  1432588573,
  1507829418,
  2025931657,
  3646575487,
  545086370,
  48609733,
  2200306550,
  1653985193,
  298326376,
  1316178497,
  3007786442,
  2064951626,
  458293330,
  2589141269,
  3591329599,
  3164325604,
  727753846,
  2179363840,
  146436021,
  1461446943,
  4069977195,
  705550613,
  3059967265,
  3887724982,
  4281599278,
  3313849956,
  1404054877,
  2845806497,
  146425753,
  1854211946,
  1266315497,
  3048417604,
  3681880366,
  3289982499,
  290971e4,
  1235738493,
  2632868024,
  2414719590,
  3970600049,
  1771706367,
  1449415276,
  3266420449,
  422970021,
  1963543593,
  2690192192,
  3826793022,
  1062508698,
  1531092325,
  1804592342,
  2583117782,
  2714934279,
  4024971509,
  1294809318,
  4028980673,
  1289560198,
  2221992742,
  1669523910,
  35572830,
  157838143,
  1052438473,
  1016535060,
  1802137761,
  1753167236,
  1386275462,
  3080475397,
  2857371447,
  1040679964,
  2145300060,
  2390574316,
  1461121720,
  2956646967,
  4031777805,
  4028374788,
  33600511,
  2920084762,
  1018524850,
  629373528,
  3691585981,
  3515945977,
  2091462646,
  2486323059,
  586499841,
  988145025,
  935516892,
  3367335476,
  2599673255,
  2839830854,
  265290510,
  3972581182,
  2759138881,
  3795373465,
  1005194799,
  847297441,
  406762289,
  1314163512,
  1332590856,
  1866599683,
  4127851711,
  750260880,
  613907577,
  1450815602,
  3165620655,
  3734664991,
  3650291728,
  3012275730,
  3704569646,
  1427272223,
  778793252,
  1343938022,
  2676280711,
  2052605720,
  1946737175,
  3164576444,
  3914038668,
  3967478842,
  3682934266,
  1661551462,
  3294938066,
  4011595847,
  840292616,
  3712170807,
  616741398,
  312560963,
  711312465,
  1351876610,
  322626781,
  1910503582,
  271666773,
  2175563734,
  1594956187,
  70604529,
  3617834859,
  1007753275,
  1495573769,
  4069517037,
  2549218298,
  2663038764,
  504708206,
  2263041392,
  3941167025,
  2249088522,
  1514023603,
  1998579484,
  1312622330,
  694541497,
  2582060303,
  2151582166,
  1382467621,
  776784248,
  2618340202,
  3323268794,
  2497899128,
  2784771155,
  503983604,
  4076293799,
  907881277,
  423175695,
  432175456,
  1378068232,
  4145222326,
  3954048622,
  3938656102,
  3820766613,
  2793130115,
  2977904593,
  26017576,
  3274890735,
  3194772133,
  1700274565,
  1756076034,
  4006520079,
  3677328699,
  720338349,
  1533947780,
  354530856,
  688349552,
  3973924725,
  1637815568,
  332179504,
  3949051286,
  53804574,
  2852348879,
  3044236432,
  1282449977,
  3583942155,
  3416972820,
  4006381244,
  1617046695,
  2628476075,
  3002303598,
  1686838959,
  431878346,
  2686675385,
  1700445008,
  1080580658,
  1009431731,
  832498133,
  3223435511,
  2605976345,
  2271191193,
  2516031870,
  1648197032,
  4164389018,
  2548247927,
  300782431,
  375919233,
  238389289,
  3353747414,
  2531188641,
  2019080857,
  1475708069,
  455242339,
  2609103871,
  448939670,
  3451063019,
  1395535956,
  2413381860,
  1841049896,
  1491858159,
  885456874,
  4264095073,
  4001119347,
  1565136089,
  3898914787,
  1108368660,
  540939232,
  1173283510,
  2745871338,
  3681308437,
  4207628240,
  3343053890,
  4016749493,
  1699691293,
  1103962373,
  3625875870,
  2256883143,
  3830138730,
  1031889488,
  3479347698,
  1535977030,
  4236805024,
  3251091107,
  2132092099,
  1774941330,
  1199868427,
  1452454533,
  157007616,
  2904115357,
  342012276,
  595725824,
  1480756522,
  206960106,
  497939518,
  591360097,
  863170706,
  2375253569,
  3596610801,
  1814182875,
  2094937945,
  3421402208,
  1082520231,
  3463918190,
  2785509508,
  435703966,
  3908032597,
  1641649973,
  2842273706,
  3305899714,
  1510255612,
  2148256476,
  2655287854,
  3276092548,
  4258621189,
  236887753,
  3681803219,
  274041037,
  1734335097,
  3815195456,
  3317970021,
  1899903192,
  1026095262,
  4050517792,
  356393447,
  2410691914,
  3873677099,
  3682840055,
  3913112168,
  2491498743,
  4132185628,
  2489919796,
  1091903735,
  1979897079,
  3170134830,
  3567386728,
  3557303409,
  857797738,
  1136121015,
  1342202287,
  507115054,
  2535736646,
  337727348,
  3213592640,
  1301675037,
  2528481711,
  1895095763,
  1721773893,
  3216771564,
  62756741,
  2142006736,
  835421444,
  2531993523,
  1442658625,
  3659876326,
  2882144922,
  676362277,
  1392781812,
  170690266,
  3921047035,
  1759253602,
  3611846912,
  1745797284,
  664899054,
  1329594018,
  3901205900,
  3045908486,
  2062866102,
  2865634940,
  3543621612,
  3464012697,
  1080764994,
  553557557,
  3656615353,
  3996768171,
  991055499,
  499776247,
  1265440854,
  648242737,
  3940784050,
  980351604,
  3713745714,
  1749149687,
  3396870395,
  4211799374,
  3640570775,
  1161844396,
  3125318951,
  1431517754,
  545492359,
  4268468663,
  3499529547,
  1437099964,
  2702547544,
  3433638243,
  2581715763,
  2787789398,
  1060185593,
  1593081372,
  2418618748,
  4260947970,
  69676912,
  2159744348,
  86519011,
  2512459080,
  3838209314,
  1220612927,
  3339683548,
  133810670,
  1090789135,
  1078426020,
  1569222167,
  845107691,
  3583754449,
  4072456591,
  1091646820,
  628848692,
  1613405280,
  3757631651,
  526609435,
  236106946,
  48312990,
  2942717905,
  3402727701,
  1797494240,
  859738849,
  992217954,
  4005476642,
  2243076622,
  3870952857,
  3732016268,
  765654824,
  3490871365,
  2511836413,
  1685915746,
  3888969200,
  1414112111,
  2273134842,
  3281911079,
  4080962846,
  172450625,
  2569994100,
  980381355,
  4109958455,
  2819808352,
  2716589560,
  2568741196,
  3681446669,
  3329971472,
  1835478071,
  660984891,
  3704678404,
  4045999559,
  3422617507,
  3040415634,
  1762651403,
  1719377915,
  3470491036,
  2693910283,
  3642056355,
  3138596744,
  1364962596,
  2073328063,
  1983633131,
  926494387,
  3423689081,
  2150032023,
  4096667949,
  1749200295,
  3328846651,
  309677260,
  2016342300,
  1779581495,
  3079819751,
  111262694,
  1274766160,
  443224088,
  298511866,
  1025883608,
  3806446537,
  1145181785,
  168956806,
  3641502830,
  3584813610,
  1689216846,
  3666258015,
  3200248200,
  1692713982,
  2646376535,
  4042768518,
  1618508792,
  1610833997,
  3523052358,
  4130873264,
  2001055236,
  3610705100,
  2202168115,
  4028541809,
  2961195399,
  1006657119,
  2006996926,
  3186142756,
  1430667929,
  3210227297,
  1314452623,
  4074634658,
  4101304120,
  2273951170,
  1399257539,
  3367210612,
  3027628629,
  1190975929,
  2062231137,
  2333990788,
  2221543033,
  2438960610,
  1181637006,
  548689776,
  2362791313,
  3372408396,
  3104550113,
  3145860560,
  296247880,
  1970579870,
  3078560182,
  3769228297,
  1714227617,
  3291629107,
  3898220290,
  166772364,
  1251581989,
  493813264,
  448347421,
  195405023,
  2709975567,
  677966185,
  3703036547,
  1463355134,
  2715995803,
  1338867538,
  1343315457,
  2802222074,
  2684532164,
  233230375,
  2599980071,
  2000651841,
  3277868038,
  1638401717,
  4028070440,
  3237316320,
  6314154,
  819756386,
  300326615,
  590932579,
  1405279636,
  3267499572,
  3150704214,
  2428286686,
  3959192993,
  3461946742,
  1862657033,
  1266418056,
  963775037,
  2089974820,
  2263052895,
  1917689273,
  448879540,
  3550394620,
  3981727096,
  150775221,
  3627908307,
  1303187396,
  508620638,
  2975983352,
  2726630617,
  1817252668,
  1876281319,
  1457606340,
  908771278,
  3720792119,
  3617206836,
  2455994898,
  1729034894,
  1080033504,
  976866871,
  3556439503,
  2881648439,
  1522871579,
  1555064734,
  1336096578,
  3548522304,
  2579274686,
  3574697629,
  3205460757,
  3593280638,
  3338716283,
  3079412587,
  564236357,
  2993598910,
  1781952180,
  1464380207,
  3163844217,
  3332601554,
  1699332808,
  1393555694,
  1183702653,
  3581086237,
  1288719814,
  691649499,
  2847557200,
  2895455976,
  3193889540,
  2717570544,
  1781354906,
  1676643554,
  2592534050,
  3230253752,
  1126444790,
  2770207658,
  2633158820,
  2210423226,
  2615765581,
  2414155088,
  3127139286,
  673620729,
  2805611233,
  1269405062,
  4015350505,
  3341807571,
  4149409754,
  1057255273,
  2012875353,
  2162469141,
  2276492801,
  2601117357,
  993977747,
  3918593370,
  2654263191,
  753973209,
  36408145,
  2530585658,
  25011837,
  3520020182,
  2088578344,
  530523599,
  2918365339,
  1524020338,
  1518925132,
  3760827505,
  3759777254,
  1202760957,
  3985898139,
  3906192525,
  674977740,
  4174734889,
  2031300136,
  2019492241,
  3983892565,
  4153806404,
  3822280332,
  352677332,
  2297720250,
  60907813,
  90501309,
  3286998549,
  1016092578,
  2535922412,
  2839152426,
  457141659,
  509813237,
  4120667899,
  652014361,
  1966332200,
  2975202805,
  55981186,
  2327461051,
  676427537,
  3255491064,
  2882294119,
  3433927263,
  1307055953,
  942726286,
  933058658,
  2468411793,
  3933900994,
  4215176142,
  1361170020,
  2001714738,
  2830558078,
  3274259782,
  1222529897,
  1679025792,
  2729314320,
  3714953764,
  1770335741,
  151462246,
  3013232138,
  1682292957,
  1483529935,
  471910574,
  1539241949,
  458788160,
  3436315007,
  1807016891,
  3718408830,
  978976581,
  1043663428,
  3165965781,
  1927990952,
  4200891579,
  2372276910,
  3208408903,
  3533431907,
  1412390302,
  2931980059,
  4132332400,
  1947078029,
  3881505623,
  4168226417,
  2941484381,
  1077988104,
  1320477388,
  886195818,
  18198404,
  3786409e3,
  2509781533,
  112762804,
  3463356488,
  1866414978,
  891333506,
  18488651,
  661792760,
  1628790961,
  3885187036,
  3141171499,
  876946877,
  2693282273,
  1372485963,
  791857591,
  2686433993,
  3759982718,
  3167212022,
  3472953795,
  2716379847,
  445679433,
  3561995674,
  3504004811,
  3574258232,
  54117162,
  3331405415,
  2381918588,
  3769707343,
  4154350007,
  1140177722,
  4074052095,
  668550556,
  3214352940,
  367459370,
  261225585,
  2610173221,
  4209349473,
  3468074219,
  3265815641,
  314222801,
  3066103646,
  3808782860,
  282218597,
  3406013506,
  3773591054,
  379116347,
  1285071038,
  846784868,
  2669647154,
  3771962079,
  3550491691,
  2305946142,
  453669953,
  1268987020,
  3317592352,
  3279303384,
  3744833421,
  2610507566,
  3859509063,
  266596637,
  3847019092,
  517658769,
  3462560207,
  3443424879,
  370717030,
  4247526661,
  2224018117,
  4143653529,
  4112773975,
  2788324899,
  2477274417,
  1456262402,
  2901442914,
  1517677493,
  1846949527,
  2295493580,
  3734397586,
  2176403920,
  1280348187,
  1908823572,
  3871786941,
  846861322,
  1172426758,
  3287448474,
  3383383037,
  1655181056,
  3139813346,
  901632758,
  1897031941,
  2986607138,
  3066810236,
  3447102507,
  1393639104,
  373351379,
  950779232,
  625454576,
  3124240540,
  4148612726,
  2007998917,
  544563296,
  2244738638,
  2330496472,
  2058025392,
  1291430526,
  424198748,
  50039436,
  29584100,
  3605783033,
  2429876329,
  2791104160,
  1057563949,
  3255363231,
  3075367218,
  3463963227,
  1469046755,
  985887462
]);
const C_ORIG = new Int32Array([
  1332899944,
  1700884034,
  1701343084,
  1684370003,
  1668446532,
  1869963892
]);
const _encipher = (lr, off, P, S) => {
  let n, l = lr[off], r = lr[off + 1];
  l ^= P[0];
  for (let i = 0, k = BLOWFISH_NUM_ROUNDS - 2; i <= k; )
    n = S[l >>> 24], n += S[256 | l >> 16 & 255], n ^= S[512 | l >> 8 & 255], n += S[768 | l & 255], r ^= n ^ P[++i], // Feistel substitution on right word
    n = S[r >>> 24], n += S[256 | r >> 16 & 255], n ^= S[512 | r >> 8 & 255], n += S[768 | r & 255], l ^= n ^ P[++i];
  lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
  lr[off + 1] = l;
  return lr;
};
const _streamtoword = (data, offp) => {
  for (var i = 0, word = 0; i < 4; ++i)
    word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
  return { key: word, offp };
};
const _key = (key, P, S) => {
  const plen = P.length;
  const slen = S.length;
  let offset = 0, lr = new Int32Array([0, 0]), sw;
  for (var i = 0; i < plen; i++)
    sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
  for (i = 0; i < plen; i += 2)
    lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
  for (i = 0; i < slen; i += 2)
    lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
};
const _ekskey = (data, key, P, S) => {
  const plen = P.length;
  const slen = S.length;
  let offp = 0, lr = new Int32Array([0, 0]), sw;
  for (var i = 0; i < plen; i++)
    sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
  offp = 0;
  for (i = 0; i < plen; i += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
  for (i = 0; i < slen; i += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
};
const _crypt = (b, salt, rounds) => {
  const cdata = C_ORIG.slice(), clen = cdata.length;
  let err;
  if (rounds < 4 || rounds > 31) {
    err = Error("Illegal number of rounds (4-31): " + rounds);
    throw err;
  }
  if (salt.length !== BCRYPT_SALT_LEN) {
    err = Error(
      "Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN
    );
    throw err;
  }
  rounds = 1 << rounds >>> 0;
  const P = new Int32Array(P_ORIG), S = new Int32Array(S_ORIG);
  let i = 0, j;
  _ekskey(salt, b, P, S);
  function next() {
    if (i < rounds) {
      const start = Date.now();
      for (; i < rounds; ) {
        i = i + 1;
        _key(b, P, S);
        _key(salt, P, S);
        if (Date.now() - start > MAX_EXECUTION_TIME)
          break;
      }
    } else {
      for (i = 0; i < 64; i++)
        for (j = 0; j < clen >> 1; j++)
          _encipher(cdata, j << 1, P, S);
      const ret = new Int32Array(clen * 4);
      for (i = 0; i < clen; i++) {
        const baseIndex = i * 4;
        ret[baseIndex] = (cdata[i] >> 24 & 255) >>> 0;
        ret[baseIndex + 1] = (cdata[i] >> 16 & 255) >>> 0;
        ret[baseIndex + 2] = (cdata[i] >> 8 & 255) >>> 0;
        ret[baseIndex + 3] = (cdata[i] & 255) >>> 0;
      }
      return ret;
    }
  }
  let res;
  while (true)
    if (typeof (res = next()) !== "undefined")
      return res || [];
};
const _hash = (s, salt) => {
  let err;
  if (typeof s !== "string" || typeof salt !== "string") {
    err = Error("Invalid string / salt: Not a string");
    throw err;
  }
  let minor, offset;
  if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
    err = Error("Invalid salt version: " + salt.substring(0, 2));
    throw err;
  }
  if (salt.charAt(2) === "$")
    minor = String.fromCharCode(0), offset = 3;
  else {
    minor = salt.charAt(2);
    if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
      err = Error("Invalid salt revision: " + salt.substring(2, 4));
      throw err;
    }
    offset = 4;
  }
  if (salt.charAt(offset + 2) > "$") {
    err = Error("Missing salt rounds");
    throw err;
  }
  const r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
  s += minor >= "a" ? "\0" : "";
  const passwordb = utf8Array(s), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
  const finish = (bytes) => {
    let res = "";
    res += "$2";
    if (minor >= "a")
      res += minor;
    res += "$";
    if (rounds < 10)
      res += "0";
    res += rounds.toString();
    res += "$";
    res += base64_encode(saltb, saltb.length);
    res += base64_encode(bytes, C_ORIG.length * 4 - 1);
    return res;
  };
  return finish(_crypt(passwordb, saltb, rounds));
};
const getRandomValues = (length) => {
  const buffer = new Int32Array(length);
  return crypto.getRandomValues(buffer);
};
const genSaltSync = (rounds) => {
  rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
  if (rounds < 4)
    rounds = 4;
  else if (rounds > 31)
    rounds = 31;
  let salt = "";
  salt += "$2a$";
  if (rounds < 10)
    salt += "0";
  salt += rounds.toString();
  salt += "$";
  salt += base64_encode(getRandomValues(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN);
  return salt;
};
const hashSync = (value, salt) => {
  if (typeof salt === "undefined")
    salt = GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof salt === "number")
    salt = genSaltSync(salt);
  if (typeof value !== "string" || typeof salt !== "string")
    throw Error("Illegal arguments: " + typeof value + ", " + typeof salt);
  return _hash(value, salt);
};
const safeStringCompare = (known, unknown) => {
  let diff = known.length ^ unknown.length;
  for (let i = 0; i < known.length; ++i) {
    diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
  }
  return diff === 0;
};
const compareSync = (value, hash) => {
  if (typeof value !== "string" || typeof hash !== "string")
    throw Error("Illegal arguments: " + typeof value + ", " + typeof hash);
  if (hash.length !== 60)
    return false;
  return safeStringCompare(
    hashSync(value, hash.substring(0, hash.length - 31)),
    hash
  );
};
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
class NavigationAPI {
  db;
  authEnabled;
  username;
  passwordConfig;
  // 支持明文密码或 bcrypt 哈希
  secret;
  constructor(env) {
    this.db = env.DB;
    this.authEnabled = env.AUTH_ENABLED === "true";
    this.username = env.AUTH_USERNAME || "";
    this.passwordConfig = env.AUTH_PASSWORD?.trim() || "";
    this.secret = env.AUTH_SECRET || "DefaultSecretKey";
  }
  getPasswordMode() {
    if (!this.passwordConfig) {
      return "missing";
    }
    if (BCRYPT_HASH_PATTERN.test(this.passwordConfig)) {
      return "bcrypt";
    }
    if (this.passwordConfig.startsWith("$2")) {
      return "invalid-bcrypt";
    }
    return "plaintext";
  }
  verifyConfiguredPassword(password) {
    const passwordMode = this.getPasswordMode();
    if (passwordMode === "bcrypt") {
      return compareSync(password, this.passwordConfig);
    }
    if (passwordMode === "plaintext") {
      return password === this.passwordConfig;
    }
    return false;
  }
  // 初始化数据库表
  // 修改initDB方法，将SQL语句分开执行
  async initDB() {
    try {
      await this.db.exec("ALTER TABLE groups ADD COLUMN is_public INTEGER DEFAULT 1;");
    } catch {
    }
    try {
      await this.db.exec("ALTER TABLE sites ADD COLUMN is_public INTEGER DEFAULT 1;");
    } catch {
    }
    try {
      await this.db.exec("CREATE INDEX IF NOT EXISTS idx_groups_is_public ON groups(is_public);");
      await this.db.exec("CREATE INDEX IF NOT EXISTS idx_sites_is_public ON sites(is_public);");
    } catch {
    }
    try {
      const isInitialized = await this.getConfig("DB_INITIALIZED");
      if (isInitialized === "true") {
        return { success: true, alreadyInitialized: true };
      }
    } catch {
    }
    await this.db.exec(
      `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, order_num INTEGER NOT NULL, is_public INTEGER DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );
    await this.db.exec(
      `CREATE TABLE IF NOT EXISTS sites (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER NOT NULL, name TEXT NOT NULL, url TEXT NOT NULL, icon TEXT, description TEXT, notes TEXT, order_num INTEGER NOT NULL, is_public INTEGER DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE);`
    );
    await this.db.exec(`CREATE TABLE IF NOT EXISTS configs (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    await this.setConfig("DB_INITIALIZED", "true");
    return { success: true, alreadyInitialized: false };
  }
  // 验证用户登录
  async login(loginRequest) {
    if (!this.authEnabled) {
      return {
        success: true,
        token: await this.generateToken({ username: "guest" }, false),
        message: "身份验证未启用，默认登录成功"
      };
    }
    const passwordMode = this.getPasswordMode();
    if (!this.username || passwordMode === "missing") {
      return {
        success: false,
        message: "管理员认证未配置完成，请检查 AUTH_USERNAME 和 AUTH_PASSWORD"
      };
    }
    if (passwordMode === "invalid-bcrypt") {
      return {
        success: false,
        message: "AUTH_PASSWORD 看起来像 bcrypt 哈希，但格式无效。请重新生成哈希，或直接填写明文密码。"
      };
    }
    if (loginRequest.username !== this.username) {
      return {
        success: false,
        message: "用户名或密码错误"
      };
    }
    const isPasswordValid = this.verifyConfiguredPassword(loginRequest.password);
    if (isPasswordValid) {
      const token = await this.generateToken(
        { username: loginRequest.username },
        loginRequest.rememberMe || false
      );
      return {
        success: true,
        token,
        message: "登录成功"
      };
    }
    return {
      success: false,
      message: "用户名或密码错误"
    };
  }
  // 验证令牌有效性
  async verifyToken(token) {
    if (!this.authEnabled) {
      return { valid: true };
    }
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return { valid: false };
      }
      const [encodedHeader, encodedPayload, signature] = parts;
      if (!encodedHeader || !encodedPayload || !signature) {
        return { valid: false };
      }
      const encoder = new TextEncoder();
      const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
      const keyData = encoder.encode(this.secret);
      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
      );
      const signatureBytes = this.base64UrlDecode(signature);
      const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, data);
      if (!isValid) {
        return { valid: false };
      }
      const payloadStr = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"));
      const payload = JSON.parse(payloadStr);
      const now = Math.floor(Date.now() / 1e3);
      if (payload.exp && typeof payload.exp === "number" && payload.exp < now) {
        return { valid: false };
      }
      return { valid: true, payload };
    } catch (error) {
      console.error("Token验证失败:", error);
      return { valid: false };
    }
  }
  // 生成JWT令牌
  async generateToken(payload, rememberMe = false) {
    const expiresIn = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const tokenPayload = {
      ...payload,
      exp: Math.floor(Date.now() / 1e3) + expiresIn,
      iat: Math.floor(Date.now() / 1e3)
    };
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(tokenPayload));
    const encoder = new TextEncoder();
    const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const keyData = encoder.encode(this.secret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
    const signature = this.base64UrlEncode(signatureBuffer);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  // 辅助方法：base64url 编码（支持字符串和 ArrayBuffer）
  base64UrlEncode(data) {
    let base64;
    if (typeof data === "string") {
      base64 = btoa(data);
    } else {
      const bytes = new Uint8Array(data);
      const binary = Array.from(bytes).map((byte) => String.fromCharCode(byte)).join("");
      base64 = btoa(binary);
    }
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  // 辅助方法：base64url 解码为 ArrayBuffer
  base64UrlDecode(base64url) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - base64.length % 4) % 4);
    const binary = atob(base64 + padding);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
  // 检查认证是否启用
  isAuthEnabled() {
    return this.authEnabled;
  }
  // 分组相关 API
  async getGroups() {
    const result = await this.db.prepare("SELECT id, name, order_num, created_at, updated_at FROM groups ORDER BY order_num").all();
    return result.results || [];
  }
  async getGroup(id) {
    const result = await this.db.prepare("SELECT id, name, order_num, created_at, updated_at FROM groups WHERE id = ?").bind(id).first();
    return result;
  }
  async createGroup(group) {
    const result = await this.db.prepare(
      "INSERT INTO groups (name, order_num, is_public) VALUES (?, ?, ?) RETURNING id, name, order_num, is_public, created_at, updated_at"
    ).bind(group.name, group.order_num, group.is_public ?? 1).all();
    if (!result.results || result.results.length === 0) {
      throw new Error("创建分组失败");
    }
    const createdGroup = result.results[0];
    if (!createdGroup) {
      throw new Error("创建分组失败");
    }
    return createdGroup;
  }
  async updateGroup(id, group) {
    const ALLOWED_FIELDS = ["name", "order_num", "is_public"];
    const updates = ["updated_at = CURRENT_TIMESTAMP"];
    const params = [];
    Object.entries(group).forEach(([key, value]) => {
      if (ALLOWED_FIELDS.includes(key) && value !== void 0) {
        updates.push(`${key} = ?`);
        params.push(value);
      } else if (key !== "id" && key !== "created_at" && key !== "updated_at") {
        console.warn(`尝试更新不允许的字段: ${key}`);
      }
    });
    if (updates.length === 1) {
      throw new Error("没有可更新的字段");
    }
    const query = `UPDATE groups SET ${updates.join(
      ", "
    )} WHERE id = ? RETURNING id, name, order_num, created_at, updated_at`;
    params.push(id);
    const result = await this.db.prepare(query).bind(...params).all();
    if (!result.results || result.results.length === 0) {
      return null;
    }
    const updatedGroup = result.results[0];
    return updatedGroup || null;
  }
  async deleteGroup(id) {
    const result = await this.db.prepare("DELETE FROM groups WHERE id = ?").bind(id).run();
    return result.success;
  }
  // 网站相关 API
  async getSites(groupId) {
    let query = "SELECT id, group_id, name, url, icon, description, notes, order_num, created_at, updated_at FROM sites";
    const params = [];
    if (groupId !== void 0) {
      query += " WHERE group_id = ?";
      params.push(groupId);
    }
    query += " ORDER BY order_num";
    const result = await this.db.prepare(query).bind(...params).all();
    return result.results || [];
  }
  /**
   * 获取所有分组及其站点 (使用 JOIN 优化,避免 N+1 查询)
   * 返回格式: GroupWithSites[] (每个分组包含其站点数组)
   */
  async getGroupsWithSites() {
    const query = `
      SELECT
        g.id as group_id,
        g.name as group_name,
        g.order_num as group_order,
        g.is_public as group_is_public,
        g.created_at as group_created_at,
        g.updated_at as group_updated_at,
        s.id as site_id,
        s.name as site_name,
        s.url as site_url,
        s.icon as site_icon,
        s.description as site_description,
        s.notes as site_notes,
        s.order_num as site_order,
        s.is_public as site_is_public,
        s.created_at as site_created_at,
        s.updated_at as site_updated_at
      FROM groups g
      LEFT JOIN sites s ON g.id = s.group_id
      ORDER BY g.order_num ASC, s.order_num ASC
    `;
    const result = await this.db.prepare(query).all();
    const groupsMap = /* @__PURE__ */ new Map();
    for (const row of result.results || []) {
      if (!groupsMap.has(row.group_id)) {
        groupsMap.set(row.group_id, {
          id: row.group_id,
          name: row.group_name,
          order_num: row.group_order,
          is_public: row.group_is_public,
          created_at: row.group_created_at,
          updated_at: row.group_updated_at,
          sites: []
        });
      }
      if (row.site_id !== null) {
        const group = groupsMap.get(row.group_id);
        group.sites.push({
          id: row.site_id,
          group_id: row.group_id,
          name: row.site_name,
          url: row.site_url,
          icon: row.site_icon || "",
          description: row.site_description || "",
          notes: row.site_notes || "",
          order_num: row.site_order,
          is_public: row.site_is_public,
          created_at: row.site_created_at,
          updated_at: row.site_updated_at
        });
      }
    }
    return Array.from(groupsMap.values());
  }
  async getSite(id) {
    const result = await this.db.prepare(
      "SELECT id, group_id, name, url, icon, description, notes, order_num, created_at, updated_at FROM sites WHERE id = ?"
    ).bind(id).first();
    return result;
  }
  async createSite(site) {
    const result = await this.db.prepare(
      `
      INSERT INTO sites (group_id, name, url, icon, description, notes, order_num, is_public)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id, group_id, name, url, icon, description, notes, order_num, is_public, created_at, updated_at
    `
    ).bind(
      site.group_id,
      site.name,
      site.url,
      site.icon || "",
      site.description || "",
      site.notes || "",
      site.order_num,
      site.is_public ?? 1
    ).all();
    if (!result.results || result.results.length === 0) {
      throw new Error("创建站点失败");
    }
    const createdSite = result.results[0];
    if (!createdSite) {
      throw new Error("创建站点失败");
    }
    return createdSite;
  }
  async updateSite(id, site) {
    const ALLOWED_FIELDS = [
      "group_id",
      "name",
      "url",
      "icon",
      "description",
      "notes",
      "order_num",
      "is_public"
    ];
    const updates = ["updated_at = CURRENT_TIMESTAMP"];
    const params = [];
    Object.entries(site).forEach(([key, value]) => {
      if (ALLOWED_FIELDS.includes(key) && value !== void 0) {
        updates.push(`${key} = ?`);
        params.push(value);
      } else if (key !== "id" && key !== "created_at" && key !== "updated_at") {
        console.warn(`尝试更新不允许的字段: ${key}`);
      }
    });
    if (updates.length === 1) {
      throw new Error("没有可更新的字段");
    }
    const query = `UPDATE sites SET ${updates.join(
      ", "
    )} WHERE id = ? RETURNING id, group_id, name, url, icon, description, notes, order_num, created_at, updated_at`;
    params.push(id);
    const result = await this.db.prepare(query).bind(...params).all();
    if (!result.results || result.results.length === 0) {
      return null;
    }
    const updatedSite = result.results[0];
    return updatedSite || null;
  }
  async deleteSite(id) {
    const result = await this.db.prepare("DELETE FROM sites WHERE id = ?").bind(id).run();
    return result.success;
  }
  // 配置相关API
  async getConfigs() {
    const result = await this.db.prepare("SELECT key, value FROM configs").all();
    const configs = {};
    for (const config of result.results || []) {
      configs[config.key] = config.value;
    }
    return configs;
  }
  async getConfig(key) {
    const result = await this.db.prepare("SELECT value FROM configs WHERE key = ?").bind(key).first();
    return result ? result.value : null;
  }
  async setConfig(key, value) {
    try {
      const result = await this.db.prepare(
        `INSERT INTO configs (key, value, updated_at) 
                    VALUES (?, ?, CURRENT_TIMESTAMP) 
                    ON CONFLICT(key) 
                    DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP`
      ).bind(key, value, value).run();
      return result.success;
    } catch (error) {
      console.error("设置配置失败:", error);
      return false;
    }
  }
  async deleteConfig(key) {
    const result = await this.db.prepare("DELETE FROM configs WHERE key = ?").bind(key).run();
    return result.success;
  }
  // 批量更新排序
  async updateGroupOrder(groupOrders) {
    return await this.db.batch(
      groupOrders.map(
        (item) => this.db.prepare("UPDATE groups SET order_num = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(item.order_num, item.id)
      )
    ).then(() => true).catch(() => false);
  }
  async updateSiteOrder(siteOrders) {
    return await this.db.batch(
      siteOrders.map(
        (item) => this.db.prepare("UPDATE sites SET order_num = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(item.order_num, item.id)
      )
    ).then(() => true).catch(() => false);
  }
  // 导出所有数据
  async exportData() {
    const groups = await this.getGroups();
    const sites = await this.getSites();
    const configs = await this.getConfigs();
    return {
      groups,
      sites,
      configs,
      version: "1.0",
      // 数据版本号，便于后续兼容性处理
      exportDate: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  // 导入所有数据
  async importData(data) {
    try {
      const groupMap = /* @__PURE__ */ new Map();
      const stats = {
        groups: {
          total: data.groups.length,
          created: 0,
          merged: 0
        },
        sites: {
          total: data.sites.length,
          created: 0,
          updated: 0,
          skipped: 0
        }
      };
      for (const group of data.groups) {
        const existingGroup = await this.getGroupByName(group.name);
        if (existingGroup) {
          if (group.id) {
            groupMap.set(group.id, existingGroup.id);
          }
          stats.groups.merged++;
        } else {
          const newGroup = await this.createGroup({
            name: group.name,
            order_num: group.order_num
          });
          if (group.id && newGroup.id) {
            groupMap.set(group.id, newGroup.id);
          }
          stats.groups.created++;
        }
      }
      for (const site of data.sites) {
        const newGroupId = groupMap.get(site.group_id);
        if (!newGroupId) {
          console.warn(`无法为站点"${site.name}"找到对应的分组ID，已跳过`);
          stats.sites.skipped++;
          continue;
        }
        const existingSite = await this.getSiteByGroupIdAndUrl(newGroupId, site.url);
        if (existingSite) {
          await this.updateSite(existingSite.id, {
            name: site.name,
            icon: site.icon,
            description: site.description,
            notes: site.notes
            // 不更新order_num以保持现有排序
          });
          stats.sites.updated++;
        } else {
          await this.createSite({
            ...site,
            id: void 0,
            // 不使用旧ID
            group_id: newGroupId
          });
          stats.sites.created++;
        }
      }
      for (const [key, value] of Object.entries(data.configs)) {
        if (key !== "DB_INITIALIZED") {
          await this.setConfig(key, value);
        }
      }
      return {
        success: true,
        stats
      };
    } catch (error) {
      console.error("导入数据失败:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "未知错误"
      };
    }
  }
  // 根据名称查询分组
  async getGroupByName(name) {
    const result = await this.db.prepare("SELECT id, name, order_num, created_at, updated_at FROM groups WHERE name = ?").bind(name).first();
    return result;
  }
  // 查询特定分组下是否已存在指定URL的站点
  async getSiteByGroupIdAndUrl(groupId, url) {
    const result = await this.db.prepare(
      "SELECT id, group_id, name, url, icon, description, notes, order_num, created_at, updated_at FROM sites WHERE group_id = ? AND url = ?"
    ).bind(groupId, url).first();
    return result;
  }
}
class PreferencesAPI {
  constructor(db) {
    this.db = db;
  }
  /**
   * Get all favorites for a user
   * @param userId - User identifier (username or device_identifier)
   * @returns Array of favorite records
   */
  async getFavorites(userId) {
    const result = await this.db.prepare("SELECT * FROM user_favorites WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all();
    return result.results;
  }
  /**
   * Add a site to user's favorites
   * @param userId - User identifier
   * @param siteId - Site ID to add
   * @returns The created favorite record
   * @throws Error if site doesn't exist or is already favorited
   */
  async addFavorite(userId, siteId) {
    const site = await this.db.prepare("SELECT id FROM sites WHERE id = ?").bind(siteId).first();
    if (!site) {
      throw new Error("站点不存在");
    }
    const result = await this.db.prepare(
      `
        INSERT INTO user_favorites (user_id, site_id)
        VALUES (?, ?)
        ON CONFLICT(user_id, site_id) DO NOTHING
        RETURNING *
      `
    ).bind(userId, siteId).first();
    if (!result) {
      throw new Error("该站点已在收藏列表中");
    }
    return result;
  }
  /**
   * Remove a site from user's favorites
   * @param userId - User identifier
   * @param siteId - Site ID to remove
   * @returns true if removed successfully
   */
  async removeFavorite(userId, siteId) {
    const result = await this.db.prepare("DELETE FROM user_favorites WHERE user_id = ? AND site_id = ?").bind(userId, siteId).run();
    return result.success;
  }
  /**
   * Get user preferences
   * @param userId - User identifier
   * @returns User preferences or null if not found
   */
  async getPreferences(userId) {
    const result = await this.db.prepare("SELECT * FROM user_preferences WHERE user_id = ?").bind(userId).first();
    if (!result) {
      return null;
    }
    const prefs = result;
    if (typeof prefs.custom_colors === "string") {
      try {
        prefs.custom_colors = JSON.parse(prefs.custom_colors);
      } catch {
        prefs.custom_colors = null;
      }
    }
    return prefs;
  }
  /**
   * Update user preferences (upsert)
   * @param userId - User identifier
   * @param prefs - Partial preferences to update
   */
  async updatePreferences(userId, prefs) {
    const fields = [];
    const values = [userId];
    if (prefs.view_mode !== void 0) {
      fields.push("view_mode");
      values.push(prefs.view_mode);
    }
    if (prefs.theme_mode !== void 0) {
      fields.push("theme_mode");
      values.push(prefs.theme_mode);
    }
    if (prefs.custom_colors !== void 0) {
      fields.push("custom_colors");
      values.push(prefs.custom_colors ? JSON.stringify(prefs.custom_colors) : null);
    }
    const updateClauses = fields.map((field) => `${field} = excluded.${field}`);
    updateClauses.push("updated_at = CURRENT_TIMESTAMP");
    const placeholders = ["?", ...fields.map(() => "?")];
    await this.db.prepare(
      `
        INSERT INTO user_preferences (user_id, ${fields.join(", ")})
        VALUES (${placeholders.join(", ")})
        ON CONFLICT(user_id) DO UPDATE SET ${updateClauses.join(", ")}
      `
    ).bind(...values).run();
  }
  /**
   * Record a site visit
   * @param userId - User identifier
   * @param siteId - Site ID to record
   * @description Uses INSERT ... ON CONFLICT DO UPDATE to update visit time if record exists
   * Automatically cleans up old records, keeping only the most recent 20 visits
   */
  async recordVisit(userId, siteId) {
    await this.db.prepare(
      `
        INSERT INTO user_recent_visits (user_id, site_id, visited_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, site_id) DO UPDATE SET visited_at = CURRENT_TIMESTAMP
      `
    ).bind(userId, siteId).run();
    await this.db.prepare(
      `
        DELETE FROM user_recent_visits
        WHERE user_id = ?
        AND id NOT IN (
          SELECT id FROM user_recent_visits
          WHERE user_id = ?
          ORDER BY visited_at DESC
          LIMIT 20
        )
      `
    ).bind(userId, userId).run();
  }
  /**
   * Get recent visits for a user
   * @param userId - User identifier
   * @param limit - Maximum number of records to return (default 20, max 50)
   * @returns Array of visit records ordered by visited_at DESC
   */
  async getRecentVisits(userId, limit = 20) {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const result = await this.db.prepare(
      `
        SELECT * FROM user_recent_visits
        WHERE user_id = ?
        ORDER BY visited_at DESC
        LIMIT ?
      `
    ).bind(userId, safeLimit).all();
    return result.results;
  }
  /**
   * Migrate guest user data to authenticated user account
   * @param guestUserId - Guest user's device identifier
   * @param authenticatedUserId - Authenticated user's username
   * @returns Migration statistics (number of favorites and visits migrated)
   * @description Uses D1 batch API for transactional operations:
   * - Migrates favorites with ON CONFLICT DO NOTHING (keeps existing)
   * - Migrates visits with ON CONFLICT DO UPDATE (keeps latest timestamp)
   * - Cleans up guest data after successful migration
   * **Validates: Requirements 2.3, 2.4, 2.5, 4.6**
   */
  async migrateGuestData(guestUserId, authenticatedUserId) {
    const migrated = {
      favorites: 0,
      visits: 0
    };
    try {
      const statements = [];
      statements.push(
        this.db.prepare(
          `
            INSERT INTO user_favorites (user_id, site_id, created_at)
            SELECT ?, site_id, created_at
            FROM user_favorites
            WHERE user_id = ?
            ON CONFLICT(user_id, site_id) DO NOTHING
          `
        ).bind(authenticatedUserId, guestUserId)
      );
      statements.push(
        this.db.prepare(
          `
            INSERT INTO user_recent_visits (user_id, site_id, visited_at)
            SELECT ?, site_id, visited_at
            FROM user_recent_visits
            WHERE user_id = ?
            ON CONFLICT(user_id, site_id) DO UPDATE SET
              visited_at = MAX(visited_at, excluded.visited_at)
          `
        ).bind(authenticatedUserId, guestUserId)
      );
      statements.push(
        this.db.prepare("DELETE FROM user_favorites WHERE user_id = ?").bind(guestUserId)
      );
      statements.push(
        this.db.prepare("DELETE FROM user_recent_visits WHERE user_id = ?").bind(guestUserId)
      );
      const results = await this.db.batch(statements);
      migrated.favorites = results[0]?.meta?.changes || 0;
      migrated.visits = results[1]?.meta?.changes || 0;
      return migrated;
    } catch (error) {
      console.error("Migration failed:", error);
      throw new Error("偏好数据迁移失败");
    }
  }
}
function parseCookies(cookieHeader) {
  const cookies = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    if (name && rest.length > 0) {
      cookies[name.trim()] = rest.join("=").trim();
    }
  });
  return cookies;
}
function getDeviceIdentifier(request) {
  const headerDeviceId = request.headers.get("X-Device-ID");
  if (headerDeviceId) {
    return headerDeviceId;
  }
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const cookies = parseCookies(cookieHeader);
    return cookies["device_id"] || null;
  }
  return null;
}
function generateDeviceIdentifier() {
  return `guest_${crypto.randomUUID()}`;
}
function getAuthToken(request) {
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce(
      (acc, cookie) => {
        const [name, ...rest] = cookie.split("=");
        if (name && rest.length > 0) {
          acc[name.trim()] = rest.join("=").trim();
        }
        return acc;
      },
      {}
    );
    if (cookies["auth_token"]) {
      return cookies["auth_token"];
    }
  }
  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    const [authType, token] = authHeader.split(" ");
    if (authType === "Bearer" && token) {
      return token;
    }
  }
  return null;
}
async function getUserIdentifier(request, api) {
  const token = getAuthToken(request);
  if (token) {
    try {
      const verifyResult = await api.verifyToken(token);
      if (verifyResult.valid && verifyResult.payload) {
        const username = verifyResult.payload.username;
        if (username && typeof username === "string") {
          return {
            userId: username,
            isGuest: false
          };
        }
      }
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }
  let deviceId = getDeviceIdentifier(request);
  if (!deviceId) {
    deviceId = generateDeviceIdentifier();
  }
  return {
    userId: deviceId,
    isGuest: true
  };
}
function validateFavoriteRequest(siteId) {
  const errors = [];
  let sanitizedSiteId;
  if (siteId === void 0 || siteId === null) {
    errors.push("站点ID不能为空");
    return { valid: false, errors };
  }
  if (typeof siteId === "number") {
    sanitizedSiteId = siteId;
  } else if (typeof siteId === "string") {
    const parsed = parseInt(siteId, 10);
    if (isNaN(parsed)) {
      errors.push("站点ID必须是有效的数字");
    } else {
      sanitizedSiteId = parsed;
    }
  } else {
    errors.push("站点ID必须是数字");
  }
  if (sanitizedSiteId !== void 0) {
    if (!Number.isInteger(sanitizedSiteId)) {
      errors.push("站点ID必须是整数");
    } else if (sanitizedSiteId <= 0) {
      errors.push("站点ID必须是正整数");
    }
  }
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : void 0,
    sanitizedData: errors.length === 0 ? sanitizedSiteId : void 0
  };
}
function validatePreferencesUpdate(data) {
  const errors = [];
  const sanitizedData = {};
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    errors.push("偏好设置数据必须是对象");
    return { valid: false, errors };
  }
  const input = data;
  if (input.view_mode !== void 0) {
    if (typeof input.view_mode !== "string") {
      errors.push("视图模式必须是字符串");
    } else if (input.view_mode !== "card" && input.view_mode !== "list") {
      errors.push("视图模式必须是 'card' 或 'list'");
    } else {
      sanitizedData.view_mode = input.view_mode;
    }
  }
  if (input.theme_mode !== void 0) {
    if (typeof input.theme_mode !== "string") {
      errors.push("主题模式必须是字符串");
    } else if (input.theme_mode !== "light" && input.theme_mode !== "dark") {
      errors.push("主题模式必须是 'light' 或 'dark'");
    } else {
      sanitizedData.theme_mode = input.theme_mode;
    }
  }
  if (input.custom_colors !== void 0) {
    if (input.custom_colors === null) {
      sanitizedData.custom_colors = null;
    } else if (typeof input.custom_colors === "string") {
      try {
        const parsed = JSON.parse(input.custom_colors);
        if (typeof parsed !== "object" || Array.isArray(parsed)) {
          errors.push("自定义颜色必须是有效的 JSON 对象");
        } else {
          const validKeys = ["primary", "secondary", "background", "surface", "text"];
          const parsedKeys = Object.keys(parsed);
          const invalidKeys = parsedKeys.filter((key) => !validKeys.includes(key));
          if (invalidKeys.length > 0) {
            errors.push(`自定义颜色包含无效的字段: ${invalidKeys.join(", ")}`);
          }
          const nonStringValues = parsedKeys.filter((key) => typeof parsed[key] !== "string");
          if (nonStringValues.length > 0) {
            errors.push("自定义颜色的所有值必须是字符串");
          }
          if (invalidKeys.length === 0 && nonStringValues.length === 0) {
            sanitizedData.custom_colors = input.custom_colors;
          }
        }
      } catch {
        errors.push("自定义颜色必须是有效的 JSON 格式");
      }
    } else if (typeof input.custom_colors === "object" && !Array.isArray(input.custom_colors)) {
      try {
        const validKeys = ["primary", "secondary", "background", "surface", "text"];
        const inputKeys = Object.keys(input.custom_colors);
        const invalidKeys = inputKeys.filter((key) => !validKeys.includes(key));
        if (invalidKeys.length > 0) {
          errors.push(`自定义颜色包含无效的字段: ${invalidKeys.join(", ")}`);
        }
        const nonStringValues = inputKeys.filter(
          (key) => typeof input.custom_colors[key] !== "string"
        );
        if (nonStringValues.length > 0) {
          errors.push("自定义颜色的所有值必须是字符串");
        }
        if (invalidKeys.length === 0 && nonStringValues.length === 0) {
          sanitizedData.custom_colors = JSON.stringify(input.custom_colors);
        }
      } catch {
        errors.push("自定义颜色对象无法序列化为 JSON");
      }
    } else {
      errors.push("自定义颜色必须是 JSON 字符串、对象或 null");
    }
  }
  if (Object.keys(sanitizedData).length === 0 && errors.length === 0) {
    errors.push("至少需要提供一个偏好设置字段进行更新");
  }
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : void 0,
    sanitizedData: errors.length === 0 ? sanitizedData : void 0
  };
}
class SimpleRateLimiter {
  requests = /* @__PURE__ */ new Map();
  maxRequests;
  windowMs;
  constructor(maxRequests = 5, windowMinutes = 15) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMinutes * 60 * 1e3;
  }
  getRecord(identifier) {
    const now = Date.now();
    const record = this.requests.get(identifier);
    if (record && now > record.resetTime) {
      this.requests.delete(identifier);
      return null;
    }
    return this.requests.get(identifier) || null;
  }
  /**
   * 检查当前标识符是否已经被限制
   */
  isBlocked(identifier) {
    const record = this.getRecord(identifier);
    return !!record && record.count >= this.maxRequests;
  }
  /**
   * 记录一次失败尝试
   */
  recordFailure(identifier) {
    const now = Date.now();
    const current = this.getRecord(identifier) || {
      count: 0,
      resetTime: now + this.windowMs
    };
    current.count++;
    this.requests.set(identifier, current);
  }
  /**
   * 登录成功后清空失败计数
   */
  reset(identifier) {
    this.requests.delete(identifier);
  }
  /**
   * 获取剩余请求次数
   */
  getRemaining(identifier) {
    const record = this.getRecord(identifier);
    if (!record) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - record.count);
  }
  /**
   * 定期清理过期记录 (避免内存泄漏)
   */
  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}
const loginRateLimiter = new SimpleRateLimiter(5, 15);
const READ_ONLY_ROUTES = [
  { method: "GET", path: "/api/groups" },
  { method: "GET", path: "/api/sites" },
  { method: "GET", path: "/api/configs" },
  { method: "GET", path: "/api/groups-with-sites" },
  { method: "GET", path: "/api/visitor-location" }
];
function generateErrorId() {
  return crypto.randomUUID();
}
function log(data) {
  console.log(
    JSON.stringify({
      ...data,
      timestamp: data.timestamp || (/* @__PURE__ */ new Date()).toISOString()
    })
  );
}
function createErrorResponse(error, request, context) {
  const errorId = generateErrorId();
  const url = new URL(request.url);
  log({
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    level: "error",
    message: error instanceof Error ? error.message : "未知错误",
    errorId,
    path: url.pathname,
    method: request.method,
    details: error instanceof Error ? {
      name: error.name,
      stack: error.stack
    } : error
  });
  return createJsonResponse(
    {
      success: false,
      message: context ? `${context}失败` : "处理请求时发生错误",
      errorId
    },
    request,
    { status: 500 }
  );
}
const MAX_BODY_SIZE = 1024 * 1024;
async function validateRequestBody(request) {
  const contentLength = request.headers.get("Content-Length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    throw new Error("请求体过大，最大允许 1MB");
  }
  const bodyText = await request.text();
  if (bodyText.length > MAX_BODY_SIZE) {
    throw new Error("请求体过大，最大允许 1MB");
  }
  try {
    return JSON.parse(bodyText);
  } catch {
    throw new Error("无效的 JSON 格式");
  }
}
function validateExportData(data) {
  const errors = [];
  if (!data || typeof data !== "object") {
    errors.push("数据必须是对象");
    return { valid: false, errors };
  }
  const d = data;
  if (!d.version || typeof d.version !== "string") {
    errors.push("缺少或无效的版本信息");
  }
  if (!d.exportDate || typeof d.exportDate !== "string") {
    errors.push("缺少或无效的导出日期");
  }
  if (!Array.isArray(d.groups)) {
    errors.push("groups 必须是数组");
  } else {
    d.groups.forEach((group, index2) => {
      if (!group || typeof group !== "object") {
        errors.push(`groups[${index2}]: 必须是对象`);
        return;
      }
      const g = group;
      if (!g.name || typeof g.name !== "string") {
        errors.push(`groups[${index2}]: name 必须是字符串`);
      }
      if (typeof g.order_num !== "number") {
        errors.push(`groups[${index2}]: order_num 必须是数字`);
      }
    });
  }
  if (!Array.isArray(d.sites)) {
    errors.push("sites 必须是数组");
  } else {
    d.sites.forEach((site, index2) => {
      if (!site || typeof site !== "object") {
        errors.push(`sites[${index2}]: 必须是对象`);
        return;
      }
      const s = site;
      if (!s.name || typeof s.name !== "string") {
        errors.push(`sites[${index2}]: name 必须是字符串`);
      }
      if (!s.url || typeof s.url !== "string") {
        errors.push(`sites[${index2}]: url 必须是字符串`);
      } else {
        try {
          new URL(s.url);
        } catch {
          errors.push(`sites[${index2}]: url 格式无效`);
        }
      }
      if (typeof s.group_id !== "number") {
        errors.push(`sites[${index2}]: group_id 必须是数字`);
      }
      if (typeof s.order_num !== "number") {
        errors.push(`sites[${index2}]: order_num 必须是数字`);
      }
    });
  }
  if (!d.configs || typeof d.configs !== "object") {
    errors.push("configs 必须是对象");
  }
  return { valid: errors.length === 0, errors };
}
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8788"
  // 生产环境会自动允许同源
];
function getCorsHeaders(request) {
  const origin = request.headers.get("Origin");
  const requestUrl = new URL(request.url);
  let allowedOrigin = null;
  if (origin) {
    const isAllowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".workers.dev") || origin === requestUrl.origin;
    allowedOrigin = isAllowed ? origin : null;
  }
  const finalOrigin = allowedOrigin || ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": finalOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400"
  };
}
function createJsonResponse(data, request, options = {}) {
  const corsHeaders = getCorsHeaders(request);
  return Response.json(data, {
    ...options,
    headers: {
      ...corsHeaders,
      ...options.headers
    }
  });
}
function createResponse(body, request, options = {}) {
  const corsHeaders = getCorsHeaders(request);
  return new Response(body, {
    ...options,
    headers: {
      ...corsHeaders,
      ...options.headers
    }
  });
}
const index = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request)
      });
    }
    if (url.pathname.startsWith("/api/")) {
      const path = url.pathname.replace("/api/", "");
      const method = request.method;
      try {
        const api = new NavigationAPI(env);
        if (path === "login" && method === "POST") {
          try {
            const clientIP = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
            if (loginRateLimiter.isBlocked(clientIP)) {
              const remaining = loginRateLimiter.getRemaining(clientIP);
              log({
                level: "warn",
                message: "登录速率限制触发",
                path: "/api/login",
                method: "POST",
                details: { clientIP, remaining }
              });
              return createJsonResponse(
                {
                  success: false,
                  message: "登录尝试次数过多，请稍后再试 (15分钟内最多5次)"
                },
                request,
                { status: 429 }
                // 429 Too Many Requests
              );
            }
            const loginData = await validateRequestBody(request);
            const validation = validateLogin(loginData);
            if (!validation.valid) {
              return createJsonResponse(
                {
                  success: false,
                  message: `验证失败: ${validation.errors?.join(", ")}`
                },
                request,
                { status: 400 }
              );
            }
            const result = await api.login(loginData);
            if (result.success && result.token) {
              loginRateLimiter.reset(clientIP);
              const maxAge = loginData.rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;
              return createJsonResponse({ success: true, message: result.message }, request, {
                headers: {
                  "Set-Cookie": [
                    `auth_token=${result.token}`,
                    "HttpOnly",
                    "Secure",
                    "SameSite=Strict",
                    `Max-Age=${maxAge}`,
                    "Path=/"
                  ].join("; ")
                }
              });
            }
            if (result.message === "用户名或密码错误") {
              loginRateLimiter.recordFailure(clientIP);
            }
            return createJsonResponse(result, request);
          } catch (error) {
            return createJsonResponse(
              {
                success: false,
                message: error instanceof Error ? error.message : "请求无效"
              },
              request,
              { status: 400 }
            );
          }
        }
        if (path === "logout" && method === "POST") {
          return createJsonResponse({ success: true, message: "登出成功" }, request, {
            headers: {
              "Set-Cookie": [
                "auth_token=",
                "HttpOnly",
                "Secure",
                "SameSite=Strict",
                "Max-Age=0",
                "Path=/"
              ].join("; ")
            }
          });
        }
        if (path === "auth/status" && method === "GET") {
          const cookieHeader = request.headers.get("Cookie");
          let token = null;
          if (cookieHeader) {
            const cookies = cookieHeader.split(";").reduce(
              (acc, cookie) => {
                const [key, value] = cookie.trim().split("=");
                if (key && value) {
                  acc[key] = value;
                }
                return acc;
              },
              {}
            );
            token = cookies["auth_token"] || null;
          }
          if (token && api.isAuthEnabled()) {
            try {
              const result = await api.verifyToken(token);
              return createJsonResponse({ authenticated: result.valid }, request);
            } catch {
              return createJsonResponse({ authenticated: false }, request);
            }
          }
          return createJsonResponse({ authenticated: false }, request);
        }
        if (path === "init" && method === "GET") {
          const initResult = await api.initDB();
          if (initResult.alreadyInitialized) {
            return createResponse("数据库已经初始化过，无需重复初始化", request, { status: 200 });
          }
          return createResponse("数据库初始化成功", request, { status: 200 });
        }
        let isAuthenticated = false;
        if (api.isAuthEnabled()) {
          const requestPath = `/api/${path}`;
          const isReadOnlyRoute = READ_ONLY_ROUTES.some(
            (route) => route.method === method && route.path === requestPath
          );
          const shouldRequireAuth = !isReadOnlyRoute || env.AUTH_REQUIRED_FOR_READ === "true";
          const cookieHeader = request.headers.get("Cookie");
          let token = null;
          if (cookieHeader) {
            const cookies = cookieHeader.split(";").reduce(
              (acc, cookie) => {
                const [key, value] = cookie.trim().split("=");
                if (key) {
                  acc[key] = value || "";
                }
                return acc;
              },
              {}
            );
            token = cookies["auth_token"] || null;
          }
          if (!token) {
            const authHeader = request.headers.get("Authorization");
            if (authHeader) {
              const [authType, headerToken] = authHeader.split(" ");
              if (authType === "Bearer" && headerToken) {
                token = headerToken;
              }
            }
          }
          if (token) {
            try {
              const verifyResult = await api.verifyToken(token);
              if (verifyResult.valid) {
                isAuthenticated = true;
                log({
                  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                  level: "info",
                  message: `已认证用户访问: ${method} ${requestPath}`
                });
              }
            } catch (error) {
              log({
                timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                level: "warn",
                message: `Token 验证失败: ${method} ${requestPath}`,
                details: error
              });
            }
          }
          if (shouldRequireAuth && !isAuthenticated) {
            return createResponse("请先登录", request, {
              status: 401,
              headers: {
                "WWW-Authenticate": "Bearer"
              }
            });
          }
          if (isReadOnlyRoute && !isAuthenticated) {
            log({
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              level: "info",
              message: `访客模式访问: ${method} ${requestPath}`
            });
          }
        }
        if (path === "visitor-location" && method === "GET") {
          const rawCity = request.cf && typeof request.cf.city === "string" ? request.cf.city : "";
          const city = rawCity.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 64) || null;
          return createJsonResponse({ city }, request, {
            headers: { "Cache-Control": "private, no-store" }
          });
        }
        if (path === "groups-with-sites" && method === "GET") {
          const groupsWithSites = await api.getGroupsWithSites();
          if (!isAuthenticated) {
            const filteredGroups = groupsWithSites.filter((group) => group.is_public === 1).map((group) => ({
              ...group,
              sites: group.sites
                .filter((site) => site.is_public === 1)
                .map(({ notes: _privateNotes, ...site }) => site)
            }));
            return createJsonResponse(filteredGroups, request);
          }
          return createJsonResponse(groupsWithSites, request);
        } else if (path === "groups" && method === "GET") {
          let query = "SELECT * FROM groups";
          const params = [];
          if (!isAuthenticated) {
            query += " WHERE is_public = ?";
            params.push(1);
          }
          query += " ORDER BY order_num ASC";
          const result = await env.DB.prepare(query).bind(...params).all();
          return createJsonResponse(result.results || [], request);
        } else if (path.startsWith("groups/") && method === "GET") {
          const idStr = path.split("/")[1];
          if (!idStr) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const id = parseInt(idStr);
          if (isNaN(id)) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const group = await api.getGroup(id);
          return createJsonResponse(group, request);
        } else if (path === "groups" && method === "POST") {
          const data = await validateRequestBody(request);
          const validation = validateGroup(data);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          const result = await api.createGroup(validation.sanitizedData);
          return createJsonResponse(result, request);
        } else if (path.startsWith("groups/") && method === "PUT") {
          const idStr = path.split("/")[1];
          if (!idStr) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const id = parseInt(idStr);
          if (isNaN(id)) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const data = await validateRequestBody(request);
          if (data.name !== void 0 && (typeof data.name !== "string" || data.name.trim() === "")) {
            return createJsonResponse(
              {
                success: false,
                message: "分组名称不能为空且必须是字符串"
              },
              request,
              { status: 400 }
            );
          }
          if (data.order_num !== void 0 && typeof data.order_num !== "number") {
            return createJsonResponse(
              {
                success: false,
                message: "排序号必须是数字"
              },
              request,
              { status: 400 }
            );
          }
          const result = await api.updateGroup(id, data);
          return createJsonResponse(result, request);
        } else if (path.startsWith("groups/") && method === "DELETE") {
          const idStr = path.split("/")[1];
          if (!idStr) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const id = parseInt(idStr);
          if (isNaN(id)) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const result = await api.deleteGroup(id);
          return createJsonResponse({ success: result }, request);
        } else if (path === "sites" && method === "GET") {
          let query = `
                        SELECT s.*
                        FROM sites s
                        INNER JOIN groups g ON s.group_id = g.id
                    `;
          const groupId = url.searchParams.get("groupId");
          const conditions = [];
          const params = [];
          if (groupId) {
            conditions.push(`s.group_id = ?`);
            params.push(parseInt(groupId));
          }
          if (!isAuthenticated) {
            conditions.push("g.is_public = ?");
            params.push(1);
            conditions.push("s.is_public = ?");
            params.push(1);
          }
          if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
          }
          query += " ORDER BY s.group_id ASC, s.order_num ASC";
          const result = await env.DB.prepare(query).bind(...params).all();
          const sites = result.results || [];
          const visibleSites = isAuthenticated
            ? sites
            : sites.map(({ notes: _privateNotes, ...site }) => site);
          return createJsonResponse(visibleSites, request);
        } else if (path.startsWith("sites/") && method === "GET") {
          const idStr = path.split("/")[1];
          if (!idStr) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const id = parseInt(idStr);
          if (isNaN(id)) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const site = await api.getSite(id);
          return createJsonResponse(site, request);
        } else if (path === "sites" && method === "POST") {
          const data = await validateRequestBody(request);
          const validation = validateSite(data);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          const result = await api.createSite(validation.sanitizedData);
          return createJsonResponse(result, request);
        } else if (path.startsWith("sites/") && method === "PUT") {
          const idStr = path.split("/")[1];
          if (!idStr) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const id = parseInt(idStr);
          if (isNaN(id)) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const data = await validateRequestBody(request);
          if (data.url !== void 0) {
            let url2 = data.url.trim();
            if (!/^https?:\/\//i.test(url2)) {
              url2 = "https://" + url2;
            }
            try {
              new URL(url2);
              data.url = url2;
            } catch {
              return createJsonResponse(
                {
                  success: false,
                  message: "无效的URL格式"
                },
                request,
                { status: 400 }
              );
            }
          }
          if (data.icon !== void 0 && data.icon !== "") {
            let iconUrl = data.icon.trim();
            if (!/^https?:\/\//i.test(iconUrl) && !/^data:/i.test(iconUrl)) {
              iconUrl = "https://" + iconUrl;
            }
            try {
              new URL(iconUrl);
              data.icon = iconUrl;
            } catch {
              return createJsonResponse(
                {
                  success: false,
                  message: "无效的图标URL格式"
                },
                request,
                { status: 400 }
              );
            }
          }
          const result = await api.updateSite(id, data);
          return createJsonResponse(result, request);
        } else if (path.startsWith("sites/") && method === "DELETE") {
          const idStr = path.split("/")[1];
          if (!idStr) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const id = parseInt(idStr);
          if (isNaN(id)) {
            return createJsonResponse({ error: "无效的ID" }, request, { status: 400 });
          }
          const result = await api.deleteSite(id);
          return createJsonResponse({ success: result }, request);
        } else if (path === "group-orders" && method === "PUT") {
          const data = await validateRequestBody(request);
          if (!Array.isArray(data)) {
            return createJsonResponse(
              {
                success: false,
                message: "排序数据必须是数组"
              },
              request,
              { status: 400 }
            );
          }
          for (const item of data) {
            if (!item.id || typeof item.id !== "number" || item.order_num === void 0 || typeof item.order_num !== "number") {
              return createJsonResponse(
                {
                  success: false,
                  message: "排序数据格式无效，每个项目必须包含id和order_num"
                },
                request,
                { status: 400 }
              );
            }
          }
          const result = await api.updateGroupOrder(data);
          return createJsonResponse({ success: result }, request);
        } else if (path === "site-orders" && method === "PUT") {
          const data = await validateRequestBody(request);
          if (!Array.isArray(data)) {
            return createJsonResponse(
              {
                success: false,
                message: "排序数据必须是数组"
              },
              request,
              { status: 400 }
            );
          }
          for (const item of data) {
            if (!item.id || typeof item.id !== "number" || item.order_num === void 0 || typeof item.order_num !== "number") {
              return createJsonResponse(
                {
                  success: false,
                  message: "排序数据格式无效，每个项目必须包含id和order_num"
                },
                request,
                { status: 400 }
              );
            }
          }
          const result = await api.updateSiteOrder(data);
          return createJsonResponse({ success: result }, request);
        } else if (path === "configs" && method === "GET") {
          const configs = await api.getConfigs();
          return createJsonResponse(configs, request);
        } else if (path.startsWith("configs/") && method === "GET") {
          const key = path.substring("configs/".length);
          const value = await api.getConfig(key);
          return createJsonResponse({ key, value }, request);
        } else if (path.startsWith("configs/") && method === "PUT") {
          const key = path.substring("configs/".length);
          const data = await validateRequestBody(request);
          const validation = validateConfig(data);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          if (data.value === void 0) {
            return createJsonResponse(
              {
                success: false,
                message: "配置值必须提供，可以为空字符串"
              },
              request,
              { status: 400 }
            );
          }
          const result = await api.setConfig(key, data.value);
          return createJsonResponse({ success: result }, request);
        } else if (path.startsWith("configs/") && method === "DELETE") {
          const key = path.substring("configs/".length);
          const result = await api.deleteConfig(key);
          return createJsonResponse({ success: result }, request);
        } else if (path === "export" && method === "GET") {
          const data = await api.exportData();
          return createJsonResponse(data, request, {
            headers: {
              "Content-Disposition": "attachment; filename=navhive-data.json",
              "Content-Type": "application/json"
            }
          });
        } else if (path === "import" && method === "POST") {
          const data = await validateRequestBody(request);
          const validation = validateExportData(data);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: "导入数据验证失败",
                errors: validation.errors
              },
              request,
              { status: 400 }
            );
          }
          const result = await api.importData(data);
          return createJsonResponse(result, request);
        }
        const prefsAPI = new PreferencesAPI(env.DB);
        const { userId } = await getUserIdentifier(request, api);
        if (path === "preferences/favorites" && method === "GET") {
          try {
            const favorites = await prefsAPI.getFavorites(userId);
            return createJsonResponse({ favorites }, request);
          } catch (error) {
            return createErrorResponse(error, request, "获取收藏列表");
          }
        } else if (path.startsWith("preferences/favorites/") && method === "POST") {
          const siteIdStr = path.split("/")[2];
          const validation = validateFavoriteRequest(siteIdStr);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          try {
            await prefsAPI.addFavorite(userId, validation.sanitizedData);
            return createJsonResponse({ success: true, message: "收藏成功" }, request);
          } catch (error) {
            if (error instanceof Error && error.message === "该站点已在收藏列表中") {
              return createJsonResponse({ success: false, message: error.message }, request, {
                status: 409
              });
            }
            if (error instanceof Error && error.message === "站点不存在") {
              return createJsonResponse({ success: false, message: error.message }, request, {
                status: 404
              });
            }
            return createErrorResponse(error, request, "添加收藏");
          }
        } else if (path.startsWith("preferences/favorites/") && method === "DELETE") {
          const siteIdStr = path.split("/")[2];
          const validation = validateFavoriteRequest(siteIdStr);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          try {
            await prefsAPI.removeFavorite(userId, validation.sanitizedData);
            return createJsonResponse({ success: true, message: "取消收藏成功" }, request);
          } catch (error) {
            return createErrorResponse(error, request, "删除收藏");
          }
        } else if (path === "preferences/settings" && method === "GET") {
          try {
            const preferences = await prefsAPI.getPreferences(userId);
            return createJsonResponse({ preferences }, request);
          } catch (error) {
            return createErrorResponse(error, request, "获取偏好设置");
          }
        } else if (path === "preferences/settings" && method === "PUT") {
          const data = await validateRequestBody(request);
          const validation = validatePreferencesUpdate(data);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          try {
            await prefsAPI.updatePreferences(userId, validation.sanitizedData);
            return createJsonResponse({ success: true, message: "偏好设置已更新" }, request);
          } catch (error) {
            return createErrorResponse(error, request, "更新偏好设置");
          }
        } else if (path.startsWith("preferences/visits/") && method === "POST") {
          const siteIdStr = path.split("/")[2];
          const validation = validateFavoriteRequest(siteIdStr);
          if (!validation.valid) {
            return createJsonResponse(
              {
                success: false,
                message: `验证失败: ${validation.errors?.join(", ")}`
              },
              request,
              { status: 400 }
            );
          }
          try {
            await prefsAPI.recordVisit(userId, validation.sanitizedData);
            return createJsonResponse({ success: true }, request);
          } catch (error) {
            return createErrorResponse(error, request, "记录访问");
          }
        } else if (path === "preferences/visits" && method === "GET") {
          try {
            const limitStr = url.searchParams.get("limit");
            const limit = limitStr ? parseInt(limitStr, 10) : 20;
            if (isNaN(limit) || limit < 1) {
              return createJsonResponse(
                {
                  success: false,
                  message: "limit 参数必须是正整数"
                },
                request,
                { status: 400 }
              );
            }
            const visits = await prefsAPI.getRecentVisits(userId, limit);
            return createJsonResponse({ visits }, request);
          } catch (error) {
            return createErrorResponse(error, request, "获取访问记录");
          }
        } else if (path === "preferences/migrate" && method === "POST") {
          if (!isAuthenticated) {
            return createJsonResponse(
              {
                success: false,
                message: "必须登录后才能迁移数据"
              },
              request,
              { status: 401 }
            );
          }
          const data = await validateRequestBody(request);
          if (!data || typeof data !== "object" || !("device_identifier" in data)) {
            return createJsonResponse(
              {
                success: false,
                message: "缺少 device_identifier 参数"
              },
              request,
              { status: 400 }
            );
          }
          const deviceId = data.device_identifier;
          if (typeof deviceId !== "string" || !deviceId.startsWith("guest_")) {
            return createJsonResponse(
              {
                success: false,
                message: "无效的 device_identifier 格式"
              },
              request,
              { status: 400 }
            );
          }
          try {
            const migrated = await prefsAPI.migrateGuestData(deviceId, userId);
            return createJsonResponse(
              {
                success: true,
                message: "偏好数据迁移成功",
                migrated
              },
              request
            );
          } catch (error) {
            return createErrorResponse(error, request, "迁移偏好数据");
          }
        }
        return createResponse("API路径不存在", request, { status: 404 });
      } catch (error) {
        return createErrorResponse(error, request, "API 请求");
      }
    }
    return createResponse("Not Found", request, { status: 404 });
  }
};
function validateLogin(data) {
  const errors = [];
  if (!data.username || typeof data.username !== "string") {
    errors.push("用户名不能为空且必须是字符串");
  }
  if (!data.password || typeof data.password !== "string") {
    errors.push("密码不能为空且必须是字符串");
  }
  if (data.rememberMe !== void 0 && typeof data.rememberMe !== "boolean") {
    errors.push("记住我选项必须是布尔值");
  }
  return { valid: errors.length === 0, errors };
}
function validateGroup(data) {
  const errors = [];
  const sanitizedData = {};
  if (!data.name || typeof data.name !== "string") {
    errors.push("分组名称不能为空且必须是字符串");
  } else {
    sanitizedData.name = data.name.trim().slice(0, 100);
  }
  if (data.order_num === void 0 || typeof data.order_num !== "number") {
    errors.push("排序号必须是数字");
  } else {
    sanitizedData.order_num = data.order_num;
  }
  if (data.is_public !== void 0) {
    if (typeof data.is_public === "number" && (data.is_public === 0 || data.is_public === 1)) {
      sanitizedData.is_public = data.is_public;
    } else {
      errors.push("is_public 必须是 0 (私密) 或 1 (公开)");
    }
  } else {
    sanitizedData.is_public = 1;
  }
  return {
    valid: errors.length === 0,
    errors,
    sanitizedData: errors.length === 0 ? sanitizedData : void 0
  };
}
function validateSite(data) {
  const errors = [];
  const sanitizedData = {};
  if (!data.group_id || typeof data.group_id !== "number") {
    errors.push("分组ID必须是数字且不能为空");
  } else {
    sanitizedData.group_id = data.group_id;
  }
  if (!data.name || typeof data.name !== "string") {
    errors.push("站点名称不能为空且必须是字符串");
  } else {
    sanitizedData.name = data.name.trim().slice(0, 100);
  }
  if (!data.url || typeof data.url !== "string") {
    errors.push("URL不能为空且必须是字符串");
  } else {
    let url = data.url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    try {
      new URL(url);
      sanitizedData.url = url;
    } catch {
      errors.push("无效的URL格式");
    }
  }
  if (data.icon !== void 0) {
    if (typeof data.icon !== "string") {
      errors.push("图标URL必须是字符串");
    } else if (data.icon) {
      let iconUrl = data.icon.trim();
      if (!/^https?:\/\//i.test(iconUrl) && !/^data:/i.test(iconUrl)) {
        iconUrl = "https://" + iconUrl;
      }
      try {
        new URL(iconUrl);
        sanitizedData.icon = iconUrl;
      } catch {
        errors.push("无效的图标URL格式");
      }
    } else {
      sanitizedData.icon = "";
    }
  }
  if (data.description !== void 0) {
    sanitizedData.description = typeof data.description === "string" ? data.description.trim().slice(0, 500) : "";
  }
  if (data.notes !== void 0) {
    sanitizedData.notes = typeof data.notes === "string" ? data.notes.trim().slice(0, 1e3) : "";
  }
  if (data.order_num === void 0 || typeof data.order_num !== "number") {
    errors.push("排序号必须是数字");
  } else {
    sanitizedData.order_num = data.order_num;
  }
  if (data.is_public !== void 0) {
    if (typeof data.is_public === "number" && (data.is_public === 0 || data.is_public === 1)) {
      sanitizedData.is_public = data.is_public;
    } else {
      errors.push("is_public 必须是 0 (私密) 或 1 (公开)");
    }
  } else {
    sanitizedData.is_public = 1;
  }
  return {
    valid: errors.length === 0,
    errors,
    sanitizedData: errors.length === 0 ? sanitizedData : void 0
  };
}
function validateConfig(data) {
  const errors = [];
  if (data.value === void 0 || typeof data.value !== "string") {
    errors.push("配置值必须是字符串类型");
  }
  return { valid: errors.length === 0, errors };
}
const workerEntry = index ?? {};
export {
  workerEntry as default
};
