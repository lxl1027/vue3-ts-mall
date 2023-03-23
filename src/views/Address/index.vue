<template>
    <div class="address">
        <!-- 通用头部 -->
        <CommenHeader :title="'地址管理'"></CommenHeader>
        <van-address-list v-if="state.from === 'create-order'" v-model="state.chosenAddressId" :list="state.list"
            default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="select" />
        <van-address-list v-else v-model="state.chosenAddressId" :list="state.list" default-tag-text="默认" @add="onAdd"
            @edit="onEdit" />
    </div>
</template>

<script setup lang='ts'>
    import CommenHeader from '@/components/CommonHeader.vue'
    import { reactive, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { getAddress } from '@/api/address'
    import type { AddressListAddress } from 'vant'
    const route = useRoute()
    const router = useRouter()
    const state = reactive<{
        chosenAddressId: string
        list: {
            id: number
            name: string
            tel: string
            address: string
            isDefault: boolean
        }[]
        from: string
    }>({
        chosenAddressId: '1',
        list: [],
        from: (route.query.from ?? '') as string
    })
    const select = (item: AddressListAddress, index: number) => {
        console.log(item, index)
        router.push({
            path: '/create-order',
            query: {
                addressId: item.id,
            }
        })
    }
    const onAdd = () => {
        router.push({
            path: '/address-edit',
            query: {
                type: 'add',
            }
        })
    }
    const onEdit = (item: AddressListAddress, index: number) => {
        console.log(item, index)
        router.push({
            path: '/address-edit',
            query: {
                type: 'edit',
                addressId: item.id
            }
        })
    }
    const init = async () => {
        const { data: { data } } = await getAddress()
        if (data.length === 0) {
            state.list = []
            return
        }
        state.list = data.map(item => {
            return {
                id: item.addressId,
                name: item.userName,
                tel: item.userPhone,
                address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
                isDefault: !!item.defaultFlag,
            }
        })
    }
    onMounted(() => {
        console.log(route.query)
        init()
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .address {
        padding-top: (46 / 37.5rem);

        :deep(.van-radio__icon--round) {
            display: none;
        }

        :deep(.van-tag--primary) {
            background: @primary;
        }

        :deep(.van-button--primary) {
            background-color: @primary;
            border-color: @primary;
        }
    }
</style>