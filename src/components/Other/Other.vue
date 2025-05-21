<template>
  <div class="main">
    <div class="other-list">
      <div class="other-list_item copyitems">
        <h3>Почты проектов</h3>
        <p>Почты проектов для СПАМ-теста:</p>
        <div class="other-list_item-info">
          <ul>
            <li v-for="item in projects" :key="item.id">
              <span
                v-for="email in item.email"
                :key="email.id"
                v-clipboard="email"
                class="cancopy"
                >{{ email }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="other-list_item copyitems">
        <div class="tabs">
          <h3>Промокоды</h3>
        </div>
        <p>Ссылки на бездепозитные предложения</p>
        <div class="other-list_item-info">
          <ul>
            <li
              v-for="item in projects"
              v-clipboard="item.promocode"
              :key="item.id"
              class="cancopy"
            >
              <strong v-if="item.promocode">{{ item.project }}:</strong>
              {{ item.promocode }}
            </li>
          </ul>
        </div>
      </div>
      <div class="other-list_item copyitems">
        <div class="tabs">
          <h3>Бонус-коды</h3>
        </div>
        <p>Ссылки на депозитные предложения</p>
        <div class="other-list_item-info">
          <ul>
            <li
              v-for="item in projects"
              v-clipboard="item.bonuscode"
              :key="item.id"
              class="cancopy"
            >
              <strong v-if="item.bonuscode">{{ item.project }}:</strong>
              {{ item.bonuscode }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Other",

  data() {
    return {
      message: "",
      text: "",
    };
  },
  computed: {
    ...mapState(["projects"])
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
}
.copyitems {
  position: relative;
  &:after {
    content: "Нажми на элемент, чтобы скопировать";
    position: absolute;
    top: -15px;
    right: -15px;
    background-color: #9db0fc;
    padding: 5px;
    border-radius: 8px;
    font-size: 12px;
    color: #0d0d0d;
    width: 122px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  }
}
.other-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  &_item {
    background-color: #0d0d0d;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 12px;
    border-radius: 8px;
    flex: 1 1 auto;
    h3 {
      color: #fff;
    }
    &-info {
      color: #fff;
      padding: 10px 5px 0px;
      .cancopy {
        cursor: pointer;
        transition: 0.3s ease;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: fit-content;
        word-break: break-all;
        &:hover {
          color: #9db0fc;
        }
      }
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        li {
          word-wrap: break-word;
          margin-bottom: 5px;
          padding-left: 10px;
          border-left: 2px solid #9db0fc;
          strong {
            font-weight: 800;
            margin-right: 5px;
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
