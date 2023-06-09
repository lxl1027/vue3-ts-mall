<template>
    <div class="login">
        <!-- 顶部导航栏 -->
        <CommonHeader :title="userInfo.isTitle ? '登录' : '注册'"></CommonHeader>
        <!-- logo -->
        <img class="logo" src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" width="100" height="100"
            alt="">
        <!-- 登录表单 -->
        <section class="login-form">
            <van-form @submit="onSubmit">
                <!-- 用户名 -->
                <van-field v-model="userInfo.username" name="用户名" label="用户名" placeholder="请输入手机号"
                    :rules="[{ required: true, message: '请填写用户名' }, { validator: nameValidator, message: '请输入正确格式的手机号码' }]" />
                <!-- 密码 -->
                <van-field v-model="userInfo.password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }, { validator: passwordValidator, message: '密码的长度要在6到16个字符之间' }]" />
                <van-field v-model="userInfo.identifyCode" name="验证码" label="验证码" placeholder="请输入验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]" />
                <!-- 验证码 -->
                <div class="identify-code">
                    <SIdentify :identifyCode="identifyCode" />
                    <a @click="refreshCode" class="change-code" href="javascript:;">换一张</a>
                </div>
                <!-- 切换登录/注册 -->
                <div @click="changeLogOrReg">
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
    import CommonHeader from '@/components/CommonHeader.vue'
    import SIdentify from '@/components/SIdentify.vue'
    import { showFailToast, showNotify } from 'vant'
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { register, login } from '@/api/user'
    import { useCartStore } from '@/store/cart'
    const Cart = useCartStore()
    const router = useRouter()
    // 用户页面的信息
    let userInfo = reactive({
        username: '',
        password: '',
        isTitle: true, // true表示登录 false表示注册
        identifyCode: ''
    })
    // 选择登录或者注册
    const changeLogOrReg = () => {
        userInfo.isTitle = !userInfo.isTitle
        resetForm()
    }
    // 清空表单
    const resetForm = () => {
        userInfo.username = ''
        userInfo.password = ''
        userInfo.identifyCode = ''
        refreshCode()
    }
    // submit
    const onSubmit = async () => {
        /* 校验，用户名、密码、验证码必须同时符合条件才能发送请求 */
        // 用户名格式错误
        if (!nameValidator(userInfo.username)) {
            return showFailToast('用户名格式错误')
        }
        // 密码格式错误
        if (!passwordValidator(userInfo.password)) {
            return showFailToast('密码格式错误')
        }
        // 验证码错误
        if (!(userInfo.identifyCode === identifyCode
            .value)) {
            userInfo.identifyCode = ''
            refreshCode()
            return showFailToast('验证码有误')
        }
        // 登录
        if (userInfo.isTitle) {
            try {
                await login(userInfo.username, userInfo.password)
                showNotify({
                    message: '登录成功',
                    type: 'success',
                    duration: 1000,
                    background: '#1baeae',
                    color: '#fff'
                })
                // 登录以后获取购物车数据
                Cart.updateCart()
                router.replace('/home')
            } catch (err) {
                resetForm()
                console.log('Error:', err)
            }
        } else {
            //  注册
            try {
                await register(userInfo.username, userInfo.password)
                showNotify({
                    message: '注册成功',
                    type: 'success',
                    duration: 1000,
                    background: '#1baeae',
                    color: '#fff'
                })
                resetForm()
                userInfo.isTitle = true
            } catch (err) {
                resetForm()
                console.log('Error:', err)
            }
        }
    }
    // 手机号验证规则
    const nameValidator = (val: string) => {
        /*  
         1、以1开头
         2、第二位数字为3，4，5，6，7，8，9中一个
         3、第三位到十一位数字为0到9的任意一个数字 
         */
        const regStr = /^1[3-9]\d{9}$/
        const valid = regStr.test(val)
        if (valid) return true
        else return false
    }
    // 密码验证规则
    const passwordValidator = (val: string) => {
        if (val.length >= 6 && val.length <= 16) return true
        else return false
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
    @import '@/styles/mixin.less';

    .login {
        padding-top: (46 / 37.5rem);

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
                        color: @primary;
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