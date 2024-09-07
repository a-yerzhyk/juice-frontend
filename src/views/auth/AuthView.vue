<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { login, getUser } from '@/service/auth'
import type { User } from '@/service/auth'

</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <RouterView />
  </div>
</template>