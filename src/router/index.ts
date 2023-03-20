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
            isShowInNav: true
        }
    },
    {
        path: '/cart',
        component: () => import('@/views/Cart/index.vue'),
        meta: {
            isShowInNav: true
        }
    },
    {
        path: '/cate',
        component: () => import('@/views/Category/index.vue'),
        meta: {
            isShowInNav: true
        }
    },
    {
        path: '/User',
        component: () => import('@/views/User/index.vue'),
        meta: {
            isShowInNav: true
        }
    },
    {
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            isShowInNav: false
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