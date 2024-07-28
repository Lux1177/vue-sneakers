<script setup>

import DrawerHead from '@/components/DrawerHead.vue'
import CartItemList from '@/components/CartItemList.vue'
import InfoBlock from '@/components/InfoBlock.vue'
import axios from 'axios'
import { computed, inject, ref } from 'vue'

const props = defineProps({
    totalPrice: Number,
    vatPrice: Number
})

const { cart, closeDrawer } = inject('cart')

const isCreatingOrder = ref(false)
const orderId = ref(null)

const createOrder = async () => {
    try {
        isCreatingOrder.value = true
        const { data } = await axios.post('https://4c7c701565b21dc3.mokky.dev/orders', {
            items: cart.value,
            totalPrice: props.totalPrice
        })

        cart.value = []

        orderId.value = data.id
    } catch (err) {
        console.log(err)
    } finally {
        isCreatingOrder.value = false
    }
}

const buttonDisabled = computed(() => isCreatingOrder.value ? true : !(props.totalPrice))

</script>

<template>

    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">

        <DrawerHead />

        <div>
            <div v-if="!totalPrice || orderId" class="mt-80">
                <InfoBlock v-if="orderId"
                           title="Заказ оформлен!"
                           :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`"
                           image-url="/order-success-icon.png" />
                <InfoBlock v-if="!totalPrice && !orderId" title="Корзина пустая"
                           description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                           image-url="/package-icon.png" />
            </div>

            <div v-else>
                <CartItemList />

                <div class="flex flex-col gap-4 my-7">
                    <div class="flex gap-2">
                        <span>Итого:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>{{ totalPrice }} ₽</b>
                    </div>

                    <div class="flex gap-2">
                        <span>Налог 5%:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>{{ vatPrice }} ₽</b>
                    </div>
                    <button @click="createOrder" :disabled="buttonDisabled"
                            class="bg-lime-500 w-full rounded-xl py-4 mt-4 text-white disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700">
                        Оформить заказ
                    </button>

                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>

</style>