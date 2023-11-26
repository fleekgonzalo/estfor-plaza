<template>
    <div class="card bg-base-100-50 shadow-xl rounded-lg">
        <div class="card-body">
            <div class="overflow-x-auto">
                <table class="table md:table-md table-xs">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-right">Damage Dealt Per Minute</th>
                        <th class="text-right">Damage Taken Per Hour</th>
                        <th class="text-right">XP Per Hour</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="m in monsterRankings" :key="m.name">
                            <td>
                                <div class="flex items-center gap-3">
                                    <div class="avatar">
                                        <div class="mask mask-square rounded-lg w-12 h-12">
                                            <img :src="m.imgSource" :alt="m.name" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">{{ m.name }}</div>
                                        <div class="text-xs flex gap-2 items-center max-md:hidden">
                                            <img src="/src/assets/melee.png" class="mask mask-squircle w-6" alt="Melee" /> {{ m.meleeDamagePerHour }}
                                            <img src="/src/assets/magic.png" class="mask mask-squircle w-6" alt="Magic" /> {{ m.magicDamagePerHour }}
                                            <img src="/src/assets/ranged.png" class="mask mask-squircle w-6" alt="Ranged" /> {{ m.rangedDamagePerHour }}
                                            <img src="/src/assets/health.png" class="mask mask-squircle w-6" alt="Health" /> {{ m.combatStats.health }}
                                        </div>
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