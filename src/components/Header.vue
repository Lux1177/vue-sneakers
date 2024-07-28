<script setup>

defineProps({
    totalPrice: Number
})

const emit = defineEmits(['openDrawer'])

</script>

<template>
    <header class="flex justify-between px-10 py-8 border-b border-slate-200">
        <router-link to="/">
            <div class="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" class="w-10">
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-400">Магазин лучших кроссовок</p>
                </div>
            </div>
        </router-link>
        <ul class="flex items-center gap-10">
            <li @click="() => emit('openDrawer')"
                class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
                <img src="/cart.svg" alt="Cart">
                <b>{{ totalPrice }} pуб.</b>
            </li>
            <router-link to="/favorites" class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
                <img src="/heart.svg" alt="Heart">
                <span>Закладки</span>
            </router-link>
            <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
                <img src="/profile.svg" alt="Profile">
                <span>Профиль</span>
            </li>
        </ul>
    </header>
</template>

<style scoped>

</style>