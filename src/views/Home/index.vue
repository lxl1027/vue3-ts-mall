<template>
    <div class="home">
        <!-- header -->
        <header class="home-header" :class="isTop ? 'active' : ''">
            <div class="home-header-left" @click="router.push('/cate')"><van-icon name="apps-o" /></div>
            <div class="home-header-middle">
                <span class="app-name">新蜂商城</span>
                <van-icon class="search" name="search" />
                <span>山河无恙，人间皆安</span>
            </div>
            <div class="home-header-right" @click="router.push('/user')"><van-icon name="manager-o" /></div>
        </header>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="carousel in carouselList" :key="carousel.carouselUrl">
                <img :src="carousel.carouselUrl" :alt="carousel.redirectUrl">
            </van-swipe-item>
        </van-swipe>
        <!-- 宫格 -->
        <div class="cate-list">
            <div class="cate" v-for="cate in cateList" :key="cate.categoryId" @click="tips">
                <img class="cate-img" :src="cate.imgUrl" alt="">
                <div class="cate-name">{{ cate.name }}</div>
            </div>
        </div>
        <!-- 新品上线 -->
        <GoodList :list="newGoodList">
            <template #title>
                <h1 class="list-title">新品上线</h1>
            </template>
        </GoodList>
        <!-- 热门商品 -->
        <GoodList :list="hotGoodList">
            <template #title>
                <h1 class="list-title">热门商品</h1>
            </template>
        </GoodList>
        <!-- 最新推荐 -->
        <GoodList :list="recommendGoodList">
            <template #title>
                <h1 class="list-title">最新推荐</h1>
            </template>
        </GoodList>
    </div>
</template>

<script setup lang='ts'>
    import GoodList from './components/GoodList.vue'
    import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
    import { getHome } from '@/api/home'
    import { useRouter } from 'vue-router'
    import type { Carousel, Good } from '@/api/home'
    import { showToast } from 'vant'
    const router = useRouter()
    // 控制header的状态 
    let isTop = ref(false)
    // 轮播图的数据
    const carouselList = reactive<Array<Carousel>>([])
    // 分类数据
    const cateList = reactive([
        {
            name: '新蜂超市',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
            categoryId: 100001
        }, {
            name: '新蜂服饰',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
            categoryId: 100003
        }, {
            name: '全球购',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
            categoryId: 100002
        }, {
            name: '新蜂生鲜',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
            categoryId: 100004
        }, {
            name: '新蜂到家',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
            categoryId: 100005
        }, {
            name: '充值缴费',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
            categoryId: 100006
        }, {
            name: '9.9元拼',
            imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
            categoryId: 100007
        }, {
            name: '领劵',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
            categoryId: 100008
        }, {
            name: '省钱',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
            categoryId: 100009
        }, {
            name: '全部',
            imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
            categoryId: 100010
        }
    ])
    // 热门商品的数据
    const hotGoodList = reactive<Array<Good>>([])
    // 新品的数据
    const newGoodList = reactive<Array<Good>>([])
    // 推荐商品的数据
    const recommendGoodList = reactive<Array<Good>>([])
    // 控制isTop状态的函数
    const changeTop = () => {
        let t = document.documentElement.scrollTop || document.body.scrollTop
        if (t > 100) {
            isTop.value = true
        } else {
            isTop.value = false
        }
    }
    // 敬请期待
    const tips = () => {
        showToast({
            message: '敬请期待！',
            duration: 1000
        })
    }
    // 请求首页数据的函数
    const getHomeData = async () => {
        try {
            const { data: { data: { carousels, hotGoodses, newGoodses, recommendGoodses } } } = await getHome()
            carouselList.push(...carousels)
            hotGoodList.push(...hotGoodses)
            newGoodList.push(...newGoodses)
            recommendGoodList.push(...recommendGoodses)
        } catch (err) {
            console.log('Error:', err)
        }
    }
    onMounted(() => {
        // 可以做节流
        // 绑定scroll事件
        window.addEventListener('scroll', changeTop)
        // 请求首页的数据
        getHomeData()
    })
    onBeforeUnmount(() => {
        // 解绑scroll事件
        window.removeEventListener('scroll', changeTop)
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .home {
        padding-bottom: (60 / 37.5rem);
        background-color: #f7f7f7;

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            width: 100%;
            height: (50 / 37.5rem);

            &-left {
                display: flex;
                justify-content: center;
                width: (50 / 37.5rem);

            }

            i {
                color: @primary;
                font-size: (20 / 37.5rem);
            }

            &-middle {
                display: flex;
                align-items: center;
                width: (255 / 37.5rem);
                background-color: rgba(255, 255, 255, .7);
                font-size: (12 / 37.5rem);
                color: #666;
                border-radius: (13 / 37.5rem);

                .app-name {
                    padding: 0 (10 / 37.5rem);
                    font-size: (20 / 37.5rem);
                    color: @primary;
                    font-weight: 700;
                    border-right: (1 / 37.5rem) solid #666;
                }

                .search {
                    padding: 0 (3 / 37.5rem);
                    line-height: 26px;
                }
            }

            &-right {
                display: flex;
                justify-content: center;
                width: (50 / 37.5rem);
            }

            &.active {
                background-color: @primary;

                i {
                    color: #fff;
                }
            }
        }

        .my-swipe {
            background-color: #fff;

            .van-swipe-item {
                img {
                    width: 100%;
                    height: auto;
                }
            }
        }

        .cate-list {
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;

            .cate {
                padding: (8 / 37.5rem) 0 (13 / 37.5rem)0;
                width: 20%;
                text-align: center;

                .cate-img {
                    .wh((36 / 37.5rem), (36 / 37.5rem));
                    margin-bottom: (2 / 37.5rem);
                }

                // 2c3e50

                .cate-name {
                    font-size: (12 / 37.5rem);
                    color: #2c3e50;
                }
            }

        }

    }
</style>