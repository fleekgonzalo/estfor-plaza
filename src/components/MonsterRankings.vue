<template>
    <div class="card bg-base-100-50 shadow-xl rounded-lg">
        <div class="card-body">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                    <tr>
                        <th class="w-12"></th>
                        <th class="text-right">Damage Per Minute</th>
                        <th class="text-right">Damage Taken Per Hour</th>
                        <th class="text-right">XP Per Hour</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="m in monsterRankings" :key="m.name">
                            <td class="w-12">
                                <div class="avatar">
                                    <div class="mask mask-square rounded-lg w-12 h-12">
                                        <img :src="m.imgSource" :alt="m.name" />
                                    </div>
                                </div>
                            </td>
                            <td class="text-right">{{ m.damagePerMinute }}</td>
                            <td class="text-right">{{ m.damageTakenPerHour }}</td>
                            <td class="text-right">{{ m.xpPerHour }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMonsterStore } from '../store/monsters'
import { computed } from 'vue'


const monsterStore = useMonsterStore()
const monsterRankings = computed(() => monsterStore.getMonsterRankings.slice(0, 10))
</script>