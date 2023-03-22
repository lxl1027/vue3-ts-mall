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