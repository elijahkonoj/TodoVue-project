import { defineStore } from "pinia";
import api from "../services/api";
export const useTaskStore = defineStore("tasks", {
    state: () => ({
        tasks: [],
        loading: false,
        error: "",
        deletingId: null,
    }),
    getters: {
        totalTasks: (state) => state.tasks.length,
    },
    actions: {
        async fetchTasks() {
            this.loading = true;
            this.error = "";
            try {
                const res = await api.get("/tasks");
                this.tasks = res.data.data || res.data;
            }
            catch {
                this.error = "Failed to load tasks";
            }
            finally {
                this.loading = false;
            }
        },
        async createTask(payload) {
            await api.post("/tasks", {
                ...payload,
                priority: "LOW",
                status: "TODO",
            });
            await this.fetchTasks();
        },
        async updateTask(id, payload) {
            await api.put(`/tasks/${id}`, {
                ...payload,
                priority: "LOW",
                status: "TODO",
            });
            await this.fetchTasks();
        },
        async deleteTask(id) {
            this.deletingId = id;
            try {
                await api.delete(`/tasks/${id}`);
                await this.fetchTasks();
            }
            finally {
                this.deletingId = null;
            }
        },
    },
});
