<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { User } from '@/service/auth'
import { logout } from '@/service/auth'
import { RouterLink } from 'vue-router'
import LinkButton from '@/components/LinkButton.vue'

const user = inject<Ref<User | null>>('user')
const handleLogout = () => {
  logout().then(success => {
    if (success && user !== undefined)
      user.value = null
  })
}
</script>

<template>
  <header className="app-header">
    <h1>YourJuice</h1>
    <div class="app-header__controls" v-if="user !== undefined">
      <span v-if="user" class="">{{ user.name }}</span>
      <RouterLink v-if="user" to='/create'>
        Create
      </RouterLink>
      <RouterLink v-if="user" to='/my-recipes'>
        My Recipes
      </RouterLink>
      <RouterLink v-if="user === null" to='/registration'>
        Register
      </RouterLink>
      <RouterLink v-if="user === null" to='/login'>
        Login
      </RouterLink>
      <LinkButton v-if="user !== null" @click="handleLogout">
        Logout
      </LinkButton>
    </div>
  </header>
</template>
