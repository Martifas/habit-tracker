<script setup>
import { ref } from 'vue';

const emit = defineEmits(['addHabit']);
const newHabit = ref('');
const isInputVisible = ref(false);
const inputId = 'new-habit-input';

const addNewHabit = () => {
  if (newHabit.value.trim()) {
    emit('addHabit', newHabit.value.trim());
    newHabit.value = '';
    isInputVisible.value = false;
  }
};

const toggleInput = () => {
  if (isInputVisible.value && newHabit.value.trim()) {
    addNewHabit();
  } else {
    isInputVisible.value = !isInputVisible.value;
    if (isInputVisible.value) {
      // Focus the input field when it becomes visible
      setTimeout(() => {
        document.getElementById(inputId)?.focus();
      }, 0);
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
    <form
      v-if="isInputVisible"
      @submit.prevent="addNewHabit"
      class="w-4/5 lg:w-3/5 mb-4"
    >
      <label :for="inputId" class="sr-only">Enter new habit</label>
      <input
        :id="inputId"
        v-model="newHabit"
        class="w-full text-center border border-gray-300 p-2 mt-1 rounded"
        required
        placeholder="New Habit"
        aria-label="New habit name"
      />
    </form>
    <button
      type="button"
      @click="toggleInput"
      class="new-habit-button text-white py-2 px-5 rounded-full inline-block text-center w-4/5 lg:w-3/5"
      :aria-expanded="isInputVisible"
      :aria-controls="inputId"
    >
      {{ isInputVisible ? '+ Add Habit' : '+ New Habit' }}
    </button>
  </div>
</template>

<style scoped>
.new-habit-button {
  background-color: #50a65c;
  color: #232323;
}
.new-habit-button:hover {
  background-color: #68c474;
}
</style>
