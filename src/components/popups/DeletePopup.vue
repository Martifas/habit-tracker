<script setup lang="ts">
defineProps({
  show: Boolean,
});
const emit = defineEmits(['update:show', 'confirm']);
function closePopup() {
  emit('update:show', false);
}
function confirmDelete() {
  emit('confirm');
  closePopup();
}
</script>
<template>
  <div
    v-if="show"
    class="absolute bottom-1 right-2 w-44"
    role="dialog"
    aria-labelledby="delete-confirmation-title"
  >
    <div class="popup bg-red-400 border border-stone-400 p-2 rounded shadow-md">
      <div id="delete-confirmation-title">Delete Habit from all days?</div>
      <div class="flex justify-around">
        <button
          type="button"
          @click="confirmDelete"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-red-700 border border-stone-700 mt-1"
          aria-label="Confirm deletion"
        >
          Confirm
        </button>
        <button
          type="button"
          @click="closePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-red-700 border border-stone-700 mt-1"
          aria-label="Cancel deletion"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
