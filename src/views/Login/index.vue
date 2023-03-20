<template>
    <div class="login">
        <!-- 顶部导航栏 -->
        <header>
            <van-nav-bar :title="userInfo.isTitle ? '登录' : '注册'" left-arrow @click-left="router.back()">
                <template #right>
                    <van-icon name="ellipsis" size="18" />
                </template>
            </van-nav-bar>
        </header>
        <!-- logo -->
        <img class="logo" src="@/assets/logo.png" width="100" height="100" alt="">
        <!-- 登录表单 -->
        <section class="login-form">
            <van-form @submit="onSubmit">
                <!-- 用户名 -->
                <van-field v-model="userInfo.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <!-- 密码 -->
                <van-field v-model="userInfo.password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="userInfo.identifyCode" name="验证码" label="验证码" placeholder="请输入验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]" />
                <!-- 验证码 -->
                <div class="identify-code">
                    <SIdentify :identifyCode="identifyCode" />
                    <a @click="refreshCode" class="change-code" href="javascript:;">换一张</a>
                </div>
                <!-- 切换登录/注册 -->
                <div @click="userInfo.isTitle = !userInfo.isTitle">
                    <p class="change-log-reg">{{ userInfo.isTitle ? '立即注册' : '已有账号，立即登录' }}</p>
                </div>
                <!-- 提交 -->
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        {{ userInfo.isTitle ? '登录' : '注册' }}
                    </van-button>
                </div>
            </van-form>

        </section>
    </div>
</template>

<script setup lang='ts'>
    import SIdentify from '@/components/SIdentify.vue'
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    let userInfo = reactive({
        username: '17301691372',
        password: '123456',
        isTitle: true, // true表示登录 false表示注册
        identifyCode: ''
    })
    // submit
    const onSubmit = () => {

    }

    // 图形验证码
    let identifyCodes = "1234567890"
    let identifyCode = ref('')

    const randomNum = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const makeCode = (o: string, l: number) => {
        for (let i = 0; i < l; i++) {
            identifyCode.value += o[
                randomNum(0, o.length)
            ];
        }
    }

    const refreshCode = () => {
        identifyCode.value = "";
        makeCode(identifyCodes, 4);
    }

    onMounted(() => {
        identifyCode.value = "";
        makeCode(identifyCodes, 4);
    })
</script>

<style scoped lang='less'>
    .login {
        width: 100%;
        height: 100%;

        header {
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            border-bottom: 0.02667rem solid #dcdcdc;
        }

        .logo {
            width: 3.2rem;
            height: 3.2rem;
            display: block; // 清除img的空白边距
            margin: (36 / 37.5rem) auto (10 / 37.5rem);
        }

        &-form {
            padding: 0 0.53333rem;

            .van-form {

                .identify-code {
                    display: flex;
                    align-items: center;
                    margin-bottom: (10 / 37.5rem);

                    a.change-code {
                        margin-left: (10 / 37.5rem);
                        font-size: .4rem;
                        opacity: .7;
                        color: #1baeae;
                    }

                    a.change-code:active {
                        opacity: 1;
                    }
                }

                .change-log-reg {
                    font-size: 0.37333rem;
                    text-align: center;
                    margin-bottom: (10 / 37.5rem);
                    color: #1989fa;
                }

                .van-button--round {
                    background: rgb(27, 174, 174);
                    border-color: rgb(27, 174, 174);
                }
            }
        }
    }
</style>