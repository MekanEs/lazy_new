<template>
  <ul class="color-picker">
    <li v-for="item in projects" v-show="item.color" :key="item.id">
      <div
        class="color-picker_item"
        v-for="color in item.color"
        :key="color"
        v-clipboard="color"
        :style="{ backgroundColor: color }"
      >
        <i class="far fa-copy"></i>
        <h3>{{ item.project }}</h3>
        <span>{{ color }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ColorPalette",
  data() {
    return {
      message: "",
      text: "",
      canCopy: true,
    };
  },
  computed: {
    ...mapState(["projects"]),
  },
  methods: {
    checked() {
      this.canCopy != this.canCopy;
    },
  },
};
</script>

<style lang="scss" scoped>
.color-picker {
  max-width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  li {
    display: flex;
    gap: 10px;
  }
  &_item {
    width: 100%;
    min-width: 160px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 10px;
    border-radius: 8px;
    transition: 0.3s ease;
    cursor: pointer;
    z-index: 1;
    overflow: hidden;
    box-shadow: 2px 4px 16px rgba(#000, 0.2);
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, 0.5);
      transition: 0.3s ease;
    }
    * {
      z-index: 2;
    }
    span {
      color: #b9b9b9;
      transition: 0.3s ease;
    }
    h3 {
      color: #fff;
      font-weight: 600;
      user-select: none;
    }
    &:hover {
      background-color: #000;
      &::after {
        opacity: 0;
      }
      span {
        opacity: 1;
        margin-top: 0;
      }
      .fa-copy {
        opacity: 1;
        color: #fff;
      }
    }
    .fa-copy {
      position: unset !important;
      top: 20px !important;
      opacity: 0;
      transition: 0.3s ease;
    }
  }
}
</style>
