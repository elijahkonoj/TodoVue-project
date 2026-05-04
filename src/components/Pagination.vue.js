const __VLS_props = defineProps();
const { currentPage, totalPages } = __VLS_props;
const emit = defineEmits();
const goPrev = () => {
    emit("change", Math.max(1, currentPage - 1));
};
const goNext = () => {
    emit("change", Math.min(totalPages, currentPage + 1));
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
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.goPrev) },
    disabled: (currentPage === 1),
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(currentPage);
(totalPages);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.goNext) },
    disabled: (currentPage === totalPages),
    ...{ style: {} },
});
// @ts-ignore
[goPrev, goNext,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
