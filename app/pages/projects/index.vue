<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Your Projects</h1>
      <UButton @click="showNewProjectModal = true" icon="i-heroicons-plus">
        Create Project
      </UButton>
    </div>

    <div v-if="loading" class="flex justify-center py-10">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-gray-500" />
    </div>

    <div v-else-if="projects.length === 0" class="bg-white rounded-lg shadow p-10 text-center">
      <UIcon name="i-heroicons-folder" class="mx-auto h-16 w-16 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">No projects yet</h3>
      <p class="mt-2 text-gray-600">Get started by creating your first feedback project</p>
      <UButton class="mt-4" @click="showNewProjectModal = true">Create Project</UButton>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="project in projects"
        :key="project.id"
        class="hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mr-3 text-xl font-bold text-white"
            :style="`background-color: ${project.color}`"
          >
            {{ getProjectInitials(project.name) }}
          </div>
          <div>
            <h3 class="text-lg font-medium">{{ project.name }}</h3>
            <p class="text-sm text-gray-500">Created {{ formatDate(project.createdAt) }}</p>
          </div>
        </div>

        <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center">
            <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4 mr-1" />
            {{ project.feedbackCount }} feedback items
          </div>

          <div class="flex items-center gap-2">
            <UButton
              size="xs"
              color="gray"
              variant="ghost"
              icon="i-heroicons-cog-6-tooth"
              @click="navigateToProjectSettings(project.id)"
            />
            <UButton
              size="xs"
              color="primary"
              variant="soft"
              @click="navigateToProject(project.id)"
            >
              View Board
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- New project modal -->
    <UModal v-model="showNewProjectModal">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Create New Project</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="showNewProjectModal = false" />
          </div>
        </template>

        <form @submit.prevent="createProject">
          <UFormGroup label="Project Name" name="name">
            <UInput v-model="newProject.name" placeholder="My Awesome Project" required />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UTextarea v-model="newProject.description" placeholder="What is this project about?" rows="3" />
          </UFormGroup>

          <UFormGroup label="Project Color" name="color">
            <div class="flex gap-2">
              <button
                v-for="color in projectColors"
                :key="color"
                type="button"
                class="w-8 h-8 rounded-full border-2"
                :class="newProject.color === color ? 'border-gray-800' : 'border-transparent'"
                :style="`background-color: ${color}`"
                @click="newProject.color = color"
              />
            </div>
          </UFormGroup>
        </form>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="outline" @click="showNewProjectModal = false">
              Cancel
            </UButton>
            <UButton color="primary" :loading="submitting" @click="createProject">
              Create Project
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const projects = ref([])
const showNewProjectModal = ref(false)
const submitting = ref(false)

const projectColors = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#6366f1', // indigo
  '#14b8a6', // teal
  '#f97316', // orange
  '#64748b'  // slate
]

const newProject = ref({
  name: '',
  description: '',
  color: projectColors[0]
})

// Simulate data fetching
onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading

    projects.value = [
      {
        id: 1,
        name: 'Mobile App Feedback',
        description: 'Collect and organize user feedback for our iOS and Android mobile applications.',
        color: '#3b82f6',
        createdAt: '2025-03-10T08:22:00',
        feedbackCount: 42
      },
      {
        id: 2,
        name: 'Marketing Website',
        description: 'Gather suggestions and bug reports for our company website and landing pages.',
        color: '#10b981',
        createdAt: '2025-02-15T14:30:00',
        feedbackCount: 27
      },
      {
        id: 3,
        name: 'Dashboard Redesign',
        description: 'Feature requests and feedback for our upcoming dashboard redesign project.',
        color: '#8b5cf6',
        createdAt: '2025-03-20T11:15:00',
        feedbackCount: 18
      }
    ]
  } finally {
    loading.value = false
  }
})

function getProjectInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

function navigateToProject(id) {
  router.push(`/projects/${id}/feedback`)
}

function navigateToProjectSettings(id) {
  router.push(`/projects/${id}/settings`)
}

async function createProject() {
  if (!newProject.value.name) return

  try {
    submitting.value = true

    // In a real app, this would save to Supabase
    const newProjectObj = {
      id: projects.value.length + 1,
      name: newProject.value.name,
      description: newProject.value.description || '',
      color: newProject.value.color,
      createdAt: new Date().toISOString(),
      feedbackCount: 0
    }

    projects.value.push(newProjectObj)

    toast.add({
      title: 'Project created',
      description: 'Your new feedback project has been created successfully',
      color: 'green'
    })

    showNewProjectModal.value = false

    // Reset form
    newProject.value = {
      name: '',
      description: '',
      color: projectColors[0]
    }

    // Navigate to the new project
    router.push(`/projects/${newProjectObj.id}/feedback`)
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to create project',
      color: 'red'
    })
  } finally {
    submitting.value = false
  }
}
</script>
