<template>
    <header>
        <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="router.back()">
            <template #right>
                <van-icon name="ellipsis" :size="`${iconSize}`" />
            </template>
        </van-nav-bar>
    </header>
</template>

<script setup lang='ts'>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    withDefaults(defineProps<{
        title?: string
        leftArrow?: boolean
        iconSize?: number
        iconName?: string
    }>(), {
        title: () => '默认标题',
        leftArrow: () => true,
        iconSize: () => 18,
        iconName: () => 'ellipsis'
    })
</script>

<style scoped lang='less'>
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        background: #fff;
        border-bottom: 0.02667rem solid #dcdcdc;
    }
</style>