<script setup>
defineProps({
  show: Boolean,
});

const emit = defineEmits(['update:show']);

function closePopup() {
  emit('update:show', false);
}
</script>

<template>
  <div v-if="show" class="absolute bottom-1 right-2 w-44">
    <div class="popup bg-red-400 border border-stone-400 p-2 rounded shadow-md">
      <div>Delete Habit from all days?</div>
      <div class="flex justify-around">
        <button
          type="button"
          @click="closePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-red-700 border border-stone-700 mt-1"
        >
          Confirm
        </button>
        <button
          type="button"
          @click="closePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-red-700 border border-stone-700 mt-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
