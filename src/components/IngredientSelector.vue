// @ts-ignore
<script setup lang="ts">
import { toRefs, ref } from 'vue'
import type { Ingredient } from '@/service/ingredients'
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';

const ingredientModel = defineModel({ type: String, default: '' })

const props = defineProps<{
  ingredients: Array<Ingredient>
}>()
const { ingredients } = toRefs(props)

const selectRef = ref(null)
defineExpose({ selectRef })

const emit = defineEmits(['change'])

const filteredIngredients = ref<Ingredient[]>([])

const search = (event: AutoCompleteCompleteEvent) => {
  if (!event.query.trim().length) {
    filteredIngredients.value = [...ingredients.value];
  } else {
    filteredIngredients.value = ingredients.value.filter((ingredient) => {
      return ingredient.name.toLowerCase().startsWith(event.query.toLowerCase());
    });
  }
}
const value = ref()
</script>

<template>
  <AutoComplete
    ref="selectorRef"
    v-model="value"
    optionLabel="name"
    dropdown
    :suggestions="filteredIngredients"
    @complete="search"
    @change="(e) => (ingredientModel = e.value._id, emit('change', e.value._id))"
  >
    <template #option="{ option }">
      <div>{{ option.name }}</div>
    </template>
  </AutoComplete>
</template>