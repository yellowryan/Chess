import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vueSwiper from 'vue-awesome-swiper' 
import 'swiper/css/swiper.css'


Vue.config.productionTip = false

Vue.use(vueSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
