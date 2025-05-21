<template>
  <div class="hamburger" :class="{ opened: !isActive }" @click="toggleClass">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div class="menu" :class="{ opened: !isActive }">
    <nav>
      <p>Навигация</p>
      <router-link @click="toggleClass" to="/currency-typograf"
        >SendGrid типограф</router-link
      >
      <router-link @click="toggleClass" to="/customer-currency-typograf"
        >Customer типограф</router-link
      >
      <router-link @click="toggleClass" to="/subjects-editor"
        >Редактор тем</router-link
      >
      <router-link @click="toggleClass" to="/color-picker"
        >Цветовая палитра</router-link
      >
      <router-link @click="toggleClass" to="/others">Полезности</router-link>
      <router-link @click="toggleClass" to="/html-previewer"
        >HTMLPreviewer</router-link
      >
      <p>Другие ссылки</p>
      <a target="_blank" href="https://www.artlebedev.ru/typograf/">Типограф</a>
      <a
        target="_blank"
        href="https://jetmail.atlassian.net/wiki/spaces/promo/pages/4354375786"
        >Актуальные ссылки</a
      >
      <a
        target="_blank"
        href="https://docs.google.com/spreadsheets/d/1hIz4LoWjD7dxPPtemYB4AVf_Sehp9lHlMnBsFNrAeqk/edit?gid=1848114999#gid=1848114999"
        >PROMO бонусы 2025</a
      >
      <a
        target="_blank"
        href="https://www.figma.com/file/XwWy4dCg31sXF26vOLMDjg/%D0%9F%D0%B8%D1%81%D1%8C%D0%BC%D0%B0?type=design&node-id=1-5&mode=design&t=yTCkSlatNA6WvtQ3-0"
        >Figma</a
      >
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    toggleClass() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss">
.menu {
  position: fixed;
  left: -100%;
  top: 0;
  height: 100vh;
  min-width: 200px;
  padding: 40px 20px;
  background-color: #1f1f1f;
  box-shadow: 2px 4px 16px rgba($color: #000000, $alpha: 0.3);
  z-index: 99;
  transition: 0.3s ease;
  &.opened {
    left: 0;
  }
  a {
    width: fit-content;
    display: flex;
  }
  nav {
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    p {
      margin-bottom: 5px;
      margin-left: -5px;
      color: #585858;
      &:not(:first-child) {
        border-top: 1px solid #9db0fc;
        margin-top: 10px;
        padding-top: 10px;
      }
    }
  }
}

.hamburger {
  position: fixed;
  left: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  width: 20px;
  height: 20px;
  z-index: 9999;
  cursor: pointer;
  transition: 0.3s ease;
  span {
    width: 100%;
    background-color: #9db0fc;
    height: 2px;
    margin: 2px 0;
    transition: 0.3s ease;
  }
  &.opened {
    left: 150px;
    transition: 0.3s ease;
    &:hover {
      span {
        background-color: #9db0fc;
      }
    }
    span {
      background-color: #fff;
      &:first-child {
        transform: translate(0px, 7px) rotate(-45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:last-child {
        transform: translate(0px, -5px) rotate(45deg);
      }
    }
  }
}
.link-helper {
  font-size: 8px;
  color: #9db0fc;
  margin-top: -6px;
  display: flex;
}
</style>
