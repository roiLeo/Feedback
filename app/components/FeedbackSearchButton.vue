<template>
  <UModal v-model:open="isOpen">
    <UTooltip text="Search" :shortcuts="['⌘', 'O']">
      <UButton size="lg" variant="outline" color="neutral" aria-label="Search" icon="i-lucide-search" />
    </UTooltip>

    <template #content>
     <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-80"
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const isOpen = ref(false)
const searchTerm = ref('')

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  params: { q: searchTerm },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    }
  }
})
</script>
