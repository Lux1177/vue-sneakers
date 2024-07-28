<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '@/components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
    try {
        const { data } = await axios.get('https://4c7c701565b21dc3.mokky.dev/favorites?_relations=items')

        favorites.value = data.map(obj => obj.item)
    } catch (err) {
        console.log(err)
    }
})

</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    </div>
    <div class="mt-10">
        <CardList :items="favorites" is-favorites />
    </div>
</template>

<style scoped>

</style>