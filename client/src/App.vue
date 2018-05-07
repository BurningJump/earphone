<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
html, body, div, span, p, button, label, input, section, ul, ol {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
