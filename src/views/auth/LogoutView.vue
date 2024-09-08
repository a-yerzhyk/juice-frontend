<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { User } from '@/service/auth'
import { logout } from '@/service/auth'
import { useRouter } from 'vue-router'
import LoadingScreen from '@/components/LoadingScreen.vue'

const router = useRouter()
const user = inject<Ref<User | null>>('user')
logout().then(success => {
  if (success && user !== undefined)
    user.value = null
})
.finally(() => {
  router.push('/')
})

</script>

<template>
  <LoadingScreen />
</template>
