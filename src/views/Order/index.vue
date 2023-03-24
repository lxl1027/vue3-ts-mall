<template>
    <div class="order">
        <!-- 头部 -->
        <CommonHeader :title="'我的订单'"></CommonHeader>
        <!-- 标签栏 -->
        <van-tabs v-model:active="state.active" :color="'#1baeae'" :title-active-color="'#1baeae'" @click-tab="onChangeTab">
            <van-tab title="全部" name=""></van-tab>
            <van-tab title="待付款" name="0"></van-tab>
            <van-tab title="待确认" name="1"></van-tab>
            <van-tab title="待发货" name="2"></van-tab>
            <van-tab title="已发货" name="3"></van-tab>
            <van-tab title="交易完成" name="4"></van-tab>
        </van-tabs>
        <!-- 订单列表 -->
        <div class="content">
            <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" class="order-list">
                <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad"
                    @offset="10">
                    <div class="order-item" v-for="item in state.list" :key="item.orderId" @click="goTo(item.orderNo)">
                        <div class="order-item-header">
                            <span>订单时间：{{ item.createTime }}</span>
                            <span>{{ item.orderStatusString }}</span>
                        </div>
                        <van-card v-for="good in item.newBeeMallOrderItemVOS" :num="good.goodsCount"
                            :price="`${good.sellingPrice}.00`" desc="全场包邮" :title="good.goodsName"
                            :thumb="$filters.prefix(good.goodsCoverImg)" />
                    </div>
                </van-list>

            </van-pull-refresh>

        </div>
    </div>
</template>

<script setup lang='ts'>
    import CommonHeader from '@/components/CommonHeader.vue'
    import { reactive } from 'vue'
    import { getOrderList } from '@/api/order'
    import type { Order } from '@/api/order'
    import router from '@/router';
    // 页面的状态
    const state = reactive<{
        list: Order[]
        active: string
        refreshing: boolean
        loading: boolean
        finished: boolean
        page: number
        totalPage: number
    }>({
        list: [],
        active: '',
        refreshing: false,
        loading: false,
        finished: false,
        page: 1,
        totalPage: 0
    })

    /* 不需要在onMounted里面请求数据，因为一开始list是空数组，list组件直接到底了，触发load事件，loading变成true。
    注意：为了看出来是刷新过了的，需要将list重新设为空数组，再请求，不然请求回来的数据生成的新虚拟dom跟旧虚拟dom对比，旧的直接继续用了。list重设为空数组后，list组件又到底了，为了避免出现两个加载中或一个加载中一个刷新完成，refresh组件不要添加刷新成功的文本，且在设为空数组后下一行就要把refreshing设为false取消刷新动画 */
    // 路由的query传参，传过去都变字符串了
    const goTo = (no: string) => {
        router.push({
            path: '/order-detail',
            query: {
                orderNo: no
            }
        })
    }
    // 换标签栏 
    // 解构设置类型 { name }: { name: string }
    const onChangeTab = () => {
        onRefresh()
    }
    // 下拉刷新
    const onRefresh = () => {
        state.refreshing = true
        state.finished = false
        state.loading = true
        state.page = 1
        onLoad()
    }
    // list到头
    const onLoad = () => {
        // 不在下拉刷新的过程中且当前页小于总页数
        if (!state.refreshing && state.page < state.totalPage) {
            state.page = state.page + 1
        }
        if (state.refreshing) {
            state.list = []
            state.refreshing = false
        }
        loadData()
    }
    // 加载数据
    const loadData = async () => {
        const { data: { data } } = await getOrderList(state.page, state.active)
        state.list = state.list.concat(data.list)
        state.totalPage = data.totalPage
        state.loading = false
        if (state.page >= data.totalPage) {
            state.finished = true
        }
    }
</script>

<style scoped lang='less'>
    .order {
        padding-top: (46 / 37.5rem);

        &-list {
            height: calc(100vh - 90px);
            overflow: auto;

            .order-item {
                margin: (20 / 37.5rem) (10 / 37.5rem);

                &:first-child {
                    margin-top: (10 / 37.5rem);
                }

                &-header {
                    display: flex;
                    justify-content: space-between;
                    padding: (10 / 37.5rem) (20 / 37.5rem) 0;
                    font-size: (12 / 37.5rem);
                    line-height: 1.5;
                    color: #2c3e50;
                }

                .van-card {
                    margin-top: 0;
                }
            }
        }
    }
</style>