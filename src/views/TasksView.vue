<template>
  <div class="categories-and-tasks">
    <CategoriesTab/>
    <TasksTab/>
  </div>
</template>

<script>

import CategoriesTab from '@/components/CategoriesTab.vue'
import TasksTab from '@/components/TasksTab.vue'

export default {
  name: 'TasksView',
  components: {
    CategoriesTab,
    TasksTab
  },
  methods: {
  }
}
</script>
