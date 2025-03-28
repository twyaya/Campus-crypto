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

// mdi 圖標
import '@mdi/font/css/materialdesignicons.css' 

// 創建 Vuetify 實例，並加載指定的元件和指令
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      dark: {
        // 在此處可自定義暗色主題顏色
        dark: true, // 啟用暗色主題
        colors: {
          background: '#121212',  // 可以自定義背景顏色
          surface: '#1E1E1E',      // 可以自定義表面顏色
          primary: '#6200EE',      // 主題顏色
          secondary: '#03DAC6',    // 輔助顏色
        },
      },
      light: {
        // 自定義亮色主題顏色（可選）
        dark: false,
      },
    },
  },
  
})

// 創建 Vue 應用並使用插件
const app = createApp(App)

app.use(vuetify)  // 使用 Vuetify
app.use(createPinia())  // 使用 Pinia
app.use(router)  // 使用 Vue Router

// 挂載應用程式
app.mount('#app')
