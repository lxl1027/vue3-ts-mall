<template>
    <div class="edit">
        <!-- 通用头部 -->
        <CommenHeader :title="state.type === 'add' ? '新增地址' : '编辑地址'"></CommenHeader>
        <!-- 新增表单 -->
        <van-address-edit :area-list="areaList" :address-info="state.addressInfo" :show-delete="state.type === 'edit'"
            show-set-default show-search-result :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" />
    </div>
</template>

<script setup lang='ts'>
    import CommenHeader from '@/components/CommonHeader.vue'
    import { reactive, onMounted } from 'vue'
    import { areaList } from '@vant/area-data'
    import { AddressEditInfo, showToast } from 'vant'
    import { addAddress, modifyAddress, getSpecificAddress, deleteAddress } from '@/api/address'
    import { useRoute, useRouter } from 'vue-router'
    const route = useRoute()
    const router = useRouter()

    // 页面的状态
    const state = reactive({
        addressInfo: {
            id: '',
            name: '',
            tel: '',
            province: '',
            city: '',
            county: '',
            addressDetail: '',
            areaCode: '',
            isDefault: false
        },
        type: 'add', //默认是add 还有 edit
        addressId: ''
    })
    const onSave = async (info: AddressEditInfo) => {
        const data = {
            userName: info.name,
            userPhone: info.tel,
            provinceName: info.province,
            cityName: info.city,
            regionName: info.county,
            detailAddress: info.addressDetail,
            defaultFlag: info.isDefault ? 1 : 0,
        }
        if (state.type === 'edit') {
            const addressId = state.addressId
            await modifyAddress({
                addressId,
                ...data,
            })
        } else {
            await addAddress(data)
        }
        showToast('保存成功！')
        router.back()
    }
    const onDelete = async () => {
        await deleteAddress(state.addressId)
        showToast('删除成功！')
        router.back()
    }
    onMounted(async () => {
        const type = route.query.type as string
        const addressId = route.query.addressId as string
        state.type = type
        state.addressId = addressId
        if (type === 'edit') {
            const { data: { data } } = await getSpecificAddress(addressId)
            state.addressInfo.id = data.addressId.toString()
            state.addressInfo.name = data.userName
            state.addressInfo.tel = data.userPhone
            state.addressInfo.province = data.provinceName
            state.addressInfo.city = data.cityName
            state.addressInfo.county = data.regionName
            state.addressInfo.addressDetail = data.detailAddress
            state.addressInfo.isDefault = !!data.defaultFlag
        }
    })
</script>

<style scoped lang='less'>
    @import '@/styles/mixin.less';

    .edit {
        padding-top: (46 / 37.5rem);

        :deep(.van-button--primary) {
            background-color: @primary;
            border-color: @primary;
        }

        :deep(.van-switch--on) {
            background-color: @primary;
        }
    }
</style>