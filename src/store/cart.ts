import { defineStore } from 'pinia'
import { getCart } from '@/api/good'

export const useCartStore = defineStore('Cart', {
    state: () => {
        return {
            count: 0
        }
    },
    actions: {
        async updateCart() {
            const { data: { data = [] } } = await getCart()
            this.count = data.length
        }
    }
})