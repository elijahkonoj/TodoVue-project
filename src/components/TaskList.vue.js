import TaskItems from "./TaskItems.vue";
const __VLS_props = defineProps();
const emit = defineEmits();
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
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ style: {} },
});
for (const [task] of __VLS_vFor((__VLS_ctx.tasks))) {
    const __VLS_0 = TaskItems;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onEdit': {} },
        ...{ 'onDelete': {} },
        key: (task.id),
        task: (task),
        editingId: (__VLS_ctx.editingId),
        deletingId: (__VLS_ctx.deletingId),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onEdit': {} },
        ...{ 'onDelete': {} },
        key: (task.id),
        task: (task),
        editingId: (__VLS_ctx.editingId),
        deletingId: (__VLS_ctx.deletingId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ edit: {} },
        { onEdit: (...[$event]) => {
                __VLS_ctx.emit('edit', $event);
                // @ts-ignore
                [tasks, editingId, deletingId, emit,];
            } });
    const __VLS_7 = ({ delete: {} },
        { onDelete: (...[$event]) => {
                __VLS_ctx.emit('delete', $event);
                // @ts-ignore
                [emit,];
            } });
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
