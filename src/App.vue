<template>
  <router-view></router-view>
  <TabBar v-if="isShow"></TabBar>
</template>

<script setup lang='ts'>
  import TabBar from '@/components/TabBar.vue'
  import { ref, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCartStore } from '@/store/cart'
  import { getToken } from '@/utils/auth'
  const Cart = useCartStore()
  const route = useRoute()

  const isShow = ref(false)

  watch(route, (newVal) => {
    isShow.value = newVal.meta.isShowInPage as boolean
  }, {
    immediate: true
  })

  onMounted(() => {
    const token = getToken()
    if (token) {
      Cart.updateCart()
    }
  })

</script>

<style scoped lang='less'></style>