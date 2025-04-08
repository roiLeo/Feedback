<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Your Profile</h1>

    <UCard class="max-w-2xl">
      <form @submit.prevent="updateProfile">
        <UFormGroup label="Display Name" name="name">
          <UInput v-model="profile.name" placeholder="Your name" />
        </UFormGroup>

        <UFormGroup label="Email Address" name="email">
          <UInput v-model="profile.email" type="email" disabled />
          <template #hint>
            <span class="text-gray-500">Email cannot be changed</span>
          </template>
        </UFormGroup>

        <UFormGroup label="Notification Preferences" name="notifications">
          <UCheckbox v-model="profile.emailNotifications" label="Email notifications for feedback updates" />
        </UFormGroup>

        <div class="mt-6 pt-4 border-t">
          <h3 class="font-medium mb-2">Change Password</h3>

          <UFormGroup label="Current Password" name="currentPassword">
            <UInput v-model="passwords.current" type="password" placeholder="Enter current password" />
          </UFormGroup>

          <UFormGroup label="New Password" name="newPassword">
            <UInput v-model="passwords.new" type="password" placeholder="Enter new password" />
          </UFormGroup>

          <UFormGroup label="Confirm New Password" name="confirmPassword">
            <UInput v-model="passwords.confirm" type="password" placeholder="Confirm new password" />
          </UFormGroup>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <UButton type="submit" :loading="updating">
            Save Changes
          </UButton>
        </div>
      </form>
    </UCard>

    <UCard class="max-w-2xl mt-8">
      <template #header>
        <h3 class="font-medium">Danger Zone</h3>
      </template>

      <p class="text-gray-600 mb-4">Once you delete your account, all of your data will be permanently removed.</p>

      <UButton color="red" variant="outline" @click="showDeleteConfirmation = true">
        Delete My Account
      </UButton>

      <UModal v-model="showDeleteConfirmation">
        <UCard>
          <template #header>
            <div class="text-red-600 font-medium">Delete Account</div>
          </template>

          <p class="mb-4">Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.</p>

          <UFormGroup label="Confirm by typing your email" name="confirmEmail">
            <UInput v-model="deleteConfirmEmail" placeholder="Enter your email" />
          </UFormGroup>

          <template #footer>
            <div class="flex justify-between">
              <UButton color="gray" variant="outline" @click="showDeleteConfirmation = false">
                Cancel
              </UButton>
              <UButton
                color="red"
                :disabled="deleteConfirmEmail !== profile.email"
                :loading="deleting"
                @click="deleteAccount"
              >
                Delete Account
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </UCard>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const router = useRouter()

const profile = ref({
  name: '',
  email: '',
  emailNotifications: true
})

const passwords = ref({
  current: '',
  new: '',
  confirm: ''
})

const updating = ref(false)
const showDeleteConfirmation = ref(false)
const deleteConfirmEmail = ref('')
const deleting = ref(false)

onMounted(() => {
  // In a real app, this would fetch from Supabase
  if (user.value) {
    profile.value.email = user.value.email
    profile.value.name = user.value.email.split('@')[0]
  }
})

async function updateProfile() {
  try {
    updating.value = true

    // Password update logic
    if (passwords.value.current && passwords.value.new) {
      if (passwords.value.new !== passwords.value.confirm) {
        toast.add({
          title: 'Password mismatch',
          description: 'New passwords do not match',
          color: 'red'
        })
        return
      }

      // In a real app, this would call Supabase to update password
    }

    // In a real app, this would update profile in Supabase

    toast.add({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully',
      color: 'green'
    })

    // Reset password fields
    passwords.value = {
      current: '',
      new: '',
      confirm: ''
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update profile',
      color: 'red'
    })
  } finally {
    updating.value = false
  }
}

async function deleteAccount() {
  if (deleteConfirmEmail.value !== profile.value.email) return

  try {
    deleting.value = true

    // In a real app, this would delete the account in Supabase
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

    await supabase.auth.signOut()

    router.push('/')

    toast.add({
      title: 'Account deleted',
      description: 'Your account has been permanently deleted',
      color: 'gray'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to delete account',
      color: 'red'
    })
  } finally {
    deleting.value = false
    showDeleteConfirmation.value = false
  }
}
</script>
