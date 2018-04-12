import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'md5'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.md5 = md5
Vue.use(ElementUI)

// router.beforeEach((to, from, next) => {
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
