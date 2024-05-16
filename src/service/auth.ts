import { get, post } from './fetch'

export type RegistrationForm = {
  name: string,
  email: string
  password: string
}

export type LoginForm = {
  email: string
  password: string
}

export type User = {
  id: string
  name: string
  email: string
}

export async function register(data: RegistrationForm) {
  return await post<string, RegistrationForm>(`/register`, data)
}

export async function login(data: LoginForm) {
  return await post<string, LoginForm>(`/login`, data)
}

export async function logout() {
  return await post(`/logout`)
}

export async function getUser() {
  return await get<User | null>(`/me`)
}
