<script setup lang="ts">
import { ref, provide } from 'vue'
import type { Ref } from 'vue'
import { RouterView } from 'vue-router'
import { getUser } from '@/service/auth'
import type { User } from '@/service/auth'
import AppHeader from '@/components/AppHeader.vue'
import LoadingScreen from './components/LoadingScreen.vue'

const user = ref<User | null>(null)
const isLoading = ref(true)

getUser().then((data) => {
  if (data) {
    user.value = data
  }
}).finally(() => {
  isLoading.value = false
})

provide<Ref<User | null>>('user', user)
</script>

<template>
  <template v-if="!isLoading">
    <AppHeader />
    <RouterView />
  </template>
  <LoadingScreen v-else />
</template>
