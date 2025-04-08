<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Log in to FeedbackHub</h1>

    <form @submit.prevent="handleLogin">
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

      <div class="mb-6">
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="password"
            type="password"
            placeholder="Your password"
            autocomplete="current-password"
            required
          />
        </UFormGroup>
        <div class="text-right mt-1">
          <NuxtLink to="/auth/forgot-password" class="text-sm text-primary-600 hover:underline">
            Forgot password?
          </NuxtLink>
        </div>
      </div>

      <UButton type="submit" block :loading="loading">
        Log in
      </UButton>

      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-primary-600 hover:underline">
            Sign up
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
const loading = ref(false)

async function handleLogin() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    router.push('/feedback')
  } catch (error) {
    toast.add({
      title: 'Login failed',
      description: error.message,
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>
