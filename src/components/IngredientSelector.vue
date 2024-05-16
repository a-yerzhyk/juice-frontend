<script setup lang="ts">
import { toRefs, ref, watch, defineEmits } from 'vue'
import type { Ingredient } from '@/service/ingredients'


const props = defineProps({
  ingredients: Array<Ingredient>
})
const { ingredients } = toRefs(props)
const emit = defineEmits(['changed'])

const ingredientModel = defineModel({ type: String, default: '' })
const selectRef = ref<InstanceType<typeof HTMLSelectElement> | null>(null)
defineExpose({ selectRef })

const changed = (event: Event) => {
  console.log('changed', event)
}

watch(ingredientModel, (newValue) => {
  if (newValue) {
    emit('changed', newValue)
  }
})
</script>

<template>
  <select
    v-model="ingredientModel"
    ref="selectRef"
    class="text-black"
  >
    <option disabled value="">Please select one</option>
    <option
      v-for="ingredient in ingredients"
      :key="ingredient._id"
      :value="ingredient._id"
    >
      {{ ingredient.name }}
    </option>
  </select>
</template>