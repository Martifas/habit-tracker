<script setup>
import { ref, computed } from 'vue';
import NewHabitElement from './NewHabitElement.vue';
import useCalendarStore from '../../store/calendarStore';

const habits = ref([]);
const newHabit = ref('');
const calendarStore = useCalendarStore();

const formattedCenterDate = computed(() => {
  const date = new Date(calendarStore.centerDate);
  return date.toISOString().split('T')[0];
});

const addHabit = () => {
  if (newHabit.value.trim()) {
    habits.value.push(newHabit.value.trim());
    newHabit.value = '';
  }
};
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-4">
      <p>{{ formattedCenterDate }}</p>
    </div>
    <div class="px-4 flex-grow overflow-y-auto pb-20">
      <ul class="min-h-0">
        <li
          v-for="(habit, index) in habits"
          :key="index"
          class="bg-indigo-300 w-full rounded-lg px-3 py-4 mb-3 justify-between border-black flex flex-row items-center"
        >
          <div class="m-2 font-bold">{{ habit }}</div>
        </li>
      </ul>
    </div>
    <div class="fixed bottom-0 left-0 right-0 p-3">
      <form class="flex flex-col items-center" @submit.prevent="addHabit">
        <input
          v-model="newHabit"
          class="text-center border border-gray-300 p-2 w-full mb-4"
          required
          placeholder="New Habit"
        />
        <NewHabitElement />
      </form>
    </div>
  </div>
</template>
