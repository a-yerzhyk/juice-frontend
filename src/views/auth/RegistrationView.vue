<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/service/auth'
import type { User } from '@/service/auth'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordToConfirm = ref('')

const user = inject<Ref<User | null>>('user')

if (user !== undefined && user.value !== null) {
  router.replace('/')
}

const confirmRegistration = () => {
  if (!name.value || !email.value || !password.value || !passwordToConfirm.value) {
    alert('Please fill in all fields')
    return
  }
  if (password.value !== passwordToConfirm.value) {
    alert('Passwords do not match')
    return
  }
  register({
    name: name.value,
    email: email.value,
    password: password.value
  }).then(() => {
      router.push('/login')
  }).catch((error) => {
    alert(error.message)
  })
}
</script>

<template>
  <form @submit.prevent="confirmRegistration" class="flex flex-col items-center gap-y-4">
    <InputGroup>
      <InputGroupAddon>
          <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText v-model="name" type="text" placeholder="Name" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
          <i class="pi pi-at"></i>
      </InputGroupAddon>
      <InputText v-model="email" type="email" placeholder="Email" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
          <i class="pi pi-key"></i>
      </InputGroupAddon>
      <InputText v-model="password" type="password" placeholder="Password" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
          <i class="pi pi-key"></i>
      </InputGroupAddon>
      <InputText v-model="passwordToConfirm" type="password" placeholder="Confirm Password" />
    </InputGroup>
    <Button type="submit" severity="info">Register</Button>
  </form>
</template>