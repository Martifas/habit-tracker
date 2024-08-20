<script setup>
import { ref, computed, watch } from 'vue';
import NewHabitElement from './NewHabitElement.vue';
import useCalendarStore from '../../store/calendarStore';
import useLocalStorage from './useLocalStorage';

const calendarStore = useCalendarStore();
const { dailyHabits, addHabit, addDailyEntry } = useLocalStorage();

const formattedCenterDate = computed(() => {
  const date = new Date(calendarStore.centerDate);
  return date.toISOString().split('T')[0];
});

const newHabit = ref('');

const addNewHabit = () => {
  if (newHabit.value.trim()) {
    addHabit(newHabit.value.trim());
    newHabit.value = '';
  }
};

// Watch for changes in the center date and add a new daily entry when it changes
watch(formattedCenterDate, newDate => {
  addDailyEntry(newDate);
});

// Initialize the daily entry for the current date
addDailyEntry(formattedCenterDate.value);

// Computed property to get habits for the current date
const currentDateHabits = computed(() => {
  const entry = dailyHabits.value.find(
    e => e.date === formattedCenterDate.value,
  );
  return entry ? entry.habits : [];
});
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-4">
      <p>{{ formattedCenterDate }}</p>
    </div>
    <div class="px-4 flex-grow overflow-y-auto pb-20">
      <ul class="min-h-0">
        <li
          v-for="habit in currentDateHabits"
          :key="habit.text"
          class="bg-indigo-300 w-full rounded-lg px-3 py-4 mb-3 justify-between border-black flex flex-row items-center"
        >
          <div class="m-2 font-bold">{{ habit.text }}</div>
        </li>
      </ul>
    </div>
    <div class="fixed bottom-0 left-0 right-0 p-3">
      <form class="flex flex-col items-center" @submit.prevent="addNewHabit">
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
