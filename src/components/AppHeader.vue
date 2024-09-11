<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Ref } from 'vue'
import type { User } from '@/service/auth'
import { RouterLink } from 'vue-router'

const user = inject<Ref<User | null>>('user')

const authItems = [
  {
    icon: 'pi pi-plus-circle',
    label: 'Create',
    route: '/create'
  },
  {
    icon: 'pi pi-list',
    label: 'My Recipes',
    route: '/my-recipes'
  },
  {
    icon: 'pi pi-sign-out',
    label: 'Logout',
    route: '/auth/logout'
  },
]

const unauthItems = [
  {
    icon: 'pi pi-user-plus',
    label: 'Registration',
    route: '/auth/registration'
  },
  {
    icon: 'pi pi-sign-in',
    label: 'Login',
    route: '/auth/login'
  },
]

const items = computed(() => {
  return user?.value ? authItems : unauthItems
})

</script>

<template>
  <div
    class="app-header border-b-1 rounded-b-sm"
  >
    <h1 class="text-2xl">LibJuice</h1>
    <div class="flex items-center gap-x-2">
      <div v-if="user">{{ user.name }}</div>
      <Button
        as="router-link"
        v-for="item in items"
        :key="item.label"
        :label="item.label"
        :to="item.route"
        :icon="item.icon"
        iconPos="left"
        severity="secondary"
        text
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header {
  max-width: 1680px;
  position: fixed;
  z-index: 2000; // primevue components z-index is around 1000
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: black;
}
</style>
