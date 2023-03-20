import axios from 'axios'
import { getToken, setToken } from './auth'
import { showFailToast, showNotify } from 'vant'
import router from '@/router'

// http://backend-api-01.newbee.ltd/api/v1
const http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://backend-api-01.newbee.ltd/api/v1' : 'http://backend-api-01.newbee.ltd/api/v1',
    timeout: 3000,
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    const token = getToken()
    // 如果有token 给请求头配置token
    if (token) {
        config.headers.token = token
    }
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 请求回来的data如果不是object说明服务端出现异常
    if (typeof response.data !== 'object') {
        showFailToast('服务端繁忙，请稍后再试！')
    }
    // code不等于200和500
    if (response.data.resultCode !== 200) {
        // 返回的数据中如果存在message 提示message
        if (response.data.message) showNotify({
            message: response.data.message,
            type: 'danger',
            duration: 1000
        })
        // 如果code为416需要返回登录页面
        if (response.data.resultCode === 416) {
            router.push('/login')
        }
        return Promise.reject(response.data.message)
    }
    // 如果response.data.data存在 且 window.location.hash == '#/login'
    if (response.data.data && window.location.hash == '#/login') {
        console.log(1)
        setToken(response.data.data)
        http.defaults.headers['token'] = response.data.data
    }
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default http