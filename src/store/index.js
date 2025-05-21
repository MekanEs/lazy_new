import { createStore } from "vuex";

export default createStore({
  state: {
    curr: {
      RUB: "&#8381;",
      EUR: "&#8364;",
      USD: "&#36;",
      UAH: "&#8372;",
      KZT: "&#8376;",
      NOK: "kr",
      PLN: "z&#x142;",
      TRY: "&#8378;",
      CAD: "C&#36;",
      AUD: "AUD",
      AZN: "&#8380;",
      NZD: "NZD",
      BRL: "R&#36;",
      INR: "&#8377;",
      ARS: "ARS",
      MXN: "MXN",
      PEN: "PEN",
      NGN: "NGN",
      ZAR: "ZAR",
      CLP: "CLP",
      DKK: "kr",
      SEK: "kr",
      RON: "RON",
      HUF: "Ft",
      JPY: "&#165;",
      BTC: "BTC",
      ETH: "ETH",
      LTC: "LTC",
      BCH: "BCH",
      BTC: "BTC",
      XRP: "XRP",
      TRX: "TRX",
      DOGE: "DOGE",
      USDT: "USDT",
    },
    sendgrid: {
      start: "{{#equals account_currency ",
      end: "{{/equals}}",
      symb: /[A-Z]+\w/,
    },
    projects: [
      {
        email: ["1go@1goinfo.email"],
        project: "1GO",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#EF4136", "#E08211"]
      },
      {
        email: ["drip@dripinfo.email"],
        project: "DRIP",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#00C193"]
      },
      {
        email: ["gizbo@gizboinfo.email"],
        project: "GIZBO",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#7ACFFF", "#19FFD6"]
      },
      {
        email: ["flagman@flagmaninfo.email", "flagman@flagmantech.email"],
        project: "FLAGMAN",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#12A849", "#F27730"]
      },
      {
        email: ["fresh@freshinfo.email"],
        project: "FRESH",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#83B812"]
      },
      {
        email: ["izzi@izziinfo.email"],
        project: "IZZI",
        promocode: "/promo-code/XXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#7cfbdc"]
      },
      {
        email: ["irwin@irwininfo.email", "irwin@irwintech.email"],
        project: "IRWIN",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#ACFF00", "#DB53FF"]
      },
      {
        email: ["jet@jetinfo.email"],
        project: "JET",
        promocode: "/promo-code%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#1183FF"]
      },
      {
        email: ["legzo@legzoinfo.email"],
        project: "LEGZO",
        promocode: "/bonuses%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#90A7FF"]
      },
      {
        email: ["lex@lexinfo.email"],
        project: "LEX",
        promocode: "/bonuses%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DOCTOO",
        color: ["#F4D483"]
      },
      {
        email: ["monro@monroinfo.email"],
        project: "MONRO",
        promocode: "profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/deposit%3Fbonus-code%3DXXXX",
        color: ["#FF4C00", "#007AFE"]
      },
      {
        email: ["rox@roxinfo.net"],
        project: "ROX",
        promocode: "/profile/promo%3Fpromo-code%3DXXXX",
        bonuscode: "/profile/deposit%3Fbonus-code%3DXXXX",
        color: ["#ceb073"]
      },
      {
        email: ["starda@stardainfo.email"],
        project: "STARDA",
        promocode:
          "/promo%3Fmy_account%3Dtrue%26acc_page%3Dacc_my_promo%26promo_code%3DXXXX",
        bonuscode: "/profile/deposit%3Fbonus-code%3DXXXX",
        color: ["#E92139"]
      },
      {
        email: ["sol@solinfo.email"],
        project: "SOL",
        promocode: "/profile/edit%3Fpromo_code%3DXXXX",
        bonuscode: "/profile/deposit%3Fbonus-code%3DXXXX",
        color: ["#F09235"]
      },
      {
        email: ["volna@volnainfo.email"],
        project: "VOLNA",
        promocode: "/profile/promo%3Fpromo-code%3DXXXX",
        bonuscode: "/profile/deposit%3Fbonus-code%3DXXXX",
        color: ["#9EDD44", "#51c5f6"]
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {},
});
