<template>
    <div class="setting">
        <CommenHeader :title="'账号管理'"></CommenHeader>
        <div class="input-item">
            <van-field v-model="state.nickName" label="昵称" />
            <van-field v-model="state.introduction" label="个性签名" />
            <van-field v-model="state.password" label="修改密码" />
        </div>
        <van-button round color="#1baeae" class="save-btn" block @click="handleModify">保存</van-button>
        <van-button round color="#1baeae" class="save-btn" block @click="handleLogout">退出登录</van-button>
    </div>
</template>

<script setup lang='ts'>
    import CommenHeader from '@/components/CommonHeader.vue'
    import { ref, reactive, onMounted } from 'vue'
    import { getInfo, logout, modifyInfo } from '@/api/user'
    import { removeToken } from '@/utils/auth'
    import { showFailToast, showSuccessToast } from 'vant';

    const state = reactive({
        nickName: '',
        introduction: '',
        password: '',
    })
    const handleModify = async () => {
        console.log(state.password.length)
        if (state.password !== '' && state.password.length < 6) {
            showFailToast('密码长度要大于6个字符')
            state.password = ''
            return
        } else {
            await modifyInfo(state.nickName, state.introduction, state.password)
            showSuccessToast('保存成功！')
        }
    }
    const handleLogout = async () => {
        const { data } = await logout()
        if (data.resultCode === 200) {
            removeToken()
            location.href = '/home'
        }
    }
    onMounted(async () => {
        const { data: { data } } = await getInfo()
        state.nickName = data.nickName
        state.introduction = data.introduceSign
    })
</script>

<style scoped lang='less'>
    .setting {
        padding-top: (46 / 37.5rem);

        .save-btn {
            width: 80%;
            margin: (20 / 27.5rem) auto;
        }
    }
</style>