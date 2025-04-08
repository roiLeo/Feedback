<template>
  <div>
    <div v-if="loading" class="flex justify-center py-10">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-gray-500" />
    </div>

    <template v-else-if="project">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div class="flex items-center">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mr-3 text-xl font-bold text-white"
            :style="`background-color: ${project.color}`"
          >
            {{ getProjectInitials(project.name) }}
          </div>
          <div>
            <h1 class="text-3xl font-bold">{{ project.name }}</h1>
            <p class="text-gray-600">{{ project.description }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <UButton to="/projects" variant="ghost" icon="i-heroicons-arrow-left">
            All Projects
          </UButton>
          <UButton @click="showNewFeedbackModal = true" icon="i-heroicons-plus">
            Add Feedback
          </UButton>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <!-- Filters sidebar -->
        <div class="col-span-12 md:col-span-3">
          <div class="bg-white p-4 rounded-lg shadow mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Categories</h3>
              <UButton v-if="selectedCategories.length > 0" size="xs" variant="link" @click="selectedCategories = []">
                Clear
              </UButton>
            </div>
            <div class="space-y-2">
              <UCheckbox v-for="category in categories" :key="category.id"
                v-model="selectedCategories"
                :value="category.id"
                :label="category.name" />
            </div>
          </div>

          <div class="bg-white p-4 rounded-lg shadow mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Status</h3>
              <UButton v-if="selectedStatuses.length > 0" size="xs" variant="link" @click="selectedStatuses = []">
                Clear
              </UButton>
            </div>
            <div class="space-y-2">
              <UCheckbox v-for="status in statuses" :key="status.id"
                v-model="selectedStatuses"
                :value="status.id"
                :label="status.name" />
            </div>
          </div>

          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="font-medium mb-2">Sort By</h3>
            <URadio v-model="sortBy" value="votes" label="Most Votes" class="mb-2" />
            <URadio v-model="sortBy" value="newest" label="Newest First" class="mb-2" />
            <URadio v-model="sortBy" value="oldest" label="Oldest First" />
          </div>
        </div>

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
      </div>

      <!-- New feedback modal -->
      <UModal v-model="showNewFeedbackModal">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Submit New Feedback</h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="showNewFeedbackModal = false" />
            </div>
          </template>

          <form @submit.prevent="submitFeedback">
            <UFormGroup label="Title" name="title">
              <UInput v-model="newFeedback.title" placeholder="Brief description of your feedback" required />
            </UFormGroup>

            <UFormGroup label="Category" name="category">
              <USelect v-model="newFeedback.categoryId" :options="categories" option-attribute="name" value-attribute="id" required />
            </UFormGroup>

            <UFormGroup label="Description" name="description">
              <UTextarea v-model="newFeedback.description" placeholder="Provide more details about your feedback" rows="5" required />
            </UFormGroup>
          </form>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton color="gray" variant="outline" @click="showNewFeedbackModal = false">
                Cancel
              </UButton>
              <UButton color="primary" :loading="submitting" @click="submitFeedback">
                Submit Feedback
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const toast = useToast()
const user = useSupabaseUser()
const router = useRouter()

const loading = ref(true)
const project = ref(null)
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
const sortBy = ref('votes')

const showNewFeedbackModal = ref(false)
const submitting = ref(false)

const newFeedback = ref({
  title: '',
  description: '',
  categoryId: null
})

// Simulate data fetching
onMounted(async () => {
  try {
    // In a real app, this would fetch project and feedback from Supabase
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading

    const projectId = parseInt(route.params.id)

    // Mock project data
    project.value = {
      id: projectId,
      name: 'Mobile App Feedback',
      description: 'Collect and organize user feedback for our iOS and Android mobile applications.',
      color: '#3b82f6'
    }

    // Mock feedback data
    feedback.value = [
      {
        id: 1,
        title: 'Add dark mode to mobile app',
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
        title: 'Login screen is broken on Android 15',
        description: 'After the latest OS update, the login form is not displaying correctly on Android devices.',
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
        title: 'Add biometric authentication',
        description: 'Would like to use fingerprint or face recognition to log in to the app.',
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
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to load project data',
      color: 'red'
    })
    router.push('/projects')
  } finally {
    loading.value = false
  }
})

const filteredFeedback = computed(() => {
  let result = [...feedback.value]

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    result = result.filter(item => selectedCategories.value.includes(item.categoryId))
  }

  // Apply status filter
  if (selectedStatuses.value.length > 0) {
    result = result.filter(item => {
      const statusObj = statuses.value.find(s => s.name === item.status)
      return statusObj && selectedStatuses.value.includes(statusObj.id)
    })
  }

  // Apply sorting
  if (sortBy.value === 'votes') {
    result.sort((a, b) => b.votes - a.votes)
  } else if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (sortBy.value === 'oldest') {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }

  return result
})

function getProjectInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function handleVote(feedbackId) {
  // In a real app, this would call the API
  const index = feedback.value.findIndex(item => item.id === feedbackId)
  if (index !== -1) {
    feedback.value[index].votes += 1
    toast.add({
      title: 'Vote recorded',
      description: 'Thank you for your vote!',
      color: 'green'
    })
  }
}

async function submitFeedback() {
  if (!newFeedback.value.title || !newFeedback.value.description || !newFeedback.value.categoryId) {
    toast.add({
      title: 'Validation Error',
      description: 'Please fill in all required fields',
      color: 'red'
    })
    return
  }

  try {
    submitting.value = true

    // In a real app, this would save to Supabase
    const newItem = {
      id: feedback.value.length + 1,
      title: newFeedback.value.title,
      description: newFeedback.value.description,
      categoryId: newFeedback.value.categoryId,
      status: 'Open',
      votes: 1, // Auto-upvote by creator
      createdAt: new Date().toISOString(),
      user: {
        id: user.value.id,
        name: user.value.email.split('@')[0]
      },
      comments: 0
    }

    feedback.value.unshift(newItem)

    toast.add({
      title: 'Feedback submitted',
      description: 'Your feedback has been successfully submitted',
      color: 'green'
    })

    // Reset form
    newFeedback.value = {
      title: '',
      description: '',
      categoryId: null
    }

    showNewFeedbackModal.value = false
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to submit feedback',
      color: 'red'
    })
  } finally {
    submitting.value = false
  }
}
</script>
