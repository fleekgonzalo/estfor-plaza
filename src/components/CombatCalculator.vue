<template>
    <div class="flex my-10 gap-10">
        <Avatar class="flex-initial w-1/3 min-w-[200px]" />
        <div class="flex-grow card bg-base-100-50 shadow-xl rounded-lg">
            <div class="card-body flex flex-wrap">
                <ItemSelect :items="headItems" label="Head" @update:model-value="onUpdate" v-model="equippedItems.head" />
                <ItemSelect :items="neckItems" label="Neck" @update:model-value="onUpdate" v-model="equippedItems.neck" />
                <ItemSelect :items="bodyItems" label="Body" @update:model-value="onUpdate" v-model="equippedItems.body" />
                <ItemSelect :items="armItems" label="Arms" @update:model-value="onUpdate" v-model="equippedItems.arms" />
                <ItemSelect :items="legItems" label="Legs" @update:model-value="onUpdate" v-model="equippedItems.legs" />
                <ItemSelect :items="feetItems" label="Feet" @update:model-value="onUpdate" v-model="equippedItems.feet" />
                <ItemSelect :items="rightHandItems" label="Right Hand" @update:model-value="onUpdate" v-model="equippedItems.rightHand" :empty-equipment="false" />
                <ItemSelect v-if="isMelee" :items="leftHandItems" label="Left Hand" @update:model-value="onUpdate" v-model="equippedItems.leftHand" />
                <ItemSelect v-if="isMagic" :items="magicBagItems" label="Magic Bag" @update:model-value="onUpdate" v-model="equippedItems.magicBag" :empty-equipment="false" />
                <ItemSelect v-if="isRanged" :items="quiverItems" label="Quiver" @update:model-value="onUpdate" v-model="equippedItems.quiver" disabled :empty-equipment="false" />
            </div>
        </div>
    </div>
    <HeroStats class="my-10" />
    <MonsterRankings />
</template>

<script setup lang="ts">
import { EquipPosition, Skill } from "@paintswap/estfor-definitions/types"
import { useItemStore } from '../store/items'
import Avatar from './Avatar.vue'
import HeroStats from './HeroStats.vue'
import ItemSelect from './inputs/ItemSelect.vue'
import { computed, nextTick, ref } from "vue"
import MonsterRankings from "./MonsterRankings.vue"

const itemStore = useItemStore()
const equippedItems = ref({ ...itemStore.equippedItems })

const headItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.HEAD))
const neckItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.NECK))
const rightHandItems = computed(() => ([ ...itemStore.getItemsForSlotAndXP(EquipPosition.RIGHT_HAND), ...itemStore.getItemsForSlotAndXP(EquipPosition.BOTH_HANDS)]))
const leftHandItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.LEFT_HAND))
const bodyItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.BODY))
const legItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.LEGS))
const feetItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.FEET))
const armItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.ARMS))
const quiverItems = computed(() => itemStore.getItemsForSlotAndXP(EquipPosition.QUIVER))
const magicBagItems = computed(() => itemStore.getMagicActionChoicesForXP)

const onUpdate = async () => {
    await nextTick() // wait for the model to update
    if (isRanged.value) {
        equippedItems.value.quiver = itemStore.rangedActionChoices.find(x => x.handItemTokenIdRangeMin === equippedItems.value.rightHand)?.inputTokenIds[0]
        equippedItems.value.magicBag = undefined
        equippedItems.value.leftHand = undefined
    }
    if (isMagic.value) {
        equippedItems.value.quiver = undefined
        equippedItems.value.leftHand = undefined
    }
    if (isMelee.value) {
        equippedItems.value.quiver = undefined
        equippedItems.value.magicBag = undefined
    }
    itemStore.updateEquippedItems(equippedItems.value)
}

const isMelee = computed(() => {
    return rightHandItems.value.find(x => x.tokenId === equippedItems.value.rightHand && x.skill === Skill.MELEE)
})

const isRanged = computed(() => {
    return rightHandItems.value.find(x => x.tokenId === equippedItems.value.rightHand && x.skill === Skill.RANGED)
})

const isMagic = computed(() => {
    return rightHandItems.value.find(x => x.tokenId === equippedItems.value.rightHand && x.skill === Skill.MAGIC)
})
</script>