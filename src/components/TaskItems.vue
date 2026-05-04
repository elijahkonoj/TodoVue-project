<script setup lang="ts">
interface Task {
  id: string;
  name: string;
  description: string;
}

defineProps<{
  task: Task;
  editingId: string | null;
  deletingId: string | null;
}>();

const emit = defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <li style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 0.5rem; border-radius: 5px;">
    <div>
      <strong style='color: red'>{{ task.name }}</strong>
      <p>{{ task.description }}</p>
    </div>

    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button
        @click="emit('edit', task)"
        style="background-color: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
      >
        Edit
      </button>

      <button
        @click="emit('delete', task.id)"
        :disabled="deletingId === task.id"
        style="background-color: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
      >
        {{ deletingId === task.id ? "Deleting..." : "Delete" }}
      </button>
    </div>
  </li>
</template>