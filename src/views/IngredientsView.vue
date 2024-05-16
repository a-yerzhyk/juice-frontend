<script setup lang="ts">
import { ref, computed } from 'vue'
import { createIngredient, getIngredients } from '@/service/ingredients'
import type { Ingredient } from '@/service/ingredients'

const ingredientName = ref('')
const ingredients = ref<Ingredient[]>([])

const loadIngredients = () => {
  getIngredients()
    .then((data) => {
      ingredients.value = data
    })
    .catch((error) => {
      alert(error.message)
    })
}

loadIngredients()

const confirmCreateIngredient = () => {
  if (!ingredientName.value) {
    alert('Please fill in all fields')
    return
  }
  createIngredient(ingredientName.value)
    .then(() => {
      loadIngredients()
      ingredientName.value = ''
    })
    .catch((error) => {
      alert(error.message)
    })
}

const computedIngredients = computed(() => {
  return ingredients.value.filter((ingredient) => {
    return ingredient.name.toLowerCase().includes(ingredientName.value.toLowerCase())
  })
})
</script>

<template>
  <div>
    <form @submit.prevent="confirmCreateIngredient" autocomplete="chrome-off">
      <input
        v-model="ingredientName"
        type="text"
        placeholder="Ingredient Name"
        name="ingredient"
        autocomplete="off"
      />
      <br />
      <input type="submit" value="Create" />
    </form>
    <br />
    <ol>
      <li v-for="ingredient in computedIngredients" :key="ingredient._id">
        {{ ingredient.name }}
      </li>
    </ol>
  </div>
</template>