import { get, post } from './fetch'

export type Ingredient = {
  _id: string
  name: string
}

export async function createIngredient(name: string) {
  return await post<string, { ingredientName: string }>(
    `/ingredients/add`,
    { ingredientName: name }
  )
}

export async function getIngredients() {
  const response = await get<Ingredient[]>(`/ingredients`)
  return response ?? []
}
