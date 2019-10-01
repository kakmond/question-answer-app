import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import moment from 'moment'
Vue.filter('formatDate', function (timestamp) {
  if (timestamp) {
    const date = new Date(timestamp);
    return moment(date).format('MM/DD/YYYY | hh:mm:ss')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')