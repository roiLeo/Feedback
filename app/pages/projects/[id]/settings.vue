<template>
  <div>
    <div v-if="loading" class="flex justify-center py-10">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-gray-500" />
    </div>

    <template v-else-if="project">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Project Settings</h1>
        <UButton to="/projects" variant="ghost" icon="i-heroicons-arrow-left">
          All Projects
        </UButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Main settings -->
        <div class="md:col-span-2">
          <UCard>
            <template #header>
              <h2 class="text-lg font-medium">General Settings</h2>
            </template>

            <form @submit.prevent="updateProject">
              <UFormGroup label="Project Name" name="name">
                <UInput v-model="project.name" placeholder="Project name" required />
              </UFormGroup>

              <UFormGroup label="Description" name="description">
                <UTextarea v-model="project.description" placeholder="Project description" rows="3" />
              </UFormGroup>

              <UFormGroup label="Project Color" name="color">
                <div class="flex gap-2">
                  <button
                    v-for="color in projectColors"
                    :key="color"
                    type="button"
                    class="w-8 h-8 rounded-full border-2"
                    :class="project.color === color ? 'border-gray-800' : 'border-transparent'"
                    :style="`background-color: ${color}`"
                    @click="project.color = color"
                  />
                </div>
              </UFormGroup>

              <div class="flex justify-end">
                <UButton type="submit" :loading="updating">
                  Save Changes
                </UButton>
              </div>
            </form>
          </UCard>

          <UCard class="mt-6">
            <template #header>
              <h2 class="text-lg font-medium">Feedback Board Settings</h2>
            </template>

            <UFormGroup label="Board Visibility" name="visibility">
              <URadio v-model="settings.visibility" value="public" label="Public - Anyone can view feedback" class="mb-2" />
              <URadio v-model="settings.visibility" value="private" label="Private - Only team members can view feedback" />
            </UFormGroup>

            <UFormGroup label="Who can submit feedback" name="submitPermission">
              <USelect
                v-model="settings.submitPermission"
                :options="[
                  { value: 'anyone', label: 'Anyone (including anonymous users)' },
                  { value: 'authenticated', label: 'Authenticated users only' },
                  { value: 'team', label: 'Team members only' }
                ]"
              />
            </UFormGroup>

            <UFormGroup label="Who can vote on feedback" name="votePermission">
              <USelect
                v-model="settings.votePermission"
                :options="[
                  { value: 'anyone', label: 'Anyone (including anonymous users)' },
                  { value: 'authenticated', label: 'Authenticated users only' },
                  { value: 'team', label: 'Team members only' }
                ]"
              />
            </UFormGroup>

            <UFormGroup label="Who can comment on feedback" name="commentPermission">
              <USelect
                v-model="settings.commentPermission"
                :options="[
                  { value: 'anyone', label: 'Anyone (including anonymous users)' },
                  { value: 'authenticated', label: 'Authenticated users only' },
                  { value: 'team', label: 'Team members only' }
                ]"
              />
            </UFormGroup>

            <div class="flex justify-end">
              <UButton :loading="updatingSettings" @click="updateSettings">
                Save Settings
              </UButton>
            </div>
          </UCard>
        </div>

        <!-- Sidebar -->
        <div class="md:col-span-1">
          <UCard>
            <template #header>
              <h2 class="text-lg font-medium">Board Link</h2>
            </template>

            <p class="text-sm text-gray-600 mb-3">Share this link to allow others to view your feedback board:</p>

            <div class="flex">
              <UInput
                :model-value="boardLink"
                readonly
                class="flex-1"
              />
              <UButton
                color="gray"
                variant="soft"
                icon="i-heroicons-clipboard-document"
                @click="copyToClipboard(boardLink)"
              />
            </div>
          </UCard>

          <UCard class="mt-6">
            <template #header>
              <h2 class="text-lg font-medium">Team Members</h2>
            </template>

            <div class="flex justify-between items-center mb-4">
              <p class="text-sm text-gray-600">Manage who can administer this board</p>
              <UButton size="sm" @click="showInviteModal = true">
                Invite
              </UButton>
            </div>

            <ul class="divide-y">
              <li v-for="member in teamMembers" :key="member.id" class="py-2 flex justify-between items-center">
                <div class="flex items-center">
                  <div class="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium mr-2">
                    {{ getInitials(member.name) }}
                  </div>
                  <div>
                    <div class="font-medium">{{ member.name }}</div>
                    <div class="text-xs text-gray-500">{{ member.email }}</div>
                  </div>
                </div>

                <UBadge :color="member.role === 'owner' ? 'blue' : 'gray'">
                  {{ member.role }}
                </UBadge>
              </li>
            </ul>
          </UCard>

          <UCard class="mt-6 border-red-200">
            <template #header>
              <h2 class="text-lg font-medium text-red-600">Danger Zone</h2>
            </template>

            <p class="text-sm text-gray-600 mb-4">
              These actions are destructive and cannot be undone.
            </p>

            <UButton
              color="red"
              variant="outline"
              block
              @click="showDeleteConfirmation = true"
            >
              Delete Project
            </UButton>
          </UCard>
        </div>
      </div>

      <!-- Invite team member modal -->
      <UModal v-model="showInviteModal">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Invite Team Member</h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="showInviteModal = false" />
            </div>
          </template>

          <form @submit.prevent="inviteTeamMember">
            <UFormGroup label="Email Address" name="email">
              <UInput v-model="newInvite.email" type="email" placeholder="Enter email address" required />
            </UFormGroup>

            <UFormGroup label="Role" name="role">
              <URadio v-model="newInvite.role" value="admin" label="Admin - Can modify all settings and manage feedback" class="mb-2" />
              <URadio v-model="newInvite.role" value="moderator" label="Moderator - Can manage feedback but not project settings" />
            </UFormGroup>
          </form>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton color="gray" variant="outline" @click="showInviteModal = false">
                Cancel
              </UButton>
              <UButton color="primary" :loading="inviting" @click="inviteTeamMember">
                Send Invitation
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>

      <!-- Delete confirmation modal -->
      <UModal v-model="showDeleteConfirmation">
        <UCard>
          <template #header>
            <div class="text-red-600 font-medium">Delete Project</div>
          </template>

          <p class="mb-4">Are you sure you want to delete this project? This action cannot be undone and all feedback data will be permanently deleted.</p>

          <UFormGroup label="Confirm by typing the project name" name="confirmName">
            <UInput v-model="deleteConfirmName" placeholder="Enter project name" />
          </UFormGroup>

          <template #footer>
            <div class="flex justify-between">
              <UButton color="gray" variant="outline" @click="showDeleteConfirmation = false">
                Cancel
              </UButton>
              <UButton
                color="red"
                :disabled="deleteConfirmName !== project.name"
                :loading="deleting"
                @click="deleteProject"
              >
                Delete Project
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
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const updating = ref(false)
const updatingSettings = ref(false)
const inviting = ref(false)
const deleting = ref(false)

const project = ref(null)
const settings = ref({
  visibility: 'public',
  submitPermission: 'authenticated',
  votePermission: 'authenticated',
  commentPermission: 'authenticated'
})

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

const teamMembers = ref([])
const showInviteModal = ref(false)
const showDeleteConfirmation = ref(false)
const deleteConfirmName = ref('')

const newInvite = ref({
  email: '',
  role: 'moderator'
})

const boardLink = computed(() => {
  return `${window.location.origin}/boards/${route.params.id}`
})

// Simulate data fetching
onMounted(async () => {
  try {
    // In a real app, this would fetch from Supabase
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading

    const projectId = parseInt(route.params.id)

    // Mock project data
    project.value = {
      id: projectId,
      name: 'Mobile App Feedback',
      description: 'Collect and organize user feedback for our iOS and Android mobile applications.',
      color: '#3b82f6'
    }

    // Mock team members
    teamMembers.value = [
      {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'owner'
      },
      {
        id: 2,
        name: 'Sarah Davis',
        email: 'sarah@example.com',
        role: 'admin'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael@example.com',
        role: 'moderator'
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

function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    toast.add({
      title: 'Link copied',
      description: 'Board link copied to clipboard',
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to copy link',
      color: 'red'
    })
  }
}

async function updateProject() {
  try {
    updating.value = true

    // In a real app, this would update in Supabase
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call

    toast.add({
      title: 'Project updated',
      description: 'Project settings have been updated successfully',
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update project',
      color: 'red'
    })
  } finally {
    updating.value = false
  }
}

async function updateSettings() {
  try {
    updatingSettings.value = true

    // In a real app, this would update in Supabase
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call

    toast.add({
      title: 'Settings updated',
      description: 'Board settings have been updated successfully',
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update settings',
      color: 'red'
    })
  } finally {
    updatingSettings.value = false
  }
}

async function inviteTeamMember() {
  if (!newInvite.value.email) return

  try {
    inviting.value = true

    // In a real app, this would send invitation via Supabase
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API call

    // Add to team members list (in real app, they'd need to accept invitation)
    teamMembers.value.push({
      id: teamMembers.value.length + 1,
      name: newInvite.value.email.split('@')[0],
      email: newInvite.value.email,
      role: newInvite.value.role
    })

    toast.add({
      title: 'Invitation sent',
      description: `An invitation has been sent to ${newInvite.value.email}`,
      color: 'green'
    })

    // Reset form
    newInvite.value = {
      email: '',
      role: 'moderator'
    }

    showInviteModal.value = false
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to send invitation',
      color: 'red'
    })
  } finally {
    inviting.value = false
  }
}

async function deleteProject() {
  if (deleteConfirmName.value !== project.value.name) return

  try {
    deleting.value = true

    // In a real app, this would delete in Supabase
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

    toast.add({
      title: 'Project deleted',
      description: 'The project has been permanently deleted',
      color: 'gray'
    })

    router.push('/projects')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to delete project',
      color: 'red'
    })
  } finally {
    deleting.value = false
    showDeleteConfirmation.value = false
  }
}
</script>
