<script setup>
document.title = "Lazy Coder | HTML Previewer";
</script>

<template>
  <main>
    <iframe
      width="100%"
      allow="fullscreen; clipboard-read; clipboard-write"
      class="html-previewer"
      src="https://htmlpreviewer.netlify.app/"
    />
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
.html-previewer {
  width: 100vw;
  margin-top: 15px;
  height: calc(100vh - 90px);
  border: none;
}
#app {
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: 0 !important;
}
@media screen and (min-width: 1560px) {
  main,
  #app {
    max-width: 100% !important;
    margin: 0 auto !important;
    padding: 0 !important;
  }
}
</style>
