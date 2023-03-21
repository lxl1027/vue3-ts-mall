import http from '@/utils/http'

type GoodInfo = {
    goodsCarouselList: Array<string>
    goodsCoverImg: string
    goodsDetailContent: string
    goodsId: number
    goodsIntro: string
    goodsName: string
    originalPrice: number
    sellingPrice: number
    tag: string
}
type cartItem = {
    cartItemId: number
    goodsCount: number
    goodsCoverImg: string
    goodsId: number
    goodsName: string
    sellingPrice: number
}

export const getGoodDetail = (id: string) => {
    return http.request<{
        resultCode: number
        message: string
        data: GoodInfo
    }>({
        url: `/goods/detail/${id}`,
        method: 'get'
    })
}

export const getCart = () => {
    return http.request<{
        resultCode: number
        message: string
        data: cartItem[]
    }>({
        url: '/shop-cart',
        method: 'get',
    })
}

export const addGood = (count: number, id: number) => {
    return http.request<{
        resultCode: number
        message: string
        data: null
    }>({
        url: '/shop-cart',
        method: 'post',
        data: {
            goodsCount: count,
            goodsId: id
        }
    })
}