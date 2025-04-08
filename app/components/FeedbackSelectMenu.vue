<template>
  <USelectMenu v-model="value" variant="ghost" size="xl" :items="items" class="w-48" :ui="{ value: 'font-medium' }">
    <template #leading="{ modelValue, ui }">
      <UChip
        v-if="modelValue"
        v-bind="modelValue.chip"
        inset
        standalone
        :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
        :class="ui.itemLeadingChip()"
      />
    </template>
  </USelectMenu>
</template>


<script setup lang="ts">
import type { SelectMenuItem, ChipProps } from '@nuxt/ui'

const items = ref([
  {
    label: 'All Feedback',
    value: 'bug',
    chip: {
      color: 'neutral'
    }
  },
  {
    label: 'Bugs',
    value: 'bug',
    chip: {
      color: 'error'
    }
  },
  {
    label: 'Features',
    value: 'feature',
    chip: {
      color: 'success'
    }
  },
  {
    label: 'Enhancements',
    value: 'enhancement',
    chip: {
      color: 'info'
    }
  }
] satisfies SelectMenuItem[])
const value = ref(items.value[0])
</script>
