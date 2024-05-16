import { get, post } from './fetch'

export type RecipeIngredient = {
  ingredientId: string,
  name: string,
  quantity: string
}

export type Recipe = {
  _id: string
  name: string
  ingredients: RecipeIngredient[]
}

export async function getRecipes(ingredients: string[] = []) {
  let query = ''
  if (ingredients.length > 0) {
    query = `?ingredients=${ingredients.join(',')}`
  }
  const response = await get<Recipe[]>(`/recipes${query}`)
  return response ?? []
}

export type RecipeIngredientCreateForm = {
  ingredientId: string,
  quantity: string
}

export type RecipeCreateForm = {
  name: string
  ingredients: RecipeIngredientCreateForm[]
}

export async function createRecipe(recipe: RecipeCreateForm) {
  return await post<string, RecipeCreateForm>(
    `/recipes/add`,
    recipe
  )
}
