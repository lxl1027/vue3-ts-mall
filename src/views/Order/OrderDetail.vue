<template>
    <div class="order-detail">
        <!-- 通用头部 -->
        <CommenHeader :title="'订单详情'"></CommenHeader>
        <!-- 订单状态 -->
        <div class="status">
            <div class="status-item">
                <span>订单状态：</span>
                <span>{{ state.orderDetail.orderStatusString }}</span>
            </div>
            <div class="status-item">
                <span>订单编号：</span>
                <span>{{ state.orderDetail.orderNo }}</span>
            </div>
            <div class="status-item">
                <span>下单时间：</span>
                <span>{{ state.orderDetail.createTime }}</span>
            </div>
            <van-button v-if="state.orderDetail.orderStatus === 3" block class="btn" color="#1baeae">确认收货</van-button>
            <van-button v-if="state.orderDetail.orderStatus === 0" block class="btn" color="#1baeae"
                @click="state.showPay = true">去支付</van-button>
            <van-button v-if="!(state.orderDetail.orderStatus < 0 || state.orderDetail.orderStatus === 4)" block class="btn"
                @click="handleCancelOrder(state.orderDetail.orderNo)">取消订单</van-button>
        </div>
        <!-- 订单的其他信息 -->
        <div class="others">
            <div class="status-item">
                <span>商品金额：</span>
                <span>{{ state.orderDetail.totalPrice }}</span>
            </div>
            <div class="status-item">
                <span>配送方式：</span>
                <span>普通快递</span>
            </div>
        </div>
        <!-- 订单中的商品信息 -->
        <div class="good-list">
            <van-card v-for="good in state.orderDetail.newBeeMallOrderItemVOS" :num="good.goodsCount"
                :price="`${good.sellingPrice}.00`" desc="全场包邮" :title="good.goodsName" :thumb="good.goodsCoverImg" />
        </div>
        <!-- 弹出层 -->
        <van-popup closeable v-model:show="state.showPay" position="bottom" :style="{ height: '30%' }"
            close-on-click-overlay>
            <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
                <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block
                    @click="handlePayOrder(1)">支付宝支付</van-button>
                <van-button color="#4fc08d" block @click="handlePayOrder(2)">微信支付</van-button>
            </div>
        </van-popup>
        <!-- 遮罩层 -->
        <!-- <van-overlay :show="state.showCancel" @click="state.showCancel = false">
            <div class="box" @click.stop>
                <div class="title">确认取消订单</div>
                <van-button block type="danger" @click="cancelOrder">确认</van-button>
                <van-button block>取消</van-button>
            </div>
        </van-overlay> -->
    </div>
</template>

<script setup lang='ts'>
    import CommenHeader from '@/components/CommonHeader.vue'
    import { reactive, onMounted } from 'vue'
    import { showSuccessToast, showConfirmDialog, showLoadingToast, closeToast } from 'vant'
    import { getOrderByNo, payOrder, cancelOrder } from '@/api/order'
    import type { OrderInfo } from '@/api/order'
    import { useRoute, useRouter } from 'vue-router'
    const route = useRoute()
    const router = useRouter()
    // 页面的状态
    const state = reactive<{
        orderDetail: OrderInfo
        showPay: boolean
    }>({
        orderDetail: {
            createTime: '',
            newBeeMallOrderItemVOS: [],
            orderNo: '',
            orderStatus: 2,
            orderStatusString: '',
            payStatus: 0,
            payTime: '',
            payType: 0,
            payTypeString: '',
            totalPrice: 0,
        },
        showPay: false,
    })
    const handleCancelOrder = (no: string) => {
        showConfirmDialog({
            title: '确定取消订单？',
            theme: 'round-button',
            confirmButtonColor: 'linear-gradient(to right, #0dc3c3, #098888)',
        }).then(() => {
            cancelOrder(no).then(res => {
                if (res.data.resultCode === 200) {
                    showSuccessToast('删除成功')
                    router.replace('/order')
                }
            })
        }).catch(() => {
        });
    }
    const handlePayOrder = async (type: number) => {
        await payOrder(state.orderDetail.orderNo, type)
        showSuccessToast('支付成功！')
        setTimeout(() => {
            router.push('/order')
        }, 2000)
    }
    const init = async () => {
        showLoadingToast({
            message: '加载中...',
            forbidClick: true
        })
        const orderNo = route.query.orderNo as string
        const { data: { data } } = await getOrderByNo(orderNo)
        state.orderDetail = data
        closeToast()
    }
    onMounted(() => {
        init()
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .order-detail {
        padding-top: (46 / 37.5rem);
        background-color: #f7f7f7;

        .status,
        .others {
            margin-bottom: (20 / 37.5rem);
            padding: (20 / 37.5rem);
            background-color: #fff;

            &-item {
                margin-bottom: (10 / 37.5rem);
                height: (24 / 37.5rem);
                font-size: (15 / 37.5rem);
                color: #999;
                line-height: (24 / 37.5rem);

                span {

                    &:last-child {
                        color: #2c3e50;
                    }
                }
            }

            .btn {
                margin-bottom: (10 / 37.5rem);

                &:last-child {
                    margin-bottom: none;
                }
            }
        }

        .good-list {

            .van-card {
                margin-top: 0;
                background-color: #fff;
            }
        }

        .van-overlay {

            .box {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -60%);
                width: 120px;
                background-color: #fff;

                .title {
                    margin: (5 / 37.5rem);
                    text-align: center;
                    font-size: (16 / 37.5rem);
                }
            }
        }

    }
</style>