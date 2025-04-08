<template>
  <div>
    <section class="py-20 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Collect, Organize & Prioritize User Feedback
        </h1>
        <p class="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          A simple platform to gather feedback from your users, organize it efficiently, and build better products based on what your users actually want.
        </p>
        <div class="flex gap-4 justify-center">
          <UButton size="lg" to="/auth/register">Get Started for Free</UButton>
          <UButton size="lg" variant="outline" to="/demo">View Demo</UButton>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary-600 w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-3">Collect Feedback</h3>
            <p class="text-gray-600">Create a dedicated board to collect ideas, bug reports, and feature requests from your customers.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-hand-thumb-up" class="text-primary-600 w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-3">Analyze & Prioritize</h3>
            <p class="text-gray-600">Let your users vote on ideas and categorize feedback to identify what matters most.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-map" class="text-primary-600 w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-3">Build Your Roadmap</h3>
            <p class="text-gray-600">Transparently share what you're working on and keep users updated on progress.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
