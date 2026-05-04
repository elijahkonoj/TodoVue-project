import { ref, watch } from "vue";
//import api from "../services/api";
import { useToast } from "vue-toastification";
import { useTaskStore } from "../stores/taskStore";
const toast = useToast();
const taskStore = useTaskStore();
const props = defineProps();
const emit = defineEmits();
const name = ref("");
const description = ref("");
const loading = ref(false);
watch(() => props.editingTask, (task) => {
    if (task) {
        name.value = task.name;
        description.value = task.description;
    }
    else {
        name.value = "";
        description.value = "";
    }
}, { immediate: true });
const saveTask = async () => {
    if (!name.value.trim())
        return;
    loading.value = true;
    try {
        if (props.editingTask) {
            await taskStore.updateTask(props.editingTask.id, {
                name: name.value,
                description: description.value,
            });
            toast.success("Task updated successfully");
        }
        else {
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
    }
    catch (err) {
        toast.error("Failed to save task");
    }
    finally {
        loading.value = false;
    }
};
const cancelEdit = () => {
    emit("cancel-edit");
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ style: {} },
});
(__VLS_ctx.editingTask ? "Edit Task" : "Create Task");
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    placeholder: "Task name",
    ...{ style: {} },
});
(__VLS_ctx.name);
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
    value: (__VLS_ctx.description),
    placeholder: "Description",
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.saveTask) },
    disabled: (__VLS_ctx.loading),
    ...{ style: {} },
});
(__VLS_ctx.loading ? "Saving..." : __VLS_ctx.editingTask ? "Update" : "Add Task");
if (__VLS_ctx.editingTask) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.cancelEdit) },
        ...{ style: {} },
    });
}
// @ts-ignore
[editingTask, editingTask, editingTask, name, description, saveTask, loading, loading, cancelEdit,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
