<template>
    <div class="cart">
        <!-- 顶部导航栏 -->
        <CommonHeader :title="'购物车'" :left-arrow="true" :icon-size="18"></CommonHeader>
        <!-- 购物车主体 -->
        <div class="cart-body">
            <van-checkbox-group v-model="state.idList" ref="checkboxGroup">
                <van-swipe-cell :right-width="50" v-for="good in state.goodList" :key="good.cartItemId">
                    <div class="good">
                        <van-checkbox icon-size="0.533334rem" :name="good.cartItemId"
                            checked-color="#1baeae"></van-checkbox>
                        <img class="good-img" :src="$filters.prefix(good.goodsCoverImg)">
                        <div class="good-desc">
                            <div class="title-and-count">
                                <span class="title">{{ good.goodsName }}</span>
                                <span class="count">x{{ good.goodsCount }}</span>
                            </div>
                            <div class="price-and-step">
                                <div class="price">¥{{ good.sellingPrice }}</div>
                                <van-stepper :model-value="good.goodsCount" integer min="1" max="5" :auto-fixed="true"
                                    :name="good.cartItemId" @change="handleBlur" />
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button"
                            @click="delGood(good.cartItemId)" />
                    </template>
                </van-swipe-cell>
            </van-checkbox-group>
        </div>
        <!-- 购物车结算栏 -->
        <van-submit-bar class="submit-all" :price="(fullPrice * 100)" button-text="结算" @submit="onSubmit">
            <van-checkbox checked-color="#1baeae" v-model="state.checkAll" @click="handleAllCheck">全选</van-checkbox>
            <!-- <template #tip>
                你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
            </template> -->
        </van-submit-bar>
    </div>
</template>

<script setup lang='ts'>
    import CommonHeader from '@/components/CommonHeader.vue'
    import { ref, reactive, onMounted, watch, computed } from 'vue'
    import { getCart, modifyCart, deleteGood } from '@/api/good'
    import type { CartItem } from '@/api/good'
    import { closeToast, showFailToast, showLoadingToast } from 'vant'
    import router from '@/router'
    // 获取checkbox-group的实例
    const checkboxGroup = ref()
    // 页面的状态
    const state = reactive<{
        checkAll: boolean
        goodList: CartItem[]
        idList: number[]
    }>({
        checkAll: true,
        goodList: [],
        idList: []
    })
    // 结算
    const onSubmit = async () => {
        // idList为0说明没选中商品，不可以进行结算
        if (state.idList.length === 0) {
            showFailToast('请先选择商品再进行结算！')
            return
        }
        // 可以进行结算
        const ids = JSON.parse(JSON.stringify(state.idList))
        router.push({
            path: '/create-order',
            query: {
                ids,
            }
        })
    }
    /* 
        1. 监视idList idList的长度等于购物车里被选中的商品种类数量
        发生变化就判断一次是否全选了 全选就把选中全选 反之取消选中
        2. 也可以给每个good加一个checked属性 然后用计算属性算出checkAll
        因为getter需要用array.every来遍历得到true或者false 所以当每个good选中或者取消选中时
        都会重新算一遍checkAll setter就forEach赋值就可以了
    */
    // 监视idList的长度实现全选和反选
    watch(() => state.idList.length, (newVal) => {
        if (newVal !== state.goodList.length) {
            state.checkAll = false
        } else {
            state.checkAll = true
        }
    })
    // 合计
    const fullPrice = computed<number>(() => {
        return state.goodList.reduce((prev, cur) => {
            if (state.idList.includes(cur.cartItemId)) {
                return prev + cur.goodsCount * cur.sellingPrice
            } else {
                return prev
            }
        }, 0)
    })
    // 增加商品
    const handleBlur = async (value: string, detail: { name: string }) => {
        const val = Number(value)
        const det = Number(detail.name)
        if (val > 5) {
            showFailToast('超出单个商品的最大购买数量')
            return
        }
        if (val < 1) {
            showFailToast('商品不得小于0')
            return
        }
        showLoadingToast({ message: '修改中...', forbidClick: true })
        await modifyCart(val, det)
        /**
        * 修改完成后，没有请求购物车列表，是因为闪烁的问题，
        * 这边手动给操作的购物车商品修改数据
        */
        state.goodList.forEach(good => {
            if (good.cartItemId === det) {
                good.goodsCount = val
            }
        })
        closeToast()
    }
    // 删除商品
    const delGood = async (id: number) => {
        await deleteGood(id)
        init()
    }
    // 初始化
    const init = async () => {
        showLoadingToast({ message: '修改中...', forbidClick: true })
        const { data: { data } } = await getCart()
        state.goodList = data
        state.idList = data.map(good => good.cartItemId)
        closeToast()
    }
    // 全选和反选
    const handleAllCheck = () => {
        if (state.checkAll) {
            checkboxGroup.value.toggleAll(true)
        } else {
            checkboxGroup.value.toggleAll()
        }
    }
    onMounted(async () => {
        init()
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .cart {
        height: 100vh;
        padding: (46 / 37.5rem) 0 (100 / 37.5rem);
        overflow: auto;

        .cart-body {
            .good {
                display: flex;
                align-items: center;
                padding: 0 (10 / 37.5rem);

                &-img {
                    display: block;
                    .wh((100 / 37.5rem), (100 / 37.5rem));
                    margin-left: (5 / 37.5rem);
                }

                &-desc {
                    flex: 1;
                    padding: (20 / 37.5rem);
                    font-size: (12 / 37.5rem);

                    .title-and-count {
                        display: flex;
                        justify-content: space-between;
                        align-items: top;
                        height: (36 / 37.5rem);
                        line-height: 1.5;
                    }

                    .price-and-step {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: (16 / 37.5rem);
                        color: red;
                    }
                }


            }

            .delete-button {
                margin-left: (1 / 37.5rem);
                width: (49 / 37.5rem);
                height: 100%;
            }
        }

        .submit-all {
            margin-bottom: (50 / 37.5rem);

            .van-checkbox {
                margin-left: (10 / 37.5rem);
            }

            :deep(.van-submit-bar__text) {
                padding-bottom: (3 / 37.5rem);
                margin-right: (15 / 37.5rem);
            }

            :deep(.van-submit-bar__button) {
                background: linear-gradient(to right, #0dc3c3, #098888);
            }
        }
    }
</style>