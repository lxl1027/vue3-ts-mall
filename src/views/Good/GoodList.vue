<template>
    <div class="list">
        <!-- 顶部导航栏 -->
        <header class="category-header">
            <div class="category-header-icon" @click="router.back()">
                <van-icon name="arrow-left" />
            </div>
            <div class="category-header-search">
                <van-icon class="category-header-search-icon" name="search" />
                <input v-model="state.keyword" class="category-header-search-ph" placeholder="山河无恙，人间皆安" />
            </div>
            <van-button color="#1baeae" size="mini" @click="search">搜索</van-button>
        </header>
        <!-- tab -->
        <van-tabs v-model="state.active" type="card" color="#1baeae" @click-tab="changeTab">
            <van-tab title="推荐" name="" />
            <van-tab title="新品" name="new" />
            <van-tab title="价格" name="price" />
        </van-tabs>
        <div class="content">
            <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" class="good-list">
                <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
                    <van-card v-for="good in state.list" :price="`${good.sellingPrice}.00`" :desc="good.goodsIntro"
                        :title="good.goodsName" :thumb="$filters.prefix(good.goodsCoverImg)"
                        @click="router.push(`/info/${good.goodsId}`)" />
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { reactive } from 'vue'
    import { searchGoods } from '@/api/good'
    import type { Good } from '@/api/good'
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
        keyword: '',
        active: '',
        refreshing: false,
        loading: false,
        finished: false,
        page: 1,
        totalPage: 0,
        list: [] as Good[],
    })
    const search = () => {
        onRefresh()
    }
    const changeTab = () => {
        onRefresh()
    }
    const onRefresh = () => {
        // 进行刷新前 初始化一下
        state.refreshing = true
        state.finished = false
        state.loading = true
        state.page = 1
        onLoad()
    }
    const onLoad = () => {
        // 不在下拉刷新中且当前页小于总页数
        if (!state.refreshing && state.page < state.totalPage) {
            state.page++
        }
        // 处于下拉刷新中 把list置空 重新获取数据
        if (state.refreshing) {
            state.list = []
            state.refreshing = false
        }
        // 获取数据
        init()
    }
    const init = async () => {
        // 从第三级分类点进来的路由query传参会有分类id
        const categoryId = route.query.categoryId as string
        // id不存在且关键词为空 把finished设为true 不再触发load事件
        if (!categoryId && !state.keyword) {
            state.finished = true
            state.loading = false
            return
        }
        // id存在或者关键词不为空字符串
        const params = {
            pageNumber: state.page,
            keyword: state.keyword,
            orderBy: state.active,
            goodsCategoryId: categoryId
        }
        // 发请求获取搜索结果并解构出来
        const { data: { data } } = await searchGoods(params)
        // 把list拼接起来
        state.list = state.list.concat(data.list)
        // 设置总页数
        state.totalPage = data.totalPage
        // 停止load事件
        state.loading = false
        // 当前页大于等于总页数时 finished为true 不再触发load事件
        if (state.page >= state.totalPage) state.finished = true
    }
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .list {
        padding-top: (46 / 37.5rem);

        .category-header {
            display: flex;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            width: 100%;
            height: (46 / 37.5rem);
            background: #fff;
            border-bottom: 0.02667rem solid #dcdcdc;

            &-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: (15 / 37.5rem);
                font-size: (16 / 37.5rem);
                width: (52 / 37.5rem);
                height: 100%;
                color: @primary;

                .van-icon {
                    font-weight: 700;
                }
            }

            &-search {
                display: flex;
                align-items: center;
                padding-left: (15 / 37.5rem);
                margin-right: (15 / 37.5rem);
                width: 65%;
                height: (26 / 37.5rem);
                background-color: #f3f3f3;
                border-radius: (20 / 37.5rem);
                font-size: (12 / 37.5rem);
                color: #666;

                &-icon {
                    font-size: (16 / 37.5rem);
                }

                &-ph {
                    flex: 1;
                    margin-left: (10 / 37.5rem);
                    height: 100%;
                    background-color: #f3f3f3;
                    border: none;
                }
            }

            .van-button--default {
                font-size: (15 / 37.5rem);
            }
        }

        .van-tabs {
            padding: (10 / 37.5rem) (20 / 37.5rem);

            :deep(.van-tabs__nav) {

                :deep(.van-tab) {
                    height: (30 / 37.5rem);
                }
            }
        }

        .content {
            height: calc(100vh - 96px);
            overflow: auto;

            .good-list {
                .van-card {
                    margin-top: 0;

                    :deep(.van-card__price) {
                        color: @primary;
                    }
                }
            }
        }
    }
</style>