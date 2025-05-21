<template>
  <form>
    <div class="textarea-wrapper">
      <div class="col">
        <span class="copied copied--left" :class="{ opened: !isActive }"
          >copied</span
        >
        <transition name="fade">
          <i v-if="text" class="far fa-copy" @click="Copy"></i>
        </transition>
        <transition name="fade">
          <i v-if="text" class="far fa-trash-alt" @click="clear(text)"></i>
        </transition>
        <textarea
          @input="displayTextConvert"
          name="textarea"
          id="textarea"
          v-model="text"
          ref="textarea"
        ></textarea>
        <div class="col">
          <div class="buttons-row">
            <input type="button" @click="converter('def')" value="Convert" />
            <input type="button" @click="converter('tr')" value="TR Convert" />
            <input type="button" @click="converter('ja')" value="JA Convert" />
            <input type="button" @click="converter('it')" value="IT Convert" />
            <input type="button" @click="converter('hi')" value="HI Convert" />
            <input type="button" @click="converter('_1go')" value="1GO BRL" />
            <input
              type="button"
              @click="changeCur(text)"
              value="Change Currency"
            />
          </div>
          <div class="col">
            <transition name="fade">
              <i
                v-if="textPaste"
                class="far fa-trash-alt trash-paste"
                @click="clear(textPaste)"
              ></i>
            </transition>
            <textarea
              placeholder="clipboard to code"
              name="textareaPaste"
              id="textareaPaste"
              v-model="textPaste"
              @paste="pasteFromTable"
              @input="displayTextConvert"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="currency-row hidden">
        <input type="text" v-model="number" />
        <ul>
          <li v-for="(value, name) in curr" :key="value.id">
            <input
              type="button"
              @click="addCurrency(value, name)"
              :value="name"
            />
          </li>
        </ul>
      </div>
    </div>
  </form>
  <transition name="fade" v-if="text">
    <div class="display-area">
      <h1>Display</h1>
      <span class="display-area__text" v-html="displayText"></span>
    </div>
  </transition>
</template>

<script>
import { vModelSelect } from "vue";
import { mapState } from "vuex";
export default {
  name: "CurrencyTypograf",
  data() {
    return {
      showDisplay: true,
      showError: false,
      isActive: true,
      number: "",
      text: "",
      textPaste: "",
      displayText: "",
      symb: /[A-Z]+\w/,
    };
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  computed: {
    ...mapState(["curr"]),
    ...mapState(["sendgrid"]),
  },
  methods: {
    clear(val) {
      if (val == this.text) {
        this.text = "";
      } else {
        this.textPaste = "";
      }
    },
    addCurrency(value, name) {
      this.text +=
        '{{#equals account_currency "' +
        name +
        '" }}' +
        this.number +
        "&nbsp;" +
        value +
        "{{/equals}}";
      this.number = "";
    },
    pasteFromTable() {
      const clipboardData = event.clipboardData || window.clipboardData;
      if (!clipboardData) return;

      let result = [];

      // Парсим текст, если нет HTML
      const text = clipboardData.getData("text/plain");
      if (text) {
        result = text
          .split("\n")
          .map((row) => row.split("\t").map((cell) => cell.trim()));
      } else {
        return;
      }
      if (result[0][1].match(/[A-Z]+/)) {
        console.log("1");
        let [keys, vals] = result;
        this.text = keys
          .map(
            (key, i) =>
              `{{#equals account_currency "${key}" }}${vals[i]}&nbsp;${this.curr[key]}{{/equals}}`
          )
          .join("");
      } else {
        console.log("2");
        this.text = result
          .map(
            (row) =>
              `{{#equals account_currency "${row[0]}" }}${row[1] || 0}&nbsp;${
                this.curr[row[0]]
              }{{/equals}}`
          )
          .join("");
      }
    },
    converter(country) {
      switch (country) {
        case "def":
          this.text = this.text
            .split("")
            .reverse()
            .join("")
            .replace(/(\d)(?= ) /g, "$1")
            .replace(/\d{3}(?=\d)(?!\d#)/g, "$&;psbn&")
            .split("")
            .reverse()
            .join("")
            .replace(
              /(?<!\d)(\d{1,}\,\d{1,})((&nbsp;)(\d{1,})){1,}/g,
              (item) => {
                return item.replace(/(\d)&nbsp;(\d)/g, "$1$2");
              }
            )
            .replace(
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;|0&nbsp;)+[A-Z]+(\{{\/equals}})/g,
              ""
            );
          break;
        case "_1go":
          this.text = this.text
            .replace(/(0,\d+|\d+)+&nbsp;+(R&#36;)/g, "$2&nbsp;$1")
            .split("")
            .reverse()
            .join("")
            .replace(/(\d)(?= ) /g, "$1")
            .replace(/\d{3}(?=\d)(?!\d#)/g, "$&;psbn&")
            .split("")
            .reverse()
            .join("")
            .replace(
              /(R&#36;)(&nbsp;)(?<!\d)(\d{1,}\,\d{1,})((&nbsp;)(\d{1,})){1,}/g,
              (item) => {
                return item.replace(/(\d)&nbsp;(\d)/g, "$1$2");
              }
            )
            .replace(
              /(?<!\d)(\d{1,}\,\d{1,})((&nbsp;)(\d{1,})){1,}(&nbsp;)([A-Z]{1,})/g,
              (item) => {
                return item.replace(/(\d)&nbsp;(\d)/g, "$1$2");
              }
            )
            .replace(
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;|0&nbsp;)+[A-Z]+(\{{\/equals}})/g,
              ""
            );
          break;
        case "hi":
          this.text = this.text
            .split("")
            .reverse()
            .join("")
            .replace(/\,/g, ".")
            .replace(/(\d)(?= ) /g, "$1")
            .replace(/\d{3}(?=\d)(?!\d#)/g, "$&;psbn&")
            .split("")
            .reverse()
            .join("")
            .replace(
              /(?<!\d)(\d{1,}\.\d{1,})((&nbsp;)(\d{1,})){1,}/g,
              (item) => {
                return item.replace(/(\d)&nbsp;(\d)/g, "$1$2");
              }
            )
            .replace(
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;|0&nbsp;)+[A-Z]+(\{{\/equals}})/g,
              ""
            );
          break;
        case "tr":
          this.text = this.text
            .split("")
            .reverse()
            .join("")
            .replace(/(\d)(?= ) /g, "$1")
            .replace(/\d{3}(?=\d)(?!\d#)/g, "$&.")
            .split("")
            .reverse()
            .join("")
            .replace(/(?<!\d)(\d{1,}\,\d{1,})((\.)(\d{1,})){1,}/g, (item) => {
              return item.replace(/(\d)\.(\d)/g, "$1$2");
            })
            .replace(
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;|0&nbsp;)+[A-Z]+(\{{\/equals}})/g,
              ""
            );
          break;
        case "it":
          this.text = this.text
            .split("")
            .reverse()
            .join("")
            .replace(/(\d)(?= ) /g, "$1")
            .replace(/\d{3}(?=\d)(?!\d#)/g, "$&.")
            .split("")
            .reverse()
            .join("")
            .replace(/(0)(&nbsp;)/g, "$1,00$2")
            .replace(/(?<!\d)(\d{1,}\,\d{1,})((\.)(\d{1,})){1,}/g, (item) => {
              return item.replace(/(\d)\.(\d)/g, "$1$2");
            })
            .replace(/(\d{1,}\,.)&nbsp;/g, "$10&nbsp;")
            .replace(
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;|0&nbsp;)+[A-Z]+(\{{\/equals}})/g,
              ""
            );
          break;
        case "ja":
          let mystr = this.text.split("{{/equals}}");
          for (let i = 0; i < mystr.length - 1; i++) {
            mystr[i] = mystr[i]
              .replace(/(&nbsp;)(.*$)/, "|$2$1")
              .replace(
                /((\d|\d\d{1,}\d+|0\,d{1,}\d+)(\,)(\d{1,})|(\d+\,+\d{1,})|(\d{1,}))(\|.*&nbsp;)/,
                "$7$1"
              )
              .replace("|", "");
            mystr[i] += "{{/equals}}";
          }
          console.log(mystr);
          this.text = mystr
            .join("")
            .replace(/\,/g, ".")
            .split("")
            .reverse()
            .join("")
            .replace(/(\d)(?= ) /g, "$1")
            .replace(/\d{3}(?=\d)(?!\d#)/g, "$&,")
            .split("")
            .reverse()
            .join("")
            .replace(/(?<!\d)(\d{1,}\.\d{1,})((\,)(\d{1,})){1,}/g, (item) => {
              return item.replace(/(\d)\,(\d)/g, "$1$2");
            })
            .replace(
              /(\{{#equals account_currency \"+[A-Z]+\" }})+[A-Z]+(&nbsp;|\-&nbsp;|0&nbsp;)+(\{{\/equals}})|((\{{#equals account_currency \"+[A-Z]+\" }})+\-[A-Z]+(&nbsp;|\-&nbsp;)+(\{{\/equals}}))/g,
              ""
            );
          break;
      }
      this.displayTextConvert();
    },
    changeCur() {
      if (this.text.includes("account")) {
        this.text = this.text.replaceAll("account", "game");
      } else {
        this.text = this.text.replaceAll("game", "account");
      }
      this.displayTextConvert();
    },
    Copy() {
      this.isActive = !this.isActive;
      this.$clipboard(this.text);
      setTimeout(() => {
        this.isActive = !this.isActive;
      }, 3000);
      this.text = "";
    },
    displayShow() {
      this.showDisplay != this.showDisplay;
    },
    displayTextConvert() {
      this.displayText = this.text
        .replace(
          /{{#equals account_currency "|{{#equals game_currency "|{% if customer.currency == "/g,
          "<span style='white-space: nowrap; display: flex; margin-right: 10px;'><strong style='color: #ff9c19; margin-right: 6px'>"
        )
        .replace(/(" }}|"}}|" %}|"%})/g, ":</strong> ")
        .replace(/{{\/equals}}|{% endif %}/g, "</span>");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("style.scss");
</style>