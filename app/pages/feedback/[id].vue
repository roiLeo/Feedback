<template>
  <div>
    <div class="flex items-center mb-6">
      <UButton variant="ghost" icon="i-heroicons-arrow-left" to="/feedback" class="mr-2">
        Back to Board
      </UButton>
      <h1 class="text-2xl font-bold">Feedback Details</h1>
    </div>

    <div v-if="loading" class="flex justify-center py-10">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-gray-500" />
    </div>

    <template v-else-if="feedback">
      <UCard class="mb-6">
        <div class="flex">
          <!-- Vote button -->
          <div class="mr-4 flex flex-col items-center">
            <UButton size="sm" variant="ghost" color="gray" class="rounded-full px-2" @click="handleVote(feedback.id)">
              <UIcon name="i-heroicons-arrow-up" class="text-gray-500" />
            </UButton>
            <span class="font-medium text-gray-700">{{ feedback.votes }}</span>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h2 class="text-xl font-medium text-gray-900">
              {{ feedback.title }}
            </h2>

            <div class="flex items-center my-2">
              <UBadge :color="getStatusColor(feedback.status)" class="mr-2">
                {{ feedback.status }}
              </UBadge>
              <UBadge color="gray">
                {{ getCategoryName(feedback.categoryId) }}
              </UBadge>
            </div>

            <p class="text-gray-600 mt-3">{{ feedback.description }}</p>

            <div class="flex items-center text-sm text-gray-500 mt-4">
              <span>{{ formatDate(feedback.createdAt) }}</span>
              <span class="mx-2">•</span>
              <span>{{ feedback.user.name }}</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Comments section -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium mb-4">Comments ({{ comments.length }})</h3>

        <div v-if="comments.length === 0" class="text-center py-6 text-gray-500">
          No comments yet. Be the first to comment!
        </div>

        <div v-else class="space-y-6">
          <div v-for="comment in comments" :key="comment.id" class="border-b pb-4 last:border-b-0 last:pb-0">
            <div class="flex items-start mb-2">
              <div class="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-700 font-medium mr-3">
                {{ getInitials(comment.user.name) }}
              </div>
              <div>
                <div class="font-medium">{{ comment.user.name }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</div>
              </div>
            </div>
            <p class="text-gray-700">{{ comment.content }}</p>
          </div>
        </div>

        <!-- Add comment form -->
        <div class="mt-6 pt-4 border-t">
          <h4 class="text-md font-medium mb-2">Add a comment</h4>
          <form @submit.prevent="submitComment">
            <UTextarea v-model="newComment" placeholder="Write your comment here..." rows="3" class="mb-3" />
            <div class="flex justify-end">
              <UButton type="submit" :loading="commentSubmitting">
                Post Comment
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const toast = useToast()
const user = useSupabaseUser()

const loading = ref(true)
const feedback = ref(null)
const comments = ref([])
const newComment = ref('')
const commentSubmitting = ref(false)

onMounted(async () => {
  try {
    // In a real app, this would fetch from Supabase
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading

    feedback.value = {
      id: parseInt(route.params.id),
      title: 'Add dark mode support',
      description: 'It would be great to have dark mode support to reduce eye strain when using the app at night. This would also help users who prefer darker interfaces or work in low-light environments. Many modern applications offer this feature, and it would enhance the overall user experience significantly.',
      categoryId: 3,
      status: 'Planned',
      votes: 42,
      createdAt: '2025-03-15T10:30:00',
      user: {
        id: 1,
        name: 'Jane Cooper'
      }
    }

    comments.value = [
      {
        id: 1,
        content: 'I totally agree! Dark mode would be amazing. My eyes get strained after using the platform for extended periods.',
        createdAt: '2025-03-15T14:22:00',
        user: {
          name: 'Alex Johnson'
        }
      }
    ]
    } catch (error) {
      console.log(error)
    }
})

const categories = ref([
  { id: 1, name: 'Bug Report' },
  { id: 2, name: 'Feature Request' },
  { id: 3, name: 'Improvement' },
  { id: 4, name: 'Question' }
])

function getCategoryName(categoryId) {
  const category = categories.value.find(c => c.id === categoryId)
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

function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function handleVote(feedbackId) {
  // In a real app, this would call the API
  feedback.value.votes += 1
  toast.add({
    title: 'Vote recorded',
    description: 'Thank you for your vote!',
    color: 'green'
  })
}

async function submitComment() {
  if (!newComment.value.trim()) return

  try {
    commentSubmitting.value = true

    // In a real app, this would save to Supabase
    const newCommentObj = {
      id: comments.value.length + 1,
      content: newComment.value,
      createdAt: new Date().toISOString(),
      user: {
        name: user.value.email.split('@')[0]
      }
    }

    comments.value.push(newCommentObj)
    newComment.value = ''

    toast.add({
      title: 'Comment added',
      description: 'Your comment has been posted successfully',
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to post your comment',
      color: 'red'
    })
  } finally {
    commentSubmitting.value = false
  }
}
</script>
