<script setup>
import { ref } from 'vue';

const emit = defineEmits(['addHabit']);

const newHabit = ref('');
const isInputVisible = ref(false);

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
  }
};
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
    <div v-if="isInputVisible" class="w-4/5 lg:w-3/5 mb-4">
      <input
        v-model="newHabit"
        class="w-full text-center border border-gray-300 p-2 rounded"
        required
        placeholder="New Habit"
        @keyup.enter="addNewHabit"
      />
    </div>
    <button
      type="button"
      @click="toggleInput"
      class="NewHabitButton text-white py-2 px-5 rounded-full inline-block text-center w-4/5 lg:w-3/5"
    >
      {{ isInputVisible ? '+ Add Habit' : '+ New Habit' }}
    </button>
  </div>
</template>

<style scoped>
.NewHabitButton {
  background-color: #50a65c;
  color: #232323;
}
</style>
