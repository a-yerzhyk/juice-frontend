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

const recipeNameRef = ref(null)
const selectorRef = ref(null)

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
      // @ts-ignore
      selectorRef.value[selectorRef.value.length - 1].selectRef?.$el.focus()
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
      // @ts-ignore
      recipeNameRef.value?.$el.focus()
    })
    .catch((error) => {
      alert(error.message)
    })
}

onMounted(() => {
  nextTick(() => {
    // @ts-ignore
    recipeNameRef.value?.$el.focus()
  })
})

</script>

<template>
  <div>
    <form
      class="flex flex-col items-start gap-y-4"
      @submit.prevent="confirmCreateRecipe"
      autocomplete="chrome-off"
    >
      <InputGroup class="w-fit">
        <InputGroupAddon>
            <i class="pi pi-hashtag"></i>
        </InputGroupAddon>
        <InputText
          ref="recipeNameRef"
          v-model="recipeToCreate.name"
          type="text"
          placeholder="Recipe Name"
          name="ingredient"
          autocomplete="off"
        />
      </InputGroup>
      <div
        v-for="ingredient in recipeToCreate.ingredients"
        :key="ingredient.id"
      >
        <div class="flex gap-x-3 items-center" v-if="ingredients">
          <IngredientSelector
            ref="selectorRef"
            v-model="ingredient.ingredientId"
            :ingredients="ingredients"
          />
          <InputGroup class="w-fit">
            <InputGroupAddon>
                <i class="pi pi-hashtag"></i>
            </InputGroupAddon>
            <InputText
              v-model="ingredient.quantity"
              type="text"
              placeholder="Quantity"
            />
          </InputGroup>
          <Button
            icon="pi pi-times"
            severity="danger"
            rounded
            @click.prevent="() => removeIngredient(ingredient.id!)"
          />
        </div>
      </div>
      <Button @click.prevent="addIngredient" severity="info">Add Ingredient</Button>
      <Button type="submit">Create</Button>
    </form>
  </div>
</template>