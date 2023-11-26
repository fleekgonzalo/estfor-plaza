<template>
    <div class="flex items-center justify-center flex-col">
        <div class="border-2 bg-base-100-50 border-solid rounded-lg border-primary w-full text-center p-5 my-5">{{ coreStore.playerState?.name }}</div>
        <img :src="avatarSrc" class="rounded-lg border-solid border-2 border-primary" />        
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCoreStore } from '../store/core'

const coreStore = useCoreStore()

const avatarSrc = computed(() => {
    return `https://media.estfor.com/characters/${coreStore.playerState?.avatarId}.jpg`
})
</script>

<style scoped>
img {
    object-fit:contain;
    height: auto;
    width: 100%;
}
</style>