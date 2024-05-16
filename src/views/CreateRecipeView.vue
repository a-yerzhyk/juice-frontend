<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { getIngredients } from '@/service/ingredients'
import type { Ingredient } from '@/service/ingredients'
import { createRecipe } from '@/service/recipes'
import IngredientSelector from '@/components/IngredientSelector.vue';

type RecipeIngredientCreateForm = {
  id: string,
  ingredientId: string,
  quantity: string
}

type RecipeCreateForm = {
  name: string
  ingredients: Array<RecipeIngredientCreateForm>
}

const ingredients = ref<Ingredient[]>([])
getIngredients().then((data) => {
  ingredients.value = data
})

const recipeNameRef = ref<InstanceType<typeof HTMLInputElement> | null>(null)
const selectorRef = ref<InstanceType<typeof IngredientSelector>[] | null>(null)

const getNewIngredient = (): RecipeIngredientCreateForm => {
  return {
    id: Math.random().toString(36).substring(2),
    ingredientId: '',
    quantity: ''
  }
}

const recipeToCreate = reactive<RecipeCreateForm>({
  name: '',
  ingredients: [getNewIngredient()]
})

const addIngredient = () => {
  recipeToCreate.ingredients.push(getNewIngredient())
  nextTick(() => {
    if (selectorRef.value !== null) {
      selectorRef.value[selectorRef.value.length - 1].selectRef?.focus()
    }
  })
}

const removeIngredient = (id: string) => {
  recipeToCreate.ingredients =
    recipeToCreate.ingredients.filter(i => i.id !== id)
}

const confirmCreateRecipe = () => {
  if (!recipeToCreate.name) {
    alert('Please fill in recipe name')
    return
  }
  if (!recipeToCreate.ingredients
    .every((ingredient) => !!ingredient.ingredientId && !!ingredient.quantity)
  ) {
    alert('Please fill in ingredient')
    return
  }
  createRecipe({
    name: recipeToCreate.name,
    ingredients: recipeToCreate.ingredients.map(item => ({
      ingredientId: item.ingredientId,
      quantity: item.quantity.trim()
    }))
  })
    .then(() => {
      recipeToCreate.name = ''
      recipeToCreate.ingredients = [getNewIngredient()]
      recipeNameRef.value?.focus()
    })
    .catch((error) => {
      alert(error.message)
    })
}

onMounted(() => {
  recipeNameRef.value?.focus()
})

</script>

<template>
  <div>
    <form @submit.prevent="confirmCreateRecipe" autocomplete="chrome-off">
      <input
        ref="recipeNameRef"
        v-model="recipeToCreate.name"
        type="text"
        placeholder="Recipe Name"
        name="ingredient"
        autocomplete="off"
      />
      <br />
      <div
        v-for="ingredient in recipeToCreate.ingredients"
        :key="ingredient.id"
      >
        <template v-if="ingredients">
          <IngredientSelector
            ref="selectorRef"
            v-model="ingredient.ingredientId"
            :ingredients="ingredients"
          />
          <input
            v-model="ingredient.quantity"
            type="text"
            placeholder="Quantity"
          />
          <button @click.prevent="() => removeIngredient(ingredient.id!)">
            Remove Ingredient
          </button>
        </template>
      </div>
      <button @click.prevent="addIngredient">Add Ingredient</button>
      <br />
      <input type="submit" value="Create" />
    </form>
    <!-- <br />
    <ol>
      <li v-for="ingredient in computedIngredients" :key="ingredient.id">
        {{ ingredient.name }}
      </li>
    </ol> -->
  </div>
</template>