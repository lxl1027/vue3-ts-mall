import http from '@/utils/http'

type Data = {
    carousels: Carousel[]
    hotGoodses: Good[]
    newGoodses: Good[]
    recommendGoodses: Good[]
}
export type Good = {
    goodsCoverImg: string
    goodsId: number
    goodsIntro: string
    goodsName: string
    sellingPrice: number
    tag: string
}
export type Carousel = {
    carouselUrl: string
    redirectUrl: string
}

export const getHome = () => {
    return http.request<{
        resultCode: number
        message: string
        data: Data
    }>({
        url: '/index-infos',
        method: 'get'
    })
}