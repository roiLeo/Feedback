<template>
  <footer class="bg-gray-800 text-white py-6 mt-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-lg font-semibold">FeedbackHub</p>
          <p class="text-sm text-gray-400">Collect and manage user feedback effortlessly</p>
        </div>
        <div class="flex gap-4">
          <UButton variant="ghost" color="white" icon="i-heroicons-globe-alt" to="/about">About</UButton>
          <UButton variant="ghost" color="white" icon="i-heroicons-document-text" to="/terms">Terms</UButton>
          <UButton variant="ghost" color="white" icon="i-heroicons-lock-closed" to="/privacy">Privacy</UButton>
        </div>
      </div>
      <div class="mt-6 text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} FeedbackHub. All rights reserved.
      </div>
    </div>
  </footer>
</template>
