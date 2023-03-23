import http from '@/utils/http'

type AddressInfoAdd = {
    cityName: string
    defaultFlag: number
    detailAddress: string
    provinceName: string
    regionName: string
    userName: string
    userPhone: string
}
export type AddressInfoGet = {
    userId: number
    addressId: number
    cityName: string
    defaultFlag: number
    detailAddress: string
    provinceName: string
    regionName: string
    userName: string
    userPhone: string
}
type AddressInfoEdit = {
    addressId: string
    cityName: string
    defaultFlag: number
    detailAddress: string
    provinceName: string
    regionName: string
    userName: string
    userPhone: string
}
export type AddressDefault = {
    addressId: number
    cityName: string
    createTime: string
    defaultFlag: number
    detailAddress: string
    isDeleted: number
    provinceName: string
    regionName: string
    updateTime: string
    userId: number
    userName: string
    userPhone: string
}

// 添加地址
export const addAddress = (addressInfo: AddressInfoAdd) => {
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: '/address',
        method: 'post',
        data: addressInfo
    })
}

// 获取全部地址
export const getAddress = () => {
    return http.request<{
        resultCode: number
        message: string
        data: AddressInfoGet[]
    }>({
        url: '/address',
        method: 'get'
    })
}

// 获取指定地址（进入地址编辑页面）
export const getSpecificAddress = (id: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: AddressInfoGet
    }>({
        url: `/address/${id}`,
        method: 'get'
    })
}

// 修改地址
export const modifyAddress = (addressInfo: AddressInfoEdit) => {
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: `/address`,
        method: 'put',
        data: addressInfo
    })
}

// 删除地址
export const deleteAddress = (id: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: `/address/${id}`,
        method: 'delete'
    })
}

// 获取默认地址
export const getDefaultAddress = () => {
    return http.request<{
        resultCode: number
        message: string
        data: AddressDefault
    }>({
        url: '/address/default',
        method: 'get'
    })
}