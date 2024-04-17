import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const vuetify = createVuetify({
  components,
  directives,
  iconfont: 'mdi',
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')

