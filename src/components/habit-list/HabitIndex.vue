<script setup>
import { computed, watch } from 'vue';
import NewHabitElement from './NewHabitElement.vue';
import useCalendarStore from '../../store/calendarStore';
import useLocalStorage from './useLocalStorage';
import HabitEditElement from './HabitEditElement.vue';
import UndoIcon from '../../assets/icons/undo.svg';
import CompleteIcon from '../../assets/icons/complete.svg';

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

const getCompleteButtonIcon = isCompleted =>
  isCompleted ? UndoIcon : CompleteIcon;
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
          <div class="flex flex-row">
            <button
              class="rounded-full w-9 h-9 bg-white hover:bg-slate-200"
              type="button"
              @click="handleCompleteHabit(habit.text)"
            >
              <img
                :src="getCompleteButtonIcon(habit.isCompleted)"
                alt="Complete/Undo"
                title="Comple/Undo"
                class="w-5 h-5 mx-auto"
              />
            </button>
            <HabitEditElement />
          </div>
        </li>
      </ul>
    </div>
    <div class="fixed bottom-0 left-0 right-0 py-3">
      <NewHabitElement @add-habit="handleAddHabit" />
    </div>
  </div>
</template>
