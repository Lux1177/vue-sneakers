<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
})

const onClickAddRemoveCart = (item) => {
    if (!item.isAdded) {
        addToCart(item)
    } else {
        removeFromCart(item)
    }
    console.log(cart.value)
}

const addToFavorite = async (item) => {
    try {

        if (!item.isFavorite) {
            const obj = {
                item_id: item.id
            }
            item.isFavorite = true
            const { data } = await axios.post('https://4c7c701565b21dc3.mokky.dev/favorites', obj)

            item.favoriteId = data.id
        } else {
            item.isFavorite = false
            await axios.delete(`https://4c7c701565b21dc3.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null
        }
    } catch (err) {
        console.log(err)
    }
}

const fetchFavorites = async () => {
    try {
        const { data: favorites } = await axios.get('https://4c7c701565b21dc3.mokky.dev/favorites')

        items.value = items.value.map(item => {
            const favorite = favorites.find((favorite) => favorite.item_id === item.id)

            if (!favorite) {
                return item
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }

        })
    } catch (e) {
        console.log(e)
    }
}
const fetchItems = async () => {
    try {
        const params = {
            sortBy: filters.sortBy
        }

        if (filters.searchQuery) {
            params.title = `*${filters.searchQuery}*`
        }

        const { data } = await axios.get(
            'https://4c7c701565b21dc3.mokky.dev/items', {
                params
            })

        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false
        }))
    } catch (e) {
        console.log(e)
    }
}

onMounted(async () => {
    const localCart = localStorage.getItem('cart')
    cart.value = localCart ? JSON.parse(localCart) : []

    await fetchItems()
    await fetchFavorites()

    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
})

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

watch(filters,
    debounce(() => {
            fetchItems()
            fetchFavorites()
        },
        300)
)

</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex gap-4">
            <select v-model="filters.sortBy"
                    class="bg-white text-black py-2 px-3 border rounded-md outline-none focus:border-gray-400 cursor-pointer">
                <option value="title">По названию (А-Я)</option>
                <option value="price">По цене (дешевле)</option>
                <option value="-price">По цене (дороже)</option>
            </select>

            <div class="relative">
                <img class="absolute left-4 top-3" src="/search.svg" alt="Search">
                <input v-model="filters.searchQuery"
                       class="bg-white text-black border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                       type="text" placeholder="Поиск...">
            </div>
        </div>
    </div>

    <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddRemoveCart" />
    </div>
</template>

<style scoped>

</style>