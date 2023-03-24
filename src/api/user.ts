import http from '@/utils/http'
import md5 from 'js-md5'

// register
export const register = (name: string, password: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: '/user/register',
        method: 'post',
        data: {
            loginName: name,
            password,
        }
    })
}
// login
export const login = (name: string, password: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: string
    }>({
        url: '/user/login',
        method: 'post',
        data: {
            loginName: name,
            passwordMd5: md5(password)
        }
    })
}
// logout
export const logout = () => {
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: '/user/logout',
        method: 'post'
    })
}
// 获取用户信息
export const getInfo = () => {
    return http.request<{
        resultCode: number
        message: string
        data: {
            introduceSign: string
            loginName: string
            nickName: string
        }
    }>({
        url: '/user/info',
        method: 'get'
    })
}

// 更改用户信息
export const modifyInfo = (name: string, intro: string, password: string) => {
    const params: {
        introduceSign: string
        passwordMd5?: string
        nickName: string
    } = {
        nickName: name,
        introduceSign: intro,
    }
    if (password !== '') {
        params.passwordMd5 = md5(password)
    }
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: '/user/info',
        method: 'put',
        data: params
    })
}