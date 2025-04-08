<template>
  <UCard>
    <div class="flex">
      <!-- Vote button -->
      <div class="mr-4 flex flex-col items-center">
        <UButton size="sm" variant="ghost" color="gray" class="rounded-full px-2" @click="$emit('vote', feedback.id)">
          <UIcon name="i-heroicons-arrow-up" class="text-gray-500" />
        </UButton>
        <span class="font-medium text-gray-700">{{ feedback.votes }}</span>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <NuxtLink :to="`/feedback/${feedback.id}`" class="text-lg font-medium text-primary-600 hover:underline">
          {{ feedback.title }}
        </NuxtLink>

        <p class="text-gray-600 mt-1 line-clamp-2">{{ feedback.description }}</p>

        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center">
            <UBadge :color="getStatusColor(feedback.status)" class="mr-2">
              {{ feedback.status }}
            </UBadge>
            <UBadge color="gray">
              {{ getCategoryName(feedback.categoryId) }}
            </UBadge>
          </div>

          <div class="flex items-center text-sm text-gray-500">
            <span>{{ formatDate(feedback.createdAt) }}</span>
            <span class="mx-2">•</span>
            <span>{{ feedback.user.name }}</span>
            <span class="mx-2">•</span>
            <div class="flex items-center">
              <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4 mr-1" />
              {{ feedback.comments }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  feedback: {
    type: Object,
    required: true
  }
})

defineEmits(['vote'])

// Get parent component's categories
const categories = inject('categories', [
  { id: 1, name: 'Bug Report' },
  { id: 2, name: 'Feature Request' },
  { id: 3, name: 'Improvement' },
  { id: 4, name: 'Question' }
])

function getCategoryName(categoryId) {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : 'Unknown'
}

function getStatusColor(status) {
  const statusColors = {
    'Open': 'blue',
    'Under Review': 'purple',
    'Planned': 'orange',
    'In Progress': 'yellow',
    'Completed': 'green',
    'Closed': 'gray'
  }
  return statusColors[status] || 'gray'
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}
</script>
