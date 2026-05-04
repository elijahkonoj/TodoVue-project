<script setup lang="ts">
import { ref, watch } from "vue";
//import api from "../services/api";
import { useToast } from "vue-toastification";
import { useTaskStore } from "../stores/taskStore";

const toast = useToast();
const taskStore = useTaskStore();

interface Task {
  id: string;
  name: string;
  description: string;
}

const props = defineProps<{
  editingTask: Task | null;
}>();

const emit = defineEmits<{
  (e: "refresh"): void;
  (e: "cancel-edit"): void;
}>();

const name = ref("");
const description = ref("");
const loading = ref(false);

watch(
  () => props.editingTask,
  (task) => {
    if (task) {
      name.value = task.name;
      description.value = task.description;
    } else {
      name.value = "";
      description.value = "";
    }
  },
  { immediate: true }
);

const saveTask = async () => {
  if (!name.value.trim()) return;

  loading.value = true;

  try {
    if (props.editingTask) {
      await taskStore.updateTask(props.editingTask.id, {
        name: name.value,
        description: description.value,
      });

      toast.success("Task updated successfully");
    } else {
      await taskStore.createTask({
        name: name.value,
        description: description.value,
      });

      toast.success("Task created successfully");
    }

    name.value = "";
    description.value = "";

    emit("refresh");
    emit("cancel-edit");
  } catch (err) {
    toast.error("Failed to save task");
  } finally {
    loading.value = false;
  }
};

const cancelEdit = () => {
  emit("cancel-edit");
};


</script>

<template>
  <div style="background-color: #f9f9f9; 
     padding: 1rem; 
     border-radius: 5px;
     margin-bottom: 2rem;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
     ">
    <h2 style="color: #333; font-size: 1.5rem; margin-bottom: 1rem;">
      {{ editingTask ? "Edit Task" : "Create Task" }}
    </h2>

    <input
      v-model="name"
      placeholder="Task name"
      style="border: 1px solid #ccc; padding: 0.5rem; margin-bottom: 1rem;"
    />

    <textarea
      v-model="description"
      placeholder="Description"
      style="border: 1px solid #ccc; padding: 0.5rem; margin-bottom: -0.9rem; margin-left: 5px;"
    />

    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button
        @click="saveTask"
        :disabled="loading"
        style="background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
      >
        {{ loading ? "Saving..." : editingTask ? "Update" : "Add Task" }}
      </button>

      <button
        v-if="editingTask"
        @click="cancelEdit"
        style="background-color: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

