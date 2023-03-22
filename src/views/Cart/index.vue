<template>
    <div class="cart">
        <!-- 顶部导航栏 -->
        <CommonHeader :title="'购物车'" :left-arrow="true" :icon-size="18"></CommonHeader>

        <!--  -->
    </div>
</template>

<script setup lang='ts'>
    import CommonHeader from '@/components/CommonHeader.vue'
    import { ref, reactive } from 'vue'
</script>

<style scoped lang='less'>
    .cart {
        header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            width: 100%;
            background: #fff;
            border-bottom: 0.02667rem solid #dcdcdc;
        }
    }
</style>