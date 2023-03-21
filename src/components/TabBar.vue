<template>
    <van-tabbar route active-color="#1baeae">
        <van-tabbar-item replace to="/home" icon="home-o">
            <span>首页</span>
            <template #icon>
                <span class="icon iconfont icon-shouye"></span>
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/cate" icon="search">
            <span>分类</span>
            <template #icon>
                <span class="icon iconfont icon-grouping"></span>
            </template></van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="search" :badge="!Cart.count ? '' : Cart.count">
            <span>购物车</span>
            <template #icon>
                <span class="icon iconfont icon-gouwuche"></span>
            </template></van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="search">
            <span>我的</span>
            <template #icon>
                <span class="icon iconfont icon-31wode"></span>
            </template></van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
    import { useCartStore } from '@/store/cart'
    const Cart = useCartStore()
</script>

<style scoped lang='less'>
    .van-tabbar-item {
        font-size: 9px;

        .iconfont {
            position: relative;
            font-size: 0.55rem;
        }
    }
</style>