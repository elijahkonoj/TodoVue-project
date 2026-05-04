import { ref, onMounted, computed, watch } from "vue";
import { useTaskStore } from "../stores/taskStore";
import api from "../services/api";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import Pagination from "../components/Pagination.vue";
const tasks = ref([]);
const loading = ref(false);
const error = ref("");
const editingTask = ref(null);
const deletingId = ref(null);
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
    }
    catch {
        error.value = "Failed to load tasks";
    }
    finally {
        loading.value = false;
    }
};
/* ---------------- FILTER ---------------- */
const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
        const matchSearch = task.name.toLowerCase().includes(search.value.toLowerCase()) ||
            task.description.toLowerCase().includes(search.value.toLowerCase());
        const matchStatus = statusFilter.value === "all" ||
            (statusFilter.value === "completed" && task.completed) ||
            (statusFilter.value === "pending" && !task.completed);
        return matchSearch && matchStatus;
    });
});
/* ---------------- PAGINATION ---------------- */
const totalPages = computed(() => Math.ceil(filteredTasks.value.length / perPage));
const paginatedTasks = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredTasks.value.slice(start, start + perPage);
});
watch([search, statusFilter], () => {
    currentPage.value = 1;
});
const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed)
        return;
    deletingId.value = id;
    try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
    }
    finally {
        deletingId.value = null;
    }
};
const handleEdit = (task) => {
    editingTask.value = task;
};
const cancelEdit = () => {
    editingTask.value = null;
};
onMounted(() => {
    taskStore.fetchTasks();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ style: {} },
});
const __VLS_0 = TaskForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onRefresh': {} },
    ...{ 'onCancelEdit': {} },
    editingTask: (__VLS_ctx.editingTask),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onRefresh': {} },
    ...{ 'onCancelEdit': {} },
    editingTask: (__VLS_ctx.editingTask),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ refresh: {} },
    { onRefresh: (__VLS_ctx.fetchTasks) });
const __VLS_7 = ({ cancelEdit: {} },
    { onCancelEdit: (__VLS_ctx.cancelEdit) });
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    placeholder: "Search tasks...",
    ...{ style: {} },
});
(__VLS_ctx.search);
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    value: (__VLS_ctx.statusFilter),
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "all",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "completed",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "pending",
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
    (__VLS_ctx.error);
}
const __VLS_8 = TaskList;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onEdit': {} },
    ...{ 'onDelete': {} },
    tasks: (__VLS_ctx.paginatedTasks),
    editingId: (__VLS_ctx.editingTask?.id || null),
    deletingId: (__VLS_ctx.taskStore.deletingId),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onEdit': {} },
    ...{ 'onDelete': {} },
    tasks: (__VLS_ctx.paginatedTasks),
    editingId: (__VLS_ctx.editingTask?.id || null),
    deletingId: (__VLS_ctx.taskStore.deletingId),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = ({ edit: {} },
    { onEdit: (__VLS_ctx.handleEdit) });
const __VLS_15 = ({ delete: {} },
    { onDelete: (__VLS_ctx.taskStore.deleteTask) });
var __VLS_11;
var __VLS_12;
if (!__VLS_ctx.loading && !__VLS_ctx.filteredTasks.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
if (__VLS_ctx.totalPages > 1) {
    const __VLS_16 = Pagination;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        ...{ 'onChange': {} },
        currentPage: (__VLS_ctx.currentPage),
        totalPages: (__VLS_ctx.totalPages),
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onChange': {} },
        currentPage: (__VLS_ctx.currentPage),
        totalPages: (__VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_21;
    const __VLS_22 = ({ change: {} },
        { onChange: (...[$event]) => {
                if (!(__VLS_ctx.totalPages > 1))
                    return;
                __VLS_ctx.currentPage = $event;
                // @ts-ignore
                [editingTask, editingTask, fetchTasks, cancelEdit, search, statusFilter, loading, loading, error, error, paginatedTasks, taskStore, taskStore, handleEdit, filteredTasks, totalPages, totalPages, currentPage, currentPage,];
            } });
    var __VLS_19;
    var __VLS_20;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
