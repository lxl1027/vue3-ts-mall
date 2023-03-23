import http from '@/utils/http'


export type OrderInfo = {
    createTime: string
    newBeeMallOrderItemVOS: Array<OrderGood>
    orderNo: string
    orderStatus: number
    orderStatusString: string
    payStatus: number
    payTime: string | null
    payType: 0 | 1 | 2
    payTypeString: string
    totalPrice: number
}
type OrderGood = {
    goodsCount: number
    goodsCoverImg: string
    goodsId: number
    goodsName: string
    sellingPrice: number
}
// 获取特定订单
export const getOrderByNo = (no: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: OrderInfo
    }>({
        url: `/order/${no}`,
        method: 'get'
    })
}

type Data = {
    addressId: number
    cartItemIds: number[]
}
// 保存订单
export const saveOrder = (data: Data) => {
    return http.request<{
        resultCode: number
        message: string
        data: string
    }>({
        url: '/saveOrder',
        method: 'post',
        data: data
    })
}
type GetAll = {
    currPage: number
    list: Array<Order>
    pageSize: number
    totalCount: number
    totalPage: number
}
export type Order = {
    createTime: string
    newBeeMallOrderItemVOS: Array<OrderGood>
    orderId: number
    orderNo: string
    orderStatus: number
    orderStatusString: string
    payType: number
    totalPrice: number
}
// 获取订单
export const getOrderList = (pageNumber: number, status: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: GetAll
    }>({
        url: '/order',
        method: 'get',
        params: {
            pageNumber: pageNumber ?? 1,
            status: status ?? '',
        }
    })
}

// 取消订单
export const cancelOrder = (no: string) => {
    return http.request<{
        data: null
        message: string
        resultCode: number
    }>({
        url: `/order/${no}/cancel`,
        method: 'put'
    })
}
// 支付订单
export const payOrder = (orderNo: string, type: number) => {
    return http.request<{
        data: null
        message: string
        resultCode: number
    }>({
        url: '/paySuccess',
        method: 'get',
        params: {
            orderNo,
            payType: type
        }
    })
}