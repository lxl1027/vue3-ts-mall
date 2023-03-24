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
    import { ref, reactive, onMounted } from 'vue'
    import { searchGoods } from '@/api/good'
    import type { SearchParams, Good } from '@/api/good'
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
        state.refreshing = true
        state.finished = false
        state.loading = true
        state.page = 1
        onLoad()
    }
    const onLoad = () => {
        if (!state.refreshing && state.page < state.totalPage) {
            state.page++
        }
        if (state.refreshing) {
            state.list = []
            state.refreshing = false
        }
        init()
    }

    const init = async () => {
        const categoryId = route.query.categoryId as string
        console.log(categoryId)
        if (!categoryId && !state.keyword) {
            state.finished = true
            state.loading = false
            return
        }
        const params = {
            pageNumber: state.page,
            keyword: state.keyword,
            orderBy: state.active,
            goodsCategoryId: categoryId
        }
        const { data: { data } } = await searchGoods(params)
        state.list = state.list.concat(data.list)
        state.totalPage = data.totalPage
        state.loading = false
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
                color: var(--van-nav-bar-icon-color);
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