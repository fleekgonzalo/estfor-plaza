<template>
    <div class="card bg-base-100-50 shadow-xl rounded-lg">
        <div class="card-body">
            <div class="overflow-x-auto">
                <table class="table md:table-md table-xs">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-right"><div class="flex gap-1 items-center justify-end">Damage Dealt Per Minute 
                            <ChevronUpDownIcon v-if="currentSort != 'damagePerMinute'" class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort('damagePerMinute', 'desc')"/>
                            <ChevronDownIcon v-else-if="currentSort == 'damagePerMinute' && currentDirection == 'desc'" class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort('damagePerMinute', 'asc')"/>
                            <ChevronUpIcon v-else class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort(null, 'desc')"/>
                        </div></th>
                        <th class="text-right"><div class="flex gap-1 items-center justify-end">Damage Taken Per Hour 
                            <ChevronUpDownIcon v-if="currentSort != 'damageTakenPerHour'" class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort('damageTakenPerHour', 'desc')"/>
                            <ChevronDownIcon v-else-if="currentSort == 'damageTakenPerHour' && currentDirection == 'desc'" class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort('damageTakenPerHour', 'asc')"/>
                            <ChevronUpIcon v-else class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort(null, 'desc')"/>
                        </div></th>
                        <th class="text-right"><div class="flex gap-1 items-center justify-end">XP Per Hour 
                            <ChevronUpDownIcon v-if="currentSort != 'xpPerHour'" class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort('xpPerHour', 'desc')"/>
                            <ChevronDownIcon v-else-if="currentSort == 'xpPerHour' && currentDirection == 'desc'" class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort('xpPerHour', 'asc')"/>
                            <ChevronUpIcon v-else class="w-6 text-white hover:text-gray-400 cursor-pointer" @click="updateSort(null, 'desc')"/>
                        </div></th>
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
                                            <div class="tooltip tooltip-primary tooltip-right" :data-tip="m.meleeDamagePerMinute.toString() + ' Melee Damage Per Minute'"><img src="/src/assets/melee.png" class="mask mask-squircle w-6" alt="Melee" /></div> {{ m.meleeDamagePerMinute }}
                                            <div class="tooltip tooltip-primary tooltip-right" :data-tip="m.magicDamagePerMinute.toString() + ' Magic Damage Per Minute'"><img src="/src/assets/magic.png" class="mask mask-squircle w-6" alt="Magic" /></div> {{ m.magicDamagePerMinute }}
                                            <div class="tooltip tooltip-primary tooltip-right" :data-tip="m.rangedDamagePerMinute.toString() + ' Ranged Damage Per Minute'"><img src="/src/assets/ranged.png" class="mask mask-squircle w-6" alt="Ranged" /></div> {{ m.rangedDamagePerMinute }}
                                            <div class="tooltip tooltip-primary tooltip-right" :data-tip="m.combatStats.health + ' Total Health'"><img src="/src/assets/health.png" class="mask mask-squircle w-6" alt="Health" /></div> {{ m.combatStats.health }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right">{{ m.damagePerMinute }}</td>
                            <td class="text-right">{{ m.damageTakenPerHour }}</td>
                            <td class="text-right">{{ m.xpPerHour.toFixed(0) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMonsterStore } from '../store/monsters'
import { computed, ref } from 'vue'
import { ChevronUpDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'

const monsterStore = useMonsterStore()
const monsterRankings = computed(() => {
    const storeRankings = [...monsterStore.getMonsterRankings]
    if (currentSort.value) {
        storeRankings.sort((a, b) => {
            if (currentDirection.value == 'desc') {
                // @ts-ignore
                return b[currentSort.value] > a[currentSort.value] ? 1 : -1
            } else {
                // @ts-ignore
                return a[currentSort.value] > b[currentSort.value] ? 1 : -1
            }
        })
    }
    return storeRankings.slice(0, 10)
})

const currentSort = ref<string | null>(null)
const currentDirection = ref('desc')

const updateSort = (sort: string | null, direction: string) => {
    currentSort.value = sort
    currentDirection.value = direction
}
</script>