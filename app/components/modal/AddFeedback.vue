<template>
  <UModal v-model:open="showNewFeedbackModal" title="Submit New Feedback">
    <template #body>
      <form @submit.prevent="submitFeedback">
        <UFormField label="Title" name="title">
          <UInput v-model="newFeedback.title" placeholder="Brief description of your feedback" required />
        </UFormField>

        <UFormField label="Category" name="category">
          <USelect v-model="newFeedback.categoryId" :items="categories" required />
        </UFormField>

        <UFormField label="Description" name="description">
          <UTextarea v-model="newFeedback.description" placeholder="Provide more details about your feedback" rows="5" required />
        </UFormField>
      </form>
    </template>


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
  </UModal>
</template>

<script lang="ts" setup>
const submitting = ref(false)

const categories = ref([
  { value: 1, label: 'Bug Report' },
  { value: 2, label: 'Feature Request' },
  { value: 3, label: 'Improvement' },
  { value: 4, label: 'Question' }
])

const newFeedback = ref({
  title: '',
  description: '',
  categoryId: null
})

async function submitFeedback() {
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
