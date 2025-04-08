<template>
  <header class="bg-neutral-50 border-b border-neutral-200 sm:h-[200px] h-250px">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex justify-between items-center">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="text-2xl font-bold">
            FeedbackHub
          </NuxtLink>
          <USeparator orientation="vertical" class="h-4" />
          <NuxtLink to="/feedback" class="font-medium text-sm text-gray-700 hover:text-primary-600" active-class="px-3 py-2 bg-white border-neutral-200 shadow rounded-full">
            Feedback
          </NuxtLink>
          <NuxtLink to="/roadmap" class="font-medium text-sm text-gray-700 hover:text-primary-600" active-class="px-3 py-2 bg-white border-neutral-200 shadow rounded-full">
            Roadmap
          </NuxtLink>
          <NuxtLink to="/updates" class="font-medium text-sm text-gray-700 hover:text-primary-600" active-class="px-3 py-2 bg-white border-neutral-200 shadow rounded-full">
            Updates
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2">
          <ThemePicker />
          <UDropdownMenu :items="userMenuItems">
            <UButton variant="ghost" size="xs">
              <UAvatar :alt="user?.email" size="md" />
            </UButton>
          </UDropdownMenu>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const userMenuItems = ref([
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user',
      onSelect: () => router.push('/profile')
    },
    {
      label: 'Projects',
      icon: 'i-heroicons-rectangle-stack',
      onSelect: () => router.push('/projects')
    }
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      onSelect: async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
      }
    }
  ]
])
</script>
