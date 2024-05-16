<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getIngredients } from '@/service/ingredients'
import type { Ingredient } from '@/service/ingredients'
import { getRecipes } from '@/service/recipes'
import type { Recipe } from '@/service/recipes'
import IngredientSelector from '@/components/IngredientSelector.vue';

const recipes = ref<Recipe[]>([])
getRecipes().then((data) => {
  recipes.value = data
})
.catch((error) => {
  alert(error.message)
})

const ingredients = ref<Ingredient[]>([])
getIngredients().then((data) => {
  ingredients.value = data
})

const newIngredient = ref<string>('')
const ingredientsToSearch = ref<Set<Ingredient>>(new Set())

const addIngredient = (id: string) => {
  const ingredient = ingredients.value.find((i) => i._id === id)
  if (ingredient) {
    ingredientsToSearch.value.add(ingredient)
  }
}

const removeIngredient = (ingredient: Ingredient) => {
  ingredientsToSearch.value.delete(ingredient)
}

const searchRecipes = () => {
  const ingredientIds = Array.from(ingredientsToSearch.value).map((i) => i._id)
  getRecipes(ingredientIds).then((data) => {
    recipes.value = data
  })
  .catch((error) => {
    alert(error.message)
  })
}
</script>

<template>
  <div>
    <IngredientSelector
      v-model="newIngredient"
      :ingredients="ingredients"
      @changed="addIngredient"
    />
    <ul>
      <li
        v-for="ingredient in ingredientsToSearch"
        :key="ingredient._id"
      >
        {{ ingredient.name }}
        <button @click.prevent="() => removeIngredient(ingredient)">
          Remove Ingredient
        </button>
      </li>
    </ul>
    <br />
    <button @click="searchRecipes">Search</button>
    <br />
    <br />
    <ol>
      <li v-for="recipe in recipes" :key="recipe._id">
        {{ recipe.name }}
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.ingredientId">
              {{ ingredient.ingredientId }} - {{ ingredient.quantity }}
            </li>
          </ul>
      </li>
    </ol>
  </div>
</template>