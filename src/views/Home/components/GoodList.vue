<template>
    <div class="good-list">
        <div class="good-list-header">
            <slot name="title">标题没加载出来</slot>
        </div>
        <ul class="good-list-content">
            <router-link tag='li' :to="`/info/${item.goodsId}`" v-for="item in list" :key="item.goodsId" class="good">
                <img class="good-img" :src="$filters.prefix(item.goodsCoverImg)" alt="">
                <div class="good-desc">
                    <h3 class="good-name">{{ item.goodsName }}</h3>
                    <p class="good-price">￥{{ item.sellingPrice }}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script setup lang='ts'>
    import { ref, reactive } from 'vue'
    import type { Good } from '@/api/home'
    defineProps<{
        list: Good[]
    }>()
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .good-list {
        background-color: #fff;

        &-header {
            :slotted(.list-title) {
                height: (50 / 37.5rem);
                line-height: (50 / 37.5rem);
                text-align: center;
                font-size: (16 / 37.5rem);
                color: @primary;
                background-color: #f7f7f7;
            }
        }

        &-content {
            display: flex;
            flex-wrap: wrap;

            .good {
                box-sizing: border-box;
                width: 50%;
                padding: (10 / 37.5rem);
                text-align: center;
                border-bottom: (1 / 37.5rem) solid #e9e9e9;

                &-img {
                    display: block;
                    margin: 0 auto;
                    .wh((120 / 37.5rem), (120 / 37.5rem))
                }

                &-desc {
                    font-size: (14 / 37.5rem);
                    padding: (10 /37.5rem) 0;

                    .good-name {
                        line-height: 1.5;
                        color: #222333;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // display: -webkit-box;
                        // -webkit-box-orient: vertical;
                        // -webkit-line-clamp: 2;
                        // overflow: hidden;
                    }

                    .good-price {
                        font-weight: 700;
                        margin-top: (2 / 37.5rem);
                        color: @primary;
                    }
                }


                &:nth-child(2n + 1) {
                    border-right: (0.5 / 37.5rem) solid #e9e9e9;
                }

                &:nth-child(2n) {
                    border-left: (0.5 / 37.5rem) solid #e9e9e9;
                }
            }
        }
    }
</style>