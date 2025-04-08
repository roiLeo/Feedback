<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <FeedbackSelectMenu />

      <div class="flex items-center gap-2">
        <FeedbackSelectSort />
        <FeedbackSearchButton />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <!-- Feedback list -->
      <div class="col-span-12 md:col-span-9">
        <UCard v-if="filteredFeedback.length === 0" class="text-center p-6">
          <p class="text-gray-500">No feedback items found. Be the first to add one!</p>
        </UCard>

        <div v-else class="space-y-4">
          <FeedbackItem
            v-for="item in filteredFeedback"
            :key="item.id"
            :feedback="item"
            @vote="handleVote"
          />
        </div>
      </div>

      <!-- Filters sidebar -->
      <div class="col-span-12 md:col-span-3 space-y-4">
        <UCard>
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center"><UIcon name="i-lucide-lightbulb" /></div>
            <div class="font-medium">Got an idea?</div>
          </div>

          <UButton block @click="showNewFeedbackModal()" icon="i-heroicons-plus">
            Add Feedback
          </UButton>
        </UCard>

        <UCard>
          <h3 class="font-medium mb-2">Categories</h3>
          <div class="space-y-2">
            <UCheckbox v-for="category in categories" :key="category.id"
              v-model="selectedCategories"
              :value="category.id"
              :label="category.name" />
          </div>
        </UCard>

        <UCard>
          <h3 class="font-medium mb-2">Status</h3>
          <div class="space-y-2">
            <UCheckbox v-for="status in statuses" :key="status.id"
              v-model="selectedStatuses"
              :value="status.id"
              :label="status.name" />
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ModalAddFeedback } from '#components'
import FeedbackSearchButton from '~/components/FeedbackSearchButton.vue'
import FeedbackSelectMenu from '~/components/FeedbackSelectMenu.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const feedback = ref([])
const categories = ref([
  { id: 1, name: 'Bug Report' },
  { id: 2, name: 'Feature Request' },
  { id: 3, name: 'Improvement' },
  { id: 4, name: 'Question' }
])
const statuses = ref([
  { id: 1, name: 'Open' },
  { id: 2, name: 'Under Review' },
  { id: 3, name: 'Planned' },
  { id: 4, name: 'In Progress' },
  { id: 5, name: 'Completed' },
  { id: 6, name: 'Closed' }
])

const selectedCategories = ref([])
const selectedStatuses = ref([])

// Mock fetch feedback data - in a real app, this would come from Supabase
onMounted(async () => {
  // Simulating data fetch
  feedback.value = [
    {
      id: 1,
      title: 'Add dark mode support',
      description: 'It would be great to have dark mode support to reduce eye strain when using the app at night.',
      categoryId: 3,
      status: 'Planned',
      votes: 42,
      createdAt: '2025-03-15T10:30:00',
      user: {
        id: 1,
        name: 'Jane Cooper'
      },
      comments: 5
    },
    {
      id: 2,
      title: 'Login page is broken on mobile',
      description: 'The login form is not displaying correctly on mobile devices. The submit button is cut off.',
      categoryId: 1,
      status: 'In Progress',
      votes: 27,
      createdAt: '2025-03-12T14:22:00',
      user: {
        id: 2,
        name: 'Alex Johnson'
      },
      comments: 8
    },
    {
      id: 3,
      title: 'Add CSV export option',
      description: 'Would like to be able to export feedback data to CSV for analysis in other tools.',
      categoryId: 2,
      status: 'Under Review',
      votes: 18,
      createdAt: '2025-03-10T09:15:00',
      user: {
        id: 3,
        name: 'Mark Wilson'
      },
      comments: 2
    }
  ]
})

const filteredFeedback = computed(() => {
  let result = [...feedback.value]

  if (selectedCategories.value.length > 0) {
    result = result.filter(item => selectedCategories.value.includes(item.categoryId))
  }

  if (selectedStatuses.value.length > 0) {
    result = result.filter(item => {
      const statusObj = statuses.value.find(s => s.name === item.status)
      return statusObj && selectedStatuses.value.includes(statusObj.id)
    })
  }

  return result
})

function handleVote(feedbackId) {
  // In a real app, this would call the API
  const index = feedback.value.findIndex(item => item.id === feedbackId)
  if (index !== -1) {
    feedback.value[index].votes += 1
  }
}

function showNewFeedbackModal() {
  const overlay = useOverlay()
  const modal = overlay.create(ModalAddFeedback)
  modal.open()
}
</script>
