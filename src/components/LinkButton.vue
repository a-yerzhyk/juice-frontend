<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

</script>

<template>
  <span class="link-button" @click="handleClick">
    <slot></slot>
  </span>
</template>
