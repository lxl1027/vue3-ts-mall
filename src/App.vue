<template>
  <router-view></router-view>
  <TabBar v-if="isShow"></TabBar>
</template>

<script setup lang='ts'>
  import TabBar from '@/components/TabBar.vue'
  import { ref, reactive, watch } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  const isShow = ref(false)

  watch(route, (newVal) => {
    isShow.value = newVal.meta.isShowInPage as boolean
  }, {
    immediate: true
  })



</script>

<style scoped lang='less'></style>