import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import IngredientsView from '@/views/IngredientsView.vue'
import MyRecipesView from '@/views/MyRecipesView.vue'
import CreateRecipeView from '@/views/CreateRecipeView.vue'
import VerificationSuccess from '@/views/VerificationSuccess.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: IngredientsView
    },
    {
      path: '/my-recipes',
      name: 'my-recipes',
      component: MyRecipesView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateRecipeView
    },
    {
      path: '/verification-success',
      name: 'verification-success',
      component: VerificationSuccess
    }
  ]
})

export default router
