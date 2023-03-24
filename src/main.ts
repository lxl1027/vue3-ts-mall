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

app.config.globalProperties.$filters = {
    prefix(url: string) {
        if (url && url.startsWith('http')) {
            return url
        } else {
            return `http://backend-api-01.newbee.ltd${url}`
        }
    }
}

type Filters = {
    prefix(url: string): string
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $filters: Filters
    }
}

app.mount('#app')
