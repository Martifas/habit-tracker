<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  message: {
    type: String,
    required: true,
  },
});
const isVisible = ref(true);
const hidePopup = () => {
  isVisible.value = false;
};
onMounted(() => {
  setTimeout(hidePopup, 5000);
});
</script>
<template>
  <div
    v-if="isVisible"
    class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    {{ message }}
    <button
      type="button"
      @click="hidePopup"
      class="ml-2 text-white font-bold"
      aria-label="Close notification"
    >
      &times;
    </button>
  </div>
</template>
