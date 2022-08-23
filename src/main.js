import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import 'regenerator-runtime/runtime';
import vuetify from './plugins/vuetify'

new Vue({
  render: h => h(App),
  vuetify,
  apolloProvider: createProvider()
}).$mount('#app')