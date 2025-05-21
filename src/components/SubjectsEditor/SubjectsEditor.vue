<template>
  <div class="main">
    <form>
      <div class="textarea-wrapper">
        <textarea
          class="sm-textarea"
          name="textarea"
          v-model="text"
          v-on="prettifySubjects(text)"
          ref="textarea"
        ></textarea>
        <textarea
          class="sm-textarea"
          name="textarea"
          v-model="message"
        ></textarea>
      </div>
      <div class="buttons-row">
        <transition name="fade">
          <i v-if="text" class="far fa-trash-alt" @click="clear"></i>
        </transition>
        <transition name="fade">
          <i v-if="text" @click="Copy" class="far fa-copy"></i>
        </transition>
        <span class="copied copied--right" :class="{ opened: !isActive }"
          >copied</span
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SubjectsEditor",

  data() {
    return {
      isActive: true,
      message: "",
      text: "",
    };
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  methods: {
    clear() {
      this.text = "";
      this.message = "";
    },
    prettifySubjects() {
      this.message =
        "Тема письма: \n" +
        this.text
          .replace(/{{else}}/g, "en}}")
          // .replace(/\//, "}}")
          .replace(
            /ru}}|en}}|de}}|fr}}|pt}}|es}}|tr}}|fi}}|ua}}|kz}}|ja}}|pl}}|hi}}|it}}/g,
            (str) => "\n" + str.toUpperCase() + ": "
          )
          .replace(
            /germanyuser|austriauser|braziluser|turkeyuser|japaneseuser|polanduser|italyuser/g,
            (str) => "\nEN" + str.toUpperCase() + ": "
          )
          .replace(/GERMANYUSER|AUSTRIAUSER/g, "DE+AT")
          .replace(/BRAZILUSER/g, "BR")
          .replace(/TURKEYUSER/g, "TR")
          .replace(/JAPANESEUSER/g, "JA")
          .replace(/ITALYUSER/g, "IT")
          .replace(/{{|}}|#if|else if|\/if}}|locales.|groups.|else|/g, "");
    },

    Copy() {
      this.isActive = !this.isActive;
      this.$clipboard(this.message);
      setTimeout(() => {
        this.isActive = !this.isActive;
      }, 3000);
      this.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  max-width: 80vw;
}
form {
  position: relative;
}
i.fa-trash-alt {
  color: #696969;
  font-size: 18px;
  position: absolute;
  left: -5px;
  top: 25px;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 4px;
  &:hover {
    color: #9db0fc;
  }
}
i.fa-copy {
  color: #696969;
  font-size: 18px;
  position: absolute;
  right: -5px;
  top: 25px;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 4px;
  &:hover {
    color: #9db0fc;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.sm-textarea {
  max-width: 40vw;
}
</style>
