<template>
    <div class="create-order">
        <CommenHeader :title="'生成订单'" @callback="deleteLocal" :path="'/cart'"></CommenHeader>
        <!-- 地址 -->
        <div class="address" @click="changeAddress">
            <div class="name-and-phone">
                <span>{{ state.address.userName }}</span>&nbsp;
                <span>{{ state.address.userPhone }}</span>
            </div>
            <div class="address-detail">
                {{ `${state.address.provinceName} ${state.address.cityName} ${state.address.regionName}
                                ${state.address.detailAddress}` }}
            </div>
            <van-icon name="arrow" class="arrow" />
        </div>
        <!-- 商品 -->
        <div class="good-list">
            <div class="good" v-for="good in state.goodList" :key="good.cartItemId"
                @click="router.push(`/info/${good.goodsId}`)">
                <img :src="$filters.prefix(good.goodsCoverImg)" alt="">
                <div class="good-desc">
                    <div class="title-and-count">
                        <span class="title">{{ good.goodsName }}</span>
                        <span class="count">x{{ good.goodsCount }}</span>
                    </div>
                    <div class="price">¥{{ good.sellingPrice }}</div>
                </div>
            </div>
        </div>
        <!-- 底部生成订单栏 -->
        <div class="create-order">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ total }}</span>
            </div>
            <van-button type="primary" @click="handleCreateOrder">生成订单</van-button>
        </div>
    </div>
    <!-- 弹出层 -->
    <van-popup closeable v-model:show="state.showPay" position="bottom" :style="{ height: '30%' }"
        @click-overlay="closePopup" @click-close-icon="closePopup">
        <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
            <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block
                @click="handlePayOrder(1)">支付宝支付</van-button>
            <van-button color="#4fc08d" block @click="handlePayOrder(2)">微信支付</van-button>
        </div>
    </van-popup>
</template>

<script setup lang='ts'>
    import CommenHeader from '@/components/CommonHeader.vue'
    import { closeToast, showLoadingToast, showSuccessToast } from 'vant';
    import { onMounted, reactive, computed } from 'vue'
    import { getDefaultAddress, getSpecificAddress } from '@/api/address'
    import { settleGood } from '@/api/good'
    import { saveOrder, payOrder } from '@/api/order'
    import type { CartItem } from '@/api/good'
    import type { AddressDefault, AddressInfoGet } from '@/api/address'
    import { getId, setId, removeId } from '@/utils/cartItemId'
    import { useCartStore } from '@/store/cart'
    import { useRoute, useRouter } from 'vue-router'
    const route = useRoute()
    const router = useRouter()
    const Cart = useCartStore()
    // 页面的状态
    const state = reactive<{
        goodList: CartItem[]
        address: AddressDefault | AddressInfoGet
        showPay: boolean
        ids: string[]
        orderNo: string
    }>({
        goodList: [],
        address: {
            addressId: 0,
            cityName: '',
            createTime: '',
            defaultFlag: 0,
            detailAddress: '',
            isDeleted: 0,
            provinceName: '',
            regionName: '',
            updateTime: '',
            userId: 0,
            userName: '',
            userPhone: ''
        },
        showPay: false,
        ids: [],
        orderNo: ''
    })
    // 总价
    const total = computed<number>(() => {
        return state.goodList.reduce((prev, cur) => {
            return prev + cur.goodsCount * cur.sellingPrice
        }, 0)
    })
    // 改地址
    const changeAddress = () => {
        router.push({
            path: '/address',
            query: {
                ids: state.ids,
                from: 'create-order'
            }
        })
    }
    // 初始化
    const init = async () => {
        showLoadingToast({ message: '加载中', forbidClick: true })
        try {
            const { addressId, ids } = route.query
            const _ids = (ids ? ids : getId()) as string[]
            setId(_ids)
            const { data: { data: list } } = await settleGood(_ids.join(','))
            const { data: { data: address } } = addressId ? await getSpecificAddress(addressId as string) : await getDefaultAddress()
            if (!address) {
                router.push('/address')
            }
            state.goodList = list
            state.address = address
            state.ids = _ids
        } catch (err) {
            console.log('Error:', err)
            closeToast()
            router.replace('/home')
        }
        closeToast()
    }
    // 删除ids
    const deleteLocal = () => {
        removeId()
    }
    // 点击生成订单弹出弹出层
    const handleCreateOrder = async () => {
        const dataObj = {
            addressId: state.address.addressId,
            cartItemIds: state.goodList.map(good => good.cartItemId)
        }
        const { data: { data } } = await saveOrder(dataObj)
        removeId()
        state.orderNo = data
        state.showPay = true
        Cart.updateCart()
    }
    // 收回弹出层
    const closePopup = () => {
        router.push('/order')
    }
    // 支付
    const handlePayOrder = async (type: number) => {
        await payOrder(state.orderNo, type)
        showSuccessToast('支付成功！')
        setTimeout(() => {
            router.push('/order')
        }, 2000)
    }
    onMounted(() => {
        init()
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .create-order {
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: (46 / 37.5rem) 0 (100 / 37.5rem);

        .address {
            position: relative;
            margin-bottom: (20 / 37.5rem);
            padding: (15 / 37.5rem);
            font-size: (14 / 37.5rem);
            color: #222333;
            line-height: 1.5;

            .name-and-phone {
                margin: (10 / 37.5rem) 0;
            }

            &-detail {
                margin-bottom: (10 / 37.5rem);
            }

            .arrow {
                position: absolute;
                right: (10 / 37.5rem);
                top: 50%;
                transform: translateY(-50%);
                font-size: (20 / 37.5rem);
            }

            &::before {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                height: 2px;
                background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
                background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
                background-size: 80px;
                content: '';
            }
        }

        .good-list {
            flex: 1;
            overflow: auto;

            .good {
                display: flex;
                padding: (10 / 37.5rem);
                height: (120 / 37.5rem);

                img {
                    display: block;
                    .wh((100 / 37.5rem), (100 / 37.5rem))
                }

                &-desc {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex: 1;
                    padding: (20 / 37.5rem);
                    height: 100%;

                    .title-and-count {
                        display: flex;
                        justify-content: space-between;
                        font-size: (12 / 37.5rem);
                        color: #2c3e50;
                        line-height: 1.5;
                    }

                    .price {
                        font-size: (16 / 37.5rem);
                        color: red;
                    }

                }
            }
        }

        .create-order {
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: (10 / 37.5rem) (20 / 37.5rem) (10 / 37.5rem);
            height: (100 / 37.5rem);
            border-top: 1px solid #ccc;
            background-color: #fff;

            .price {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: (14 / 37.5rem);
                color: #2c3e50;

                span:last-child {
                    font-size: (18 / 37.5rem);
                    color: red;
                }
            }

            .van-button--primary {
                width: 100%;
                background-color: @primary;
                border-color: @primary;
            }
        }
    }
</style>