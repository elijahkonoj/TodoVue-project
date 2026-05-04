<script setup lang="ts">
import TaskItems from "./TaskItems.vue";

interface Task {
  id: string;
  name: string;
  description: string;
}

defineProps<{
  tasks: Task[];
  editingId: string | null;
  deletingId: string | null;
}>();

const emit = defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <ul style="list-style: none; padding: 0;">
    <TaskItems
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :editingId="editingId"
      :deletingId="deletingId"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </ul>
</template>