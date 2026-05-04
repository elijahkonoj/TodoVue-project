<script setup lang="ts"> 
const { currentPage, totalPages } = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

const goPrev = () => {
  emit("change", Math.max(1, (currentPage as number) - 1));
};

const goNext = () => {
  emit("change", Math.min(totalPages as number, (currentPage as number) + 1));
};
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1rem;">
    <button
      @click="goPrev"
      :disabled="currentPage === 1"
      style="border: 1px solid #ccc; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
    >
      Prev
    </button>

    <span>
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
      @click="goNext"
      :disabled="currentPage === totalPages"
      style="border: 1px solid #ccc; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;"
    >
      Next
    </button>
  </div>
</template>