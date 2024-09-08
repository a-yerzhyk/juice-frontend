<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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

const ingredientsToInclude = ref<Set<Ingredient>>(new Set())
const ingredientsToExclude = ref<Set<Ingredient>>(new Set())

const ingredientsToIncludeIds = computed(() => {
  return Array.from(ingredientsToInclude.value).map((i) => i._id)
})
const ingredientsToExcludeIds = computed(() => {
  return Array.from(ingredientsToExclude.value).map((i) => i._id)
})

const addIncludeIngredient = (id: string) => {
  const ingredient = ingredients.value.find((i) => i._id === id)
  if (ingredient) {
    ingredientsToInclude.value.add(ingredient)
  }
}

const addExcludeIngredient = (id: string) => {
  console.log(id)
  const ingredient = ingredients.value.find((i) => i._id === id)
  if (ingredient) {
    ingredientsToExclude.value.add(ingredient)
  }
}

const removeIncludeIngredient = (ingredient: Ingredient) => {
  ingredientsToInclude.value.delete(ingredient)
}

const removeExcludeIngredient = (ingredient: Ingredient) => {
  ingredientsToExclude.value.delete(ingredient)
}

const searchRecipes = () => {
  // const ingredientIds = Array.from(ingredientsToInclude.value).map((i) => i._id)
  // getRecipes(ingredientIds).then((data) => {
  //   recipes.value = data
  // })
  // .catch((error) => {
  //   alert(error.message)
  // })
}

const filteredRecipes = computed(() => {
  if (ingredientsToIncludeIds.value.length === 0) {
    return recipes.value
  }
  const filtered = recipes.value.filter(({ ingredients }) => {
    const included = ingredients.some((ingredient) => ingredientsToIncludeIds.value.includes(ingredient.ingredientId))
    const excluded = ingredients.every(ingredient => !ingredientsToExcludeIds.value.includes(ingredient.ingredientId))
    return included && excluded
  })
  
  // Sort the filtered recipes
  const sorted = filtered.sort((a, b) => {
    const aMatch = a.ingredients.filter(ingredient => ingredientsToIncludeIds.value.includes(ingredient.ingredientId)).length;
    const bMatch = b.ingredients.filter(ingredient => ingredientsToIncludeIds.value.includes(ingredient.ingredientId)).length;

    return bMatch - aMatch; // Descending order
  })

  return sorted
})
</script>

<template>
  <div>
    <div class="flex gap-x-10">
      <div>
        <IngredientSelector
          :ingredients="ingredients"
          @change="addIncludeIngredient"
        />
        <ul>
          <li
            v-for="ingredient in ingredientsToInclude"
            :key="ingredient._id"
          >
            {{ ingredient.name }}
            <button class="button" @click.prevent="() => removeIncludeIngredient(ingredient)">
              Remove Ingredient
            </button>
          </li>
        </ul>
      </div>
      <div>
        <IngredientSelector
          :ingredients="ingredients"
          @change="addExcludeIngredient"
        />
        <ul>
          <li
            v-for="ingredient in ingredientsToExclude"
            :key="ingredient._id"
          >
            {{ ingredient.name }}
            <button class="button" @click.prevent="() => removeExcludeIngredient(ingredient)">
              Remove Ingredient
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- <br />
    <button @click="searchRecipes">Search</button>
    <br /> -->
    <br />
    <ul class="grid grid-cols-3 gap-[30px]">
      <li
        class="bg-white text-black border border-black rounded-lg py-3 px-4"
        v-for="recipe in filteredRecipes"
        :key="recipe._id"
      >
        <h3 class="text-3xl text-center mb-1">{{ recipe.name }}</h3>
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th class="text-end">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ingredient, index) in recipe.ingredients"
              :key="ingredient.ingredientId"
              :class="{
                'bg-green-400': ingredientsToIncludeIds.includes(ingredient.ingredientId)
              }"
            >
              <td>
                {{ index + 1 }}. {{ ingredient.name }}
              </td>
              <td class="text-end">
                {{ ingredient.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>