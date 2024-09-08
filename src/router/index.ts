import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import LogoutView from '@/views/auth/LogoutView.vue'
import RegistrationView from '@/views/auth/RegistrationView.vue'
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
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
      component: AuthView,
      children: [
        {
          path: 'registration',
          name: 'registration',
          component: RegistrationView
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'logout',
          name: 'logout',
          component: LogoutView
        },
      ]
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
    },
    {
      path: '/registration-success',
      redirect: { name: 'login' }
    }
  ]
})

export default router
