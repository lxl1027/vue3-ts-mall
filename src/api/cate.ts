import http from '@/utils/http'

export type Cate = {
    categoryId: number
    categoryLevel: number
    categoryName: string
    secondLevelCategoryVOS: Array<SecondLevelCate>
}

type SecondLevelCate = {
    categoryId: number
    categoryLevel: number
    categoryName: string
    parentId: number
    thirdLevelCategoryVOS: Array<ThirdLevelCate>
}

type ThirdLevelCate = {
    categoryId: number
    categoryLevel: number
    categoryName: string
}

export const getCate = () => {
    return http.request<{
        resultCode: number
        message: string
        data: Array<Cate>
    }>({
        url: '/categories',
        method: 'get',
    })
}