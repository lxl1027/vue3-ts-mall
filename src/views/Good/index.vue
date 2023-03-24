<template>
    <div class="good-info">
        <!-- 顶部导航栏 -->
        <CommonHeader :title="`商品详情`"></CommonHeader>
        <!-- 商品图片 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(carousel, index) in state.carouselList" :key="index">
                <img :src="$filters.prefix(carousel)">
            </van-swipe-item>
        </van-swipe>
        <!-- 商品信息-->
        <div class="good-intro">
            <h1 class="good-title">{{ state.goodName }}</h1>
            <p class="good-desc">免邮费 顺丰快递</p>
            <p class="good-price">￥{{ state.price }}</p>
        </div>
        <!-- 其他（概述、参数、安装服务、常见问题 -->
        <ul class="other-intro">
            <li>概述</li>
            <li>参数</li>
            <li>安装服务</li>
            <li>常见问题</li>
        </ul>
        <!-- 商品内容 -->
        <div class="good-content" v-html="state.content">
        </div>
        <!-- 底部动作栏 -->
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon @click="router.push('/cart')" icon="cart-o" text="购物车"
                :badge="!Cart.count ? '' : Cart.count" />
            <van-action-bar-button @click="add" type="warning" text="加入购物车" />
            <van-action-bar-button @click="buy" type="danger" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script setup lang='ts'>
    import CommonHeader from '@/components/CommonHeader.vue'
    import { onMounted, reactive } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { getGoodDetail, addGood } from '@/api/good'
    import { useCartStore } from '@/store/cart'
    import { showSuccessToast, showFailToast } from 'vant'
    const Cart = useCartStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        carouselList: [''],
        goodName: '',
        price: 0,
        content: '',
        id: 1
    })
    const add = async () => {
        const { data: { resultCode, message } } = await addGood(1, state.id)
        if (resultCode === 200) showSuccessToast('添加成功！')
        else showFailToast(message)
        Cart.updateCart()
    }
    const buy = async () => {
        await addGood(1, state.id)
        Cart.updateCart()
        router.push('/cart')
    }
    onMounted(async () => {
        const id = route.params.goodsId as string
        const { data: { data: { goodsCarouselList, goodsName, sellingPrice, goodsDetailContent, goodsId } } } = await getGoodDetail(id)
        state.carouselList = goodsCarouselList
        state.goodName = goodsName
        state.price = sellingPrice
        state.content = goodsDetailContent
        state.id = goodsId
        console.log(state.content)
    })

</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .good-info {

        .my-swipe {
            margin-top: (46 / 37.5rem);

            img {
                width: 100%;
            }
        }

        .good-intro {
            padding: 0 (10 / 37.5rem);
            .wh(100%, (125 / 37.5rem));

            .good-title {
                font-size: (18 / 37.5rem);
                line-height: 1.5;
                color: #333;
            }

            .good-desc {
                padding: (5 / 37.5rem) 0;
                font-size: (14 / 37.5rem);
                line-height: 1.5;
                color: #999;
            }

            .good-price {
                color: #F63515;
                font-size: (22 / 37.5rem);
                line-height: (35 / 37.5rem);
            }

        }

        .other-intro {
            display: flex;
            margin: (10 / 37.5rem) 0;
            height: (34 / 37.5rem);

            li {
                width: 25%;
                color: #2c3e50;
                font-size: (15 / 37.5rem);
                text-align: center;
                line-height: (34 / 37.5rem);
                border-right: (1 / 37.5rem) solid #999;

                &:last-child {
                    border-right: none;
                }
            }
        }

        .good-content {
            padding: 0 (20 / 37.5rem) (50 / 37.5rem);

            :deep(img) {
                width: 100%;
            }
        }

        .van-action-bar-button--warning {
            background: linear-gradient(to right, #6bd8d8, @primary)
        }

        .van-action-bar-button--danger {
            background: linear-gradient(to right, #0dc3c3, #098888)
        }
    }
</style>