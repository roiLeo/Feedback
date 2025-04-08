<template>
  <USelect v-model="value" variant="outline" color="neutral" icon="i-lucide-arrow-down-wide-narrow" size="lg" :items="items" class="w-32" />
</template>

<script lang="ts" setup>
const items = ref(['Top', 'Trending', 'Newest'])
const value = ref('Top')
</script>
