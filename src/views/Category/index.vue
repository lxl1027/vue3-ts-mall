<template>
    <!-- 顶部导航栏 -->
    <header class="category-header">
        <div class="category-header-icon" @click="router.back()">
            <van-icon name="arrow-left" />
        </div>
        <div class="category-header-search">
            <van-icon class="category-header-search-icon" name="search" />
            <span class="category-header-search-ph">山河无恙，人间皆安</span>
        </div>
    </header>
    <!-- 主体内容 -->
    <div class="category">
        <div class="category-left">
            <ul class="left-list">
                <li v-for="FirstLevelCate in state.FirstLevelCateList" :key="FirstLevelCate.categoryId"
                    :class="state.currentCateId === FirstLevelCate.categoryId ? 'active' : ''"
                    @click="state.currentCateId = FirstLevelCate.categoryId">{{
                        FirstLevelCate.categoryName }}</li>
            </ul>
        </div>
        <div class="category-right">
            <!-- 第一级 -->
            <template v-for="FirstLevelCate in state.FirstLevelCateList">
                <!-- id相同时渲染出来 -->
                <div class="second-level" v-if="FirstLevelCate.categoryId === state.currentCateId"
                    :key="FirstLevelCate.categoryId">
                    <!-- 第二级 -->
                    <div class="second-level-item" v-for="SecondLevelCate in FirstLevelCate.secondLevelCategoryVOS"
                        :key="SecondLevelCate.categoryId">
                        <!-- 第二级标题 -->
                        <h3 class="second-level-title">{{ SecondLevelCate.categoryName }}</h3>
                        <!-- 第三级 -->
                        <div class="third-level">
                            <div class="third-level-item" v-for="ThirdLevelCate in SecondLevelCate.thirdLevelCategoryVOS"
                                :key="ThirdLevelCate.categoryId">
                                <!-- 图片 -->
                                <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" />
                                <!-- 第三级标题 -->
                                <div class="third-level-title">{{ ThirdLevelCate.categoryName }}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { getCate } from '@/api/cate'
    import type { Cate } from '@/api/cate'
    const router = useRouter()
    const state = reactive<{
        FirstLevelCateList: Cate[]
        currentCateId: number
    }>({
        FirstLevelCateList: [],
        currentCateId: 15
    })

    onMounted(async () => {
        const { data: { data } } = await getCate()
        state.FirstLevelCateList = data
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

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
                margin-left: (10 / 37.5rem);
            }
        }
    }

    .category {
        height: 100vh;
        display: flex;
        padding-top: (46 / 37.5rem);
        padding-bottom: (50 / 37.5rem);

        &-left {
            width: 28%;
            overflow: auto;

            .left-list {
                height: 100%;

                li {
                    font-size: (14 / 37.5rem);
                    color: @primary;
                    text-align: center;
                    line-height: (56 / 37.5rem);

                    &.active {
                        background-color: @primary;
                        color: #fff;
                    }
                }
            }
        }

        &-right {
            padding: 0 (10 / 37.5rem);
            width: 72%;
            // background-color: #f7f7f7;
            overflow: auto;

            .second-level {

                &-item {
                    color: #2c3e50;

                    .second-level-title {
                        padding: (20 / 37.5rem) 0;
                        font-size: (17 / 37.5rem);

                    }

                    .third-level {
                        display: flex;
                        flex-wrap: wrap;
                        font-size: (15 / 37.5rem);

                        &-item {
                            width: 33.33%;
                            text-align: center;
                            margin-bottom: (15 / 37.5rem);

                            img {
                                .wh((30 / 37.5rem), (30 / 37.5rem));
                                margin-bottom: (5 / 37.5rem);
                            }
                        }
                    }
                }
            }
        }
    }
</style>