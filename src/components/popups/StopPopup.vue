<script setup lang="ts">
defineProps({
  show: Boolean,
});
const emit = defineEmits(['update:show', 'confirm']);
function closePopup() {
  emit('update:show', false);
}
function confirmStop() {
  emit('confirm');
  closePopup();
}
</script>
<template>
  <div
    v-if="show"
    class="absolute bottom-1 right-2 w-44"
    role="dialog"
    aria-labelledby="stop-habit-title"
  >
    <div
      class="popup bg-yellow-400 border border-stone-400 p-2 rounded shadow-md"
    >
      <div id="stop-habit-title">Stop Habit from today onwards?</div>
      <div class="flex justify-around">
        <button
          type="button"
          @click="confirmStop"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-yellow-700 border border-stone-700 mt-1"
          aria-label="Confirm stopping habit"
        >
          Confirm
        </button>
        <button
          type="button"
          @click="closePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-yellow-700 border border-stone-700 mt-1"
          aria-label="Cancel stopping habit"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
