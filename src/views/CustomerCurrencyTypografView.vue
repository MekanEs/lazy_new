<script setup>
import CustomerCurrencyTypograf from "@/components/CurrencyTypograf/CustomerCurrencyTypograf.vue";
document.title = "Lazy Coder | Customer Currency Typograf";
</script>

<template>
  <main>
    <h1 class>Customer Currency typograf</h1>
    <CustomerCurrencyTypograf />

    <div class="manual">
      <h1>User Manual</h1>
      <ul>
        <li>
          <b>Convert</b> - разделить суммы неразрывным пробелом, а так же убрать
          пустые значения.
          <div style="font-size: 13px">
            <b>Вид депозита:</b> <mark>1&nbsp;999&nbsp;&#8381;</mark><br />
            <b>Вид ставок:</b> <mark>0,1&nbsp;&#8364;</mark>
          </div>
        </li>
        <li>
          <b>TR Convert</b> - разделить суммы точками, а так же убрать пустые
          значения для турецкой локали.
          <div style="font-size: 13px">
            <b>Вид депозита:</b> <mark>1.999&nbsp;&#8381;</mark><br />
            <b>Вид ставок:</b> <mark>0,1&nbsp;&#8364;</mark>
          </div>
        </li>
        <li>
          <b>JA Convert</b> - разделить суммы запятыми, а так же убрать пустые
          значения для японской локали. <br />
          <div style="font-size: 13px">
            <b>Вид депозита:</b> <mark>&#8381;&nbsp;1,999</mark><br />
            <b>Вид ставок:</b> <mark>&#8364;&nbsp;0.1</mark>
          </div>
        </li>
        <li>
          <b>IT Convert</b> - разделить суммы точками, а так же убрать пустые
          значения для итальянской локали. <br />
          <div style="font-size: 13px">
            <b>Вид депозита:</b> <mark>&#8381;&nbsp;1.000,00</mark><br />
            <b>Вид ставок:</b> <mark>&#8364;&nbsp;0,10</mark>
          </div>
        </li>
        <li>
          <b>HI Convert</b> - разделить суммы неразрывным пробелом, а так же
          убрать пустые значения для индийской локали.
          <div style="font-size: 13px">
            <b>Вид депозита:</b> <mark>1&nbsp;999&nbsp;&#8381;</mark><br />
            <b>Вид ставок:</b> <mark>0.1&nbsp;&#8364;</mark>
          </div>
        </li>
        <li>
          <b>1GO BRL</b> - разделить суммы неразрывным пробелом, а так же убрать
          пустые значения, видоизменить формулу для <b>1GO</b> (SUM R&#36; =>
          R&#36; SUM).
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.manual {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 64px;
  padding: 20px;
  background: #0d0d0d;
  border-radius: 8px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      margin: 0;
      b {
        font-weight: 700;
        color: #ffffff;
      }
      mark {
        background-color: #ff9c19;
        font-family: monospace;
        padding: 4px;
        border-radius: 4px;
      }
    }
  }
}
</style>