<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Create your account</h1>

    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <UFormGroup label="Email address" name="email">
          <UInput
            v-model="email"
            type="email"
            placeholder="Your email"
            autocomplete="email"
            required
          />
        </UFormGroup>
      </div>

      <div class="mb-4">
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="password"
            type="password"
            placeholder="Create a password"
            autocomplete="new-password"
            required
          />
        </UFormGroup>
      </div>

      <div class="mb-6">
        <UFormGroup label="Confirm password" name="confirmPassword">
          <UInput
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autocomplete="new-password"
            required
          />
        </UFormGroup>
      </div>

      <UButton type="submit" block :loading="loading">
        Create account
      </UButton>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-primary-600 hover:underline">
            Log in
          </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    toast.add({
      title: 'Password mismatch',
      description: 'The passwords you entered do not match',
      color: 'red'
    })
    return
  }

  try {
    loading.value = true
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    toast.add({
      title: 'Registration successful',
      description: 'Please check your email to confirm your account',
      color: 'green'
    })

    router.push('/auth/login')
  } catch (error) {
    toast.add({
      title: 'Registration failed',
      description: error.message,
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>
