import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
            isShowInPage: true
        }
    },
    {
        path: '/cart',
        component: () => import('@/views/Cart/index.vue'),
        meta: {
            isShowInPage: true
        }
    },
    {
        path: '/cate',
        component: () => import('@/views/Category/index.vue'),
        meta: {
            isShowInPage: true
        }
    },
    {
        path: '/user',
        component: () => import('@/views/User/index.vue'),
        meta: {
            isShowInPage: true
        }
    },
    {
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/info/:goodsId',
        component: () => import('@/views/Good/index.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/address',
        component: () => import('@/views/Address/index.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/address-edit',
        component: () => import('@/views/Address/AddressEdit.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/order',
        component: () => import('@/views/Order/index.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/order-detail',
        component: () => import('@/views/Order/OrderDetail.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/create-order',
        component: () => import('@/views/Order/CreateOrder.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/setting',
        component: () => import('@/views/User/Setting.vue'),
        meta: {
            isShowInPage: false
        }
    },
    {
        path: '/good-list',
        component: () => import('@/views/Good/GoodList.vue'),
        meta: {
            isShowInPage: false
        }
    },
]
export const asyncRoutes = []


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...constantRoutes,
        { path: '/:pathMatch(.*)', redirect: '/' }, // 
    ]
})

export default router