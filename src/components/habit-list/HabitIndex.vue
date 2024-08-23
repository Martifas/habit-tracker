<script setup>
import { computed, watch } from 'vue';
import NewHabitElement from './NewHabit.vue';
import useCalendarStore from '../../store/calendarStore';
import useLocalStorage from './useLocalStorage';
import HabitEdit from './HabitEdit.vue';
import UndoIcon from '../../assets/icons/undo.svg';
import CompleteIcon from '../../assets/icons/complete.svg';

const calendarStore = useCalendarStore();
const {
  dailyHabits,
  addDailyEntry,
  completeHabit,
  addHabit,
  updateHabitName,
  stopHabit,
  deleteHabit,
} = useLocalStorage();

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

const handleCompleteHabit = habitId => {
  completeHabit(formattedCenterDate.value, habitId);
};

const handleAddHabit = habitText => {
  addHabit(habitText);
  addDailyEntry(formattedCenterDate.value);
};

const handleUpdateHabitName = (habitId, newName) => {
  updateHabitName(habitId, newName);
};

const handleStopHabit = habitId => {
  stopHabit(habitId);
};

const handleDeleteHabit = habitId => {
  deleteHabit(habitId);
};

const getCompleteButtonIcon = isCompleted =>
  isCompleted ? UndoIcon : CompleteIcon;

const getHabitBackgroundColor = isCompleted =>
  isCompleted ? '#d1e6d4' : '#e2e6d1';

const getCompleteStateText = isCompleted =>
  isCompleted ? 'Completed' : 'Not Completed';

const getCompleteButtonLabel = isCompleted =>
  isCompleted ? 'Mark as not completed' : 'Mark as completed';
</script>

<template>
  <div class="flex flex-col max-w-4xl mx-auto pb-5">
    <div class="flex-grow overflow-y-auto">
      <ul class="list-container" aria-label="Habits for the day">
        <li
          v-for="habit in currentDateHabits"
          :key="habit.id"
          class="w-full rounded-lg px-3 py-4 mb-3 justify-between border-black flex flex-row items-center relative"
          :style="{
            backgroundColor: getHabitBackgroundColor(habit.isCompleted),
          }"
        >
          <div>
            <h3 class="m-2 font-bold text-xl">{{ habit.text }}</h3>
            <div class="font-bold m-2 text-sm" aria-live="polite">
              {{ getCompleteStateText(habit.isCompleted) }}
            </div>
          </div>
          <div
            class="flex flex-row space-x-1"
            role="group"
            :aria-label="`Actions for ${habit.text}`"
          >
            <button
              class="rounded-full size-9 bg-white hover:bg-green-300"
              type="button"
              @click="handleCompleteHabit(habit.id)"
              :aria-label="getCompleteButtonLabel(habit.isCompleted)"
            >
              <img
                :src="getCompleteButtonIcon(habit.isCompleted)"
                alt=""
                class="size-7 mx-auto"
              />
            </button>
            <HabitEdit
              :habit="habit"
              @update-habit-name="handleUpdateHabitName"
              @stop-habit="handleStopHabit"
              @delete-habit="handleDeleteHabit"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="new-habit fixed bottom-0 left-0 right-0 py-3">
      <NewHabitElement class="new-habit" @add-habit="handleAddHabit" />
    </div>
  </div>
</template>

<style scoped>
.new-habit {
  background-color: #f8faed;
}
</style>
