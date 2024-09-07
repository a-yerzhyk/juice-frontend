<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, getUser } from '@/service/auth'
import type { User } from '@/service/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const user = inject<Ref<User | null>>('user')

if (user !== undefined && user.value !== null) {
  router.replace('/')
}

const confirmLogIn = () => {
  if (!email.value || !password.value) {
    alert('Please fill in all fields')
    return
  }
  login({
    email: email.value,
    password: password.value
  })
    .then(() => {
      return getUser()
    })
    .then((data) => {
      if (data && user !== undefined)
        user.value = data
        router.push('/')
    })
    .catch((error) => {
      alert(error.message)
    })
}
</script>

<template>
  <form @submit.prevent="confirmLogIn" class="flex flex-col items-center gap-y-4">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />
    <input type="submit" value="Log in" />
  </form>
</template>