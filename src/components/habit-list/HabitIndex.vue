<script setup>
import { ref, computed } from 'vue';
import NewHabitElement from './NewHabitElement.vue';
import useLocalStorage from './useLocalStorage';
import useCalendarRouting from '../calendar/calendarRouting';

const newHabit = ref('');
const habits = useLocalStorage('habits', []);
const dailyHabits = useLocalStorage('dailyHabits', {});
const selectedDate = ref(new Date().toISOString().split('T')[0]); // Today's date
const betterDate = useCalendarRouting();
const { centerDate } = betterDate;

const currentDayHabits = computed(() => {
  return dailyHabits.value[selectedDate.value] || [];
});

function updateDailyHabits() {
  if (!dailyHabits.value[selectedDate.value]) {
    dailyHabits.value[selectedDate.value] = [];
  }
  dailyHabits.value[selectedDate.value] = [...habits.value];
}

function addHabit() {
  habits.value.push(newHabit.value);
  newHabit.value = '';
  updateDailyHabits();
}

function removeHabit(habit) {
  habits.value = habits.value.filter(h => h !== habit);
  updateDailyHabits();
}

function selectDate(date) {
  selectedDate.value = date;
  if (!dailyHabits.value[date]) {
    updateDailyHabits();
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-4">
      <input
        type="date"
        v-model="selectedDate"
        @change="selectDate(selectedDate)"
        class="border p-2"
      />
      <p>{{ centerDate }}</p>
    </div>
    <div class="px-4 flex-grow overflow-y-auto pb-20">
      <ul class="min-h-0">
        <li
          v-for="(habit, index) in currentDayHabits"
          :key="index"
          class="bg-indigo-300 w-full rounded-lg px-3 py-4 mb-3 justify-between border-black flex flex-row items-center"
        >
          <div class="m-2 font-bold">{{ habit }}</div>
          <button
            class="bg-white rounded border-2 border-black m-1 p-1"
            type="button"
            @click="removeHabit(habit)"
          >
            Delete
          </button>
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
