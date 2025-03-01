import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Pinia (狀態管理)
import { createPinia } from 'pinia'

// Vue Router
import router from './router'

// Components
import App from './App.vue'

// 創建 Vuetify 實例，並加載指定的元件和指令
const vuetify = createVuetify({
  components,
  directives,
})

// 創建 Vue 應用並使用插件
const app = createApp(App)

app.use(vuetify)  // 使用 Vuetify
app.use(createPinia())  // 使用 Pinia
app.use(router)  // 使用 Vue Router

// 挂載應用程式
app.mount('#app')
