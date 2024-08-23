import { ref, watch } from 'vue';

export default function useLocalStorage() {
  const habits = ref(JSON.parse(localStorage.getItem('habits')) || []);
  const dailyHabits = ref(
    JSON.parse(localStorage.getItem('dailyHabits')) || [],
  );

  function updateDailyHabitsWithNewHabit(newHabit) {
    dailyHabits.value.forEach(entry => {
      if (!entry.habits.some(h => h.id === newHabit.id)) {
        entry.habits.push({
          id: newHabit.id,
          text: newHabit.text,
          isCompleted: false,
        });
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
    const newId =
      habits.value.length > 0
        ? Math.max(...habits.value.map(h => h.id)) + 1
        : 0;
    habits.value.push({ id: newId, text: habitText });
  }

  function addDailyEntry(date) {
    const existingEntry = dailyHabits.value.find(entry => entry.date === date);
    if (!existingEntry) {
      dailyHabits.value.push({
        date,
        habits: habits.value.map(habit => ({
          id: habit.id,
          text: habit.text,
          isCompleted: false,
        })),
      });
    }
  }

  function completeHabit(date, habitId) {
    const dayEntry = dailyHabits.value.find(entry => entry.date === date);
    if (dayEntry) {
      const habit = dayEntry.habits.find(h => h.id === habitId);
      if (habit) {
        habit.isCompleted = !habit.isCompleted;
      }
    }
  }

  function updateHabitName(habitId, newName) {
    // Update in habits array
    const habit = habits.value.find(h => h.id === habitId);
    if (habit) {
      habit.text = newName;
    }

    // Update in dailyHabits array
    dailyHabits.value.forEach(entry => {
      const habitInDaily = entry.habits.find(h => h.id === habitId);
      if (habitInDaily) {
        habitInDaily.text = newName;
      }
    });
  }

  return {
    habits,
    dailyHabits,
    addHabit,
    addDailyEntry,
    completeHabit,
    updateHabitName,
  };
}
