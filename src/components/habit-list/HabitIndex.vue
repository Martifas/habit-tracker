<script setup>
import { computed, watch } from 'vue';
import NewHabitElement from './NewHabitElement.vue';
import useCalendarStore from '../../store/calendarStore';
import useLocalStorage from './useLocalStorage';

const calendarStore = useCalendarStore();
const { dailyHabits, addDailyEntry, completeHabit, addHabit } =
  useLocalStorage();

const formattedCenterDate = computed(() => {
  const date = new Date(calendarStore.centerDate);
  return date.toISOString().split('T')[0];
});

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

const handleCompleteHabit = habitText => {
  completeHabit(formattedCenterDate.value, habitText);
};

const handleAddHabit = habitText => {
  addHabit(habitText);
  addDailyEntry(formattedCenterDate.value);
};

const getCompleteButtonText = isCompleted =>
  isCompleted ? 'Undo' : 'Complete';
const getHabitBackgroundColor = isCompleted =>
  isCompleted ? '#d1e6d4' : '#e2e6d1';
const getCompleteStateText = isCompleted =>
  isCompleted ? 'Completed' : 'Not Completed';
</script>

<template>
  <div class="flex flex-col max-w-4xl mx-auto pb-5">
    <div class="flex-grow overflow-y-auto">
      <ul class="min-h-0">
        <li
          v-for="habit in currentDateHabits"
          :key="habit.text"
          class="w-full rounded-lg px-3 py-4 mb-3 justify-between border-black flex flex-row items-center"
          :style="{
            backgroundColor: getHabitBackgroundColor(habit.isCompleted),
          }"
        >
          <div>
            <div class="m-2 font-bold text-xl">{{ habit.text }}</div>
            <div class="font-bold m-2 text-sm">
              {{ getCompleteStateText(habit.isCompleted) }}
            </div>
          </div>
          <div>
            <button
              class="rounded-full p-1 border border-black bg-white hover:bg-slate-200"
              type="button"
              @click="handleCompleteHabit(habit.text)"
            >
              {{ getCompleteButtonText(habit.isCompleted) }}
            </button>
            <button
              class="bg-black text-white p-1 rounded-full m-1 hover:bg-slate-500"
              type="button"
            >
              Edit
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="fixed bottom-0 left-0 right-0 py-3 new-habit">
      <NewHabitElement @add-habit="handleAddHabit" />
    </div>
  </div>
</template>
<style scoped>
.new-habit {
  background-color: #f8faed;
}
</style>
