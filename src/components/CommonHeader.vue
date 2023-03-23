<template>
    <header>
        <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="goBack">
            <template #right>
                <van-icon name="ellipsis" :size="`${iconSize}`" />
            </template>
        </van-nav-bar>
    </header>
</template>

<script setup lang='ts'>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const props = withDefaults(defineProps<{
        title?: string
        leftArrow?: boolean
        iconSize?: number
        iconName?: string
        path?: string
    }>(), {
        title: () => '默认标题',
        leftArrow: () => true,
        iconSize: () => 18,
        iconName: () => 'ellipsis',
        path: () => ''
    })

    const emits = defineEmits<{
        (e: 'callback'): void
    }>()

    const goBack = () => {
        const path = props.path
        console.log(path)
        if (path) {
            router.push(path)
        } else {
            console.log(1)
            router.back()
        }
        emits('callback')
    }
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