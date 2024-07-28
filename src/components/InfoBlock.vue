<script setup>

defineProps({
    imageUrl: String,
    title: String,
    description: String,
})

</script>

<template>

    <div class="flex flex-col items-center text-center mx-auto">
        <img height="70px" width="70px" :src="imageUrl" alt="Info image">
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400" >{{ description }}</p>
    </div>
</template>

<style scoped>

</style>