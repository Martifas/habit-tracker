import { ref, watch } from 'vue';

export default function useLocalStorage() {
  const habits = ref(JSON.parse(localStorage.getItem('habits')) || []);
  const dailyHabits = ref(
    JSON.parse(localStorage.getItem('dailyHabits')) || [],
  );

  function updateDailyHabitsWithNewHabit(newHabit) {
    dailyHabits.value.forEach(entry => {
      if (!entry.habits.some(h => h.text === newHabit)) {
        entry.habits.push({ text: newHabit, isCompleted: false });
      }
    });
  }

  watch(
    habits,
    newHabits => {
      localStorage.setItem('habits', JSON.stringify(newHabits));
      updateDailyHabitsWithNewHabit(newHabits[newHabits.length - 1]);
    },
    { deep: true },
  );

  watch(
    dailyHabits,
    newDailyHabits => {
      localStorage.setItem('dailyHabits', JSON.stringify(newDailyHabits));
    },
    { deep: true },
  );

  function addHabit(habitText) {
    habits.value.push(habitText);
  }

  function addDailyEntry(date) {
    const existingEntry = dailyHabits.value.find(entry => entry.date === date);
    if (!existingEntry) {
      dailyHabits.value.push({
        date,
        habits: habits.value.map(habit => ({
          text: habit,
          isCompleted: false,
        })),
      });
    }
  }

  return {
    habits,
    dailyHabits,
    addHabit,
    addDailyEntry,
  };
}
