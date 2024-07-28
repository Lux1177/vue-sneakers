import './assets/main.css'

import { createApp } from 'vue'
import router from '@/plugins/router.js'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')