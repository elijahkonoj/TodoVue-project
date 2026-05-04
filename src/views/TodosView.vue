<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useTaskStore } from "../stores/taskStore"; 
import api from "../services/api";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import Pagination from "../components/Pagination.vue";



interface Task {
  id: string;
  name: string;
  description: string;
}

const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref("");

const editingTask = ref<Task | null>(null);
const deletingId = ref<string | null>(null);

const search = ref("");
const statusFilter = ref("all");

const taskStore = useTaskStore();



const currentPage = ref(1);
const perPage = 5;

const fetchTasks = async () => {
  loading.value = true;
  error.value = "";

  try {
    const res = await api.get("/tasks");
    tasks.value = res.data.data || res.data;
  } catch {
    error.value = "Failed to load tasks";
  } finally {
    loading.value = false;
  }
};

/* ---------------- FILTER ---------------- */
const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    const matchSearch =
      task.name.toLowerCase().includes(search.value.toLowerCase()) ||
      task.description.toLowerCase().includes(search.value.toLowerCase());

    const matchStatus =
      statusFilter.value === "all" ||
      (statusFilter.value === "completed" && (task as any).completed) ||
      (statusFilter.value === "pending" && !(task as any).completed);

    return matchSearch && matchStatus;
  });
});

/* ---------------- PAGINATION ---------------- */
const totalPages = computed(() =>
  Math.ceil(filteredTasks.value.length / perPage)
);

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredTasks.value.slice(start, start + perPage);
});

watch([search, statusFilter], () => {
  currentPage.value = 1;
});


const handleDelete = async (id: string) => {
  const confirmed = window.confirm("Delete this task?");
  if (!confirmed) return;

  deletingId.value = id;

  try {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  } finally {
    deletingId.value = null;
  }
};

const handleEdit = (task: Task) => {
  editingTask.value = task;
};

const cancelEdit = () => {
  editingTask.value = null;
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<template>
  <div style="background-color: aqua;">
    <h1 style="color: #333; font-size: 2rem; margin-bottom: 1rem;">Todos</h1>
    
    
    <TaskForm
      :editingTask="editingTask"
      @refresh="fetchTasks"
      @cancel-edit="cancelEdit"
    />

    
    <div style="margin-bottom: 1.5rem; display: flex; gap: 0.5rem;">
      <input
        v-model="search"
        placeholder="Search tasks..."
        style="border: 1px solid #ccc; padding: 0.5rem; flex: 1;"
      />

      <select v-model="statusFilter" style="border: 1px solid #ccc; padding: 0.5rem;">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

  
    <p v-if="loading">Loading tasks...</p>
    <p v-if="error" style="color: #dc2626;">{{ error }}</p>

  
    <TaskList
      :tasks="paginatedTasks"
      :editingId="editingTask?.id || null"
      :deletingId="taskStore.deletingId"
      @edit="handleEdit"
      @delete="taskStore.deleteTask"
    />

  
    <p v-if="!loading && !filteredTasks.length" style="text-align: center; color: #666; margin-top: 2rem;">
      No tasks found
    </p>

    
    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change="currentPage = $event"
    />
  </div>
</template>

<style scoped>
  
</style>