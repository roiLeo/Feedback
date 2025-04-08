<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(items, status) in groupedItems" :key="status" class="border rounded-lg p-4">
        <h3 class="font-medium text-lg flex items-center mb-4">
          <span :class="statusColors[status]" class="w-3 h-3 rounded-full mr-2"></span>
          {{ statusLabels[status] }} ({{ items.length }})
        </h3>
        <ul class="space-y-3">
          <li v-for="item in items.slice(0, 3)" :key="item.id" class="border-b pb-3 last:border-b-0">
            <h4 class="font-medium">{{ item.title }}</h4>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <span class="flex items-center mr-3">
                <UIcon name="i-heroicons-chevron-up-20-solid" class="mr-1" />
                {{ item.votes }}
              </span>
              <span class="flex items-center">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis-20-solid" class="mr-1" />
                {{ item.comments }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock data for roadmap
const roadmapItems = [
  {
    id: 1,
    title: 'Add dark mode support',
    status: 'planned',
    votes: 42,
    comments: 8
  },
  {
    id: 2,
    title: 'Improve mobile responsiveness',
    status: 'in-progress',
    votes: 37,
    comments: 5
  },
  {
    id: 3,
    title: 'Add CSV export feature',
    status: 'under-review',
    votes: 29,
    comments: 3
  },
  {
    id: 4,
    title: 'Email notifications for updates',
    status: 'planned',
    votes: 24,
    comments: 2
  },
  {
    id: 5,
    title: 'User profile customization',
    status: 'in-progress',
    votes: 18,
    comments: 4
  },
  {
    id: 6,
    title: 'API documentation',
    status: 'completed',
    votes: 31,
    comments: 7
  },
  {
    id: 7,
    title: 'Single sign-on integration',
    status: 'planned',
    votes: 27,
    comments: 6
  },
  {
    id: 8,
    title: 'Dashboard widgets',
    status: 'under-review',
    votes: 21,
    comments: 3
  },
  {
    id: 9,
    title: 'Performance optimization',
    status: 'completed',
    votes: 34,
    comments: 9
  }
];

const statusLabels = {
  'planned': 'Planned',
  'in-progress': 'In Progress',
  'under-review': 'Under Review',
  'completed': 'Completed'
};

const statusColors = {
  'planned': 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  'under-review': 'bg-purple-500',
  'completed': 'bg-green-500'
};

const groupedItems = computed(() => {
  const grouped = {};
  for (const status of Object.keys(statusLabels)) {
    grouped[status] = roadmapItems.filter(item => item.status === status);
  }
  return grouped;
});
</script>
