<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div>0000000000000<img :src="qrcode" alt=""></div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      qrcode: '',
      msg: 'Welcome to Your Vue.js App'
    };
  },
  mounted() {
    this.$http.post('https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=9_viQ2vNDGoY3Lmqxh4OmZs3aG4RNADNNgbBYS7b9ZNQOszoPreFN_pPi1NZTivA6DMywO7TfTxMgEjfarzH3GesDQU5grD0QuRTIeiqBRLiv9wt1bPPI-h6WI1LDAOgdPdqtzWkjJcIfnqozMZTIdAAAMGV', { 'scene': '123', 'page': 'pages/myPage/myPage' }).then(res => {
      console.log(res.data);
      this.qrcode = res.data;
    }).catch(err => {
      console.log(err);
    });
  }
};
</script>

<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
