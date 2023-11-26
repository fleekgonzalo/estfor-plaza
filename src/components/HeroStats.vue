<template>
    <div class="card bg-base-100-50 shadow-xl rounded-lg">
        <div class="card-body">
            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-right">Melee</th>
                        <th class="text-right">Magic</th>
                        <th class="text-right">Ranged</th>
                        <th class="text-right">Melee Defence</th>
                        <th class="text-right">Magic Defence</th>
                        <th class="text-right">Ranged Defence</th>
                        <th class="text-right">Health</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- row 1 -->
                    <tr>
                        <th>Hero</th>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.meleeXP) }}</td>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.magicXP) }}</td>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.rangedXP) }}</td>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.defenceXP) }}</td>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.defenceXP) }}</td>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.defenceXP) }}</td>
                        <td class="text-right">{{ getLevel(coreStore.playerState?.healthXP) }}</td>
                    </tr>
                    <!-- row 2 -->
                    <tr>
                        <th>Equipment</th>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.melee < 0}">{{ itemStore.getAggregatedCombatStats.melee }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.magic < 0}">{{ itemStore.getAggregatedCombatStats.magic }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.ranged < 0}">{{ itemStore.getAggregatedCombatStats.ranged }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.meleeDefence < 0}">{{ itemStore.getAggregatedCombatStats.meleeDefence }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.magicDefence < 0}">{{ itemStore.getAggregatedCombatStats.magicDefence }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.rangedDefence < 0}">{{ itemStore.getAggregatedCombatStats.rangedDefence }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getAggregatedCombatStats.health < 0}">{{ itemStore.getAggregatedCombatStats.health }}</td>
                    </tr>
                    <!-- row 3 -->
                    <tr>
                        <th>Total</th>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.melee < 0}">{{ itemStore.getTotalCombatStats.melee }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.magic < 0}">{{ itemStore.getTotalCombatStats.magic }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.ranged < 0}">{{ itemStore.getTotalCombatStats.ranged }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.meleeDefence < 0}">{{ itemStore.getTotalCombatStats.meleeDefence }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.magicDefence < 0}">{{ itemStore.getTotalCombatStats.magicDefence }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.rangedDefence < 0}">{{ itemStore.getTotalCombatStats.rangedDefence }}</td>
                        <td class="text-right" :class="{'text-error': itemStore.getTotalCombatStats.health < 0}">{{ itemStore.getTotalCombatStats.health }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from '../store/items'
import { useCoreStore, getLevel } from '../store/core'

const itemStore = useItemStore()
const coreStore = useCoreStore()
</script>

<style scoped>
.table {
    table-layout: fixed;
}
</style>