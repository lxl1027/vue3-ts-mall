import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// 引入路由
import router from './router'
import store from './store'

import './assets/fonts/iconfont.css'
import './assets/flexible.js'
import './styles/reset.css'

import vant from 'vant'
import 'vant/lib/index.css'
app.use(vant)


app.use(store)
// 注册路由
app.use(router)

app.mount('#app')
