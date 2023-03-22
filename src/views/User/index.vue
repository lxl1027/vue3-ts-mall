<template>
    <div class="my">
        <!-- 通用头部 -->
        <CommonHeader :title="'我的'"></CommonHeader>
        <!-- 用户信息 -->
        <div class="user-info">
            <div class="info">
                <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" class="info-left">
                <div class="info-right">
                    <span>昵称：{{ nickN }}</span>
                    <span>登录名：{{ name }}</span>
                    <span>个性签名：{{ intro }}</span>
                </div>
            </div>
        </div>
        <!-- 订单，账号管理，地址管理页面 -->
        <ul class="other">
            <li>
                <div>我的订单</div>
                <van-icon name="arrow" />
            </li>
            <li>
                <div>账号管理</div>
                <van-icon name="arrow" />
            </li>
            <li>
                <div>地址管理</div>
                <van-icon name="arrow" />
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
    import CommonHeader from '@/components/CommonHeader.vue'
    import { reactive, onMounted, toRefs } from 'vue'
    import { getInfo } from '@/api/user'

    // 用户信息
    const state = reactive({
        userInfo: {
            intro: '',
            name: '',
            nickN: '',
        }
    })
    const { intro, name, nickN } = toRefs(state.userInfo)
    onMounted(async () => {
        const { data: { data: { introduceSign, loginName, nickName } } } = await getInfo()
        intro.value = introduceSign
        name.value = loginName
        nickN.value = nickName
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .my {
        height: 100vh;
        padding: (46 / 37.5rem) 0 (50 / 37.5rem);

        .user-info {
            margin: (10 / 37.5rem);
            height: (115 / 37.5rem);
            background: linear-gradient(90deg, @primary, #51c7c7);
            box-shadow: 0 0.05333rem 0.13333rem #269090;
            border-radius: (6 / 37.5rem);

            .info {
                display: flex;
                align-items: center;
                padding: (25 / 37.5rem) (20 / 37.5rem);
                height: 100%;

                img {
                    display: block;
                    .wh((60 / 37.5rem), (60 / 37.5rem));
                    border-radius: 50%;
                }

                &-right {
                    display: flex;
                    flex-direction: column;
                    margin-left: (10 / 37.5rem);
                    font-size: (14 / 37.5rem);
                    color: #fff;
                    line-height: 1.7;
                }
            }
        }

        .other {
            margin-top: (20 / 37.5rem);
            padding: 0 (20 / 37.5rem);
            font-size: (14 / 37.5rem);
            color: #2c3e50;

            li {
                height: (40 / 37.5rem);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
</style>