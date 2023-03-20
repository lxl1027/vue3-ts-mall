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