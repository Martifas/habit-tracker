<script setup>
import { defineProps, defineEmits, toRef, ref } from 'vue';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['update:show', 'confirm']);

const showRef = toRef(props, 'show');
const inputValue = ref('');

function closePopup() {
  emit('update:show', false);
  inputValue.value = '';
}

function confirmChange() {
  emit('confirm', inputValue.value);
  closePopup();
}
</script>

<template>
  <div v-if="showRef" class="absolute bottom-3 right-3 w-44">
    <div
      class="popup bg-blue-400 border border-stone-400 p-2 rounded shadow-md"
    >
      <input
        v-model="inputValue"
        type="text"
        id="nameChange"
        class="border border-stone-700 w-40"
        placeholder="New habit name"
      />
      <label for="nameChange" />
      <div class="flex justify-around">
        <button
          type="button"
          @click="confirmChange"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-blue-700 border border-stone-700 mt-1"
        >
          Confirm
        </button>
        <button
          type="button"
          @click="closePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-blue-700 border border-stone-700 mt-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
