<template>
  <form>
    <div class="checkbox_item citem_1">
      <div class="title">
        {{ newFormat ? "New Format" : "Old Format" }}
      </div>
      <label class="checkbox_wrap">
        <input
          @change="saveStatusToLocalStorage"
          v-model="newFormat"
          type="checkbox"
          name="checkbox"
          class="checkbox_inp"
        />
        <span class="checkbox_mark"></span>
      </label>
    </div>
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
      newFormat: true,
    };
  },
  mounted() {
    this.$refs.textarea.focus();
    this.newFormat =
      JSON.parse(localStorage.getItem("checkbox-status")) || false;
  },
  computed: {
    ...mapState(["curr"]),
    ...mapState(["sendgrid"]),
  },
  methods: {
    converter(country) {
      if (this.newFormat) {
        this.sgToCustomer();
      } else {
        this.changeProject();
      }
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
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;)+[A-Z]+(\{{\/equals}})/g,
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
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;)+[A-Z]+(\{{\/equals}})/g,
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
              /(\{{#equals account_currency \"+[A-Z]+\" }})+(&nbsp;|\-&nbsp;)+[A-Z]+(\{{\/equals}})/g,
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
    saveStatusToLocalStorage() {
      localStorage.setItem("checkbox-status", JSON.stringify(this.newFormat));
    },
    sgToCustomer() {
      const arr = [];
      const arr2 = [];
      const text = this.text;
      const strToArrayKeys = function () {
        let textInput = text;
        let textSplitted = textInput.split("{{/equals}}");
        textSplitted.pop();
        textSplitted.forEach((element) => {
          element = element
            .replace(/{{#equals account_currency "/, "")
            .replace(/"}}|" }}/, "=")
            .replace(/&nbsp;.*$/, "")
            .replace(/,/, ".");
          const [key, value] = element.split("=");
          if ((value == 0) | (value == "-")) {
            return false;
          }
          arr.push({ key, value });
          return { key, value };
        });
      };

      const arraySort = () => {
        arr.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
        return arr;
      };

      const arrayToString = () => {
        const result = mergeKeysAndValues(arr);

        result.forEach((element) => {
          const a = element.keys.join('", "');

          let str = `{% when "${a}" %}${element.value}`.replace(/\./, ",");
          arr2.push(str);
        });
        if (arr2.length == 0) {
          return false;
        }
        arr2.unshift("{% case customer.currency %}");
        arr2.push("{% endcase %}{{snippets.currency_icon}}");
      };

      const mergeKeysAndValues = (arr) => {
        const merged = {};

        arr.forEach(({ key, value }) => {
          if (!merged[value]) {
            merged[value] = { keys: [], value };
          }
          merged[value].keys.push(key);
        });

        return Object.values(merged);
      };

      strToArrayKeys();
      arraySort();
      arrayToString();
      const endArr = arr2.join("");
      this.text = endArr;
    },
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
    changeProject() {
      this.text = this.text
        .replaceAll(
          '{{#equals account_currency "',
          '{% if customer.currency == "'
        )
        .replaceAll('" }}' || '"}}', '" %}')
        .replaceAll("{{/equals}}", "{% endif %}");

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
    displayTextConvert() {
      this.displayText = this.text
        .replace(
          /{{#equals account_currency "|{% case customer.currency %}{% when "|{% if customer.currency == "|{% when "/g,
          "<strong style='color: #ff9c19; margin-right: 6px; margin-left: 15px;'>"
        )
        .replace(/(" }}|"}}|" %}|"%})/g, ":</strong> ")
        .replace(/"/g, "")
        .replace(
          /{{\/equals}}|{% endif %}|{% endcase %}{{snippets.currency_icon}}/g,
          "</span> "
        );
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");

.checkbox_item .title {
  font-size: 14px;
  letter-spacing: 3px;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
}

.checkbox_item .checkbox_wrap {
  position: relative;
  display: block;
  cursor: pointer;
  width: 50px;
  margin: 0 auto 10px;
}

.checkbox_item:last-child .checkbox_wrap {
  margin-bottom: 0;
}

.checkbox_item .checkbox_wrap .checkbox_inp {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
}

.checkbox_item .checkbox_wrap .checkbox_mark {
  display: inline-block;
  position: relative;
  border-radius: 25px;
}

.checkbox_item .checkbox_wrap .checkbox_mark:before,
.checkbox_item .checkbox_wrap .checkbox_mark:after {
  content: "";
  position: absolute;
  transition: all 0.5s ease;
}

/* basic styles */
.checkbox_item.citem_1 .checkbox_wrap .checkbox_mark {
  background: #f0f0f0;
  width: 40px;
  height: 15px;
  padding: 2px;
}

.checkbox_item.citem_1 .checkbox_wrap .checkbox_mark:before {
  top: 0px;
  left: 1px;
  width: 15px;
  height: 15px;
  background: #9db0fc;
  border-radius: 50%;
}

.checkbox_item.citem_1 .checkbox_wrap .checkbox_inp:checked ~ .checkbox_mark {
  background: #9db0fc;
}

.checkbox_item.citem_1
  .checkbox_wrap
  .checkbox_inp:checked
  ~ .checkbox_mark:before {
  left: 25px;
  background: #f0f0f0;
}
</style>
