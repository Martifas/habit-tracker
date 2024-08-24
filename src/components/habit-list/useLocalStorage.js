import { ref, watch } from 'vue';

export default function useLocalStorage() {
  const habits = ref(JSON.parse(localStorage.getItem('habits')) || []);
  const dailyHabits = ref(
    JSON.parse(localStorage.getItem('dailyHabits')) || [],
  );

  // Add a new habit to all existing daily entries
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

  // Remove daily entries with empty habit arrays
  function cleanupEmptyDailyEntries() {
    dailyHabits.value = dailyHabits.value.filter(
      entry => entry.habits.length > 0,
    );
  }

  // Watch for changes in habits, update localStorage and dailyHabits
  watch(
    habits,
    newHabits => {
      localStorage.setItem('habits', JSON.stringify(newHabits));
      if (newHabits.length > 0) {
        updateDailyHabitsWithNewHabit(newHabits[newHabits.length - 1]);
      }
      cleanupEmptyDailyEntries();
    },
    { deep: true },
  );

  // Watch for changes in dailyHabits and update localStorage
  watch(
    dailyHabits,
    newDailyHabits => {
      localStorage.setItem('dailyHabits', JSON.stringify(newDailyHabits));
    },
    { deep: true },
  );

  // Add a new habit to the habits list
  function addHabit(habitText) {
    const newId =
      habits.value.length > 0
        ? Math.max(...habits.value.map(h => h.id)) + 1
        : 0;
    habits.value.push({ id: newId, text: habitText, createdAt: new Date().toISOString() });
  }

  // Add a new daily entry for a specific date
  function addDailyEntry(date) {
    const existingEntry = dailyHabits.value.find(entry => entry.date === date);
    if (!existingEntry) {
      dailyHabits.value.push({
        date,
        habits: habits.value
          .filter(habit => !habit.stoppedAt || new Date(habit.stoppedAt) > new Date(date))
          .map(habit => ({
            id: habit.id,
            text: habit.text,
            isCompleted: false,
          })),
      });
    }
  }

  // Toggle the completion status of a habit for a specific date
  function completeHabit(date, habitId) {
    const dayEntry = dailyHabits.value.find(entry => entry.date === date);
    if (dayEntry) {
      const habit = dayEntry.habits.find(h => h.id === habitId);
      if (habit) {
        habit.isCompleted = !habit.isCompleted;
      }
    }
  }

  // Update the name of a habit in both habits and dailyHabits
  function updateHabitName(habitId, newName) {
    const habit = habits.value.find(h => h.id === habitId);
    if (habit) {
      habit.text = newName;
    }
    dailyHabits.value.forEach(entry => {
      const habitInDaily = entry.habits.find(h => h.id === habitId);
      if (habitInDaily) {
        habitInDaily.text = newName;
      }
    });
  }

  // Mark a habit as stopped
  function stopHabit(habitId) {
    const habit = habits.value.find(h => h.id === habitId);
    if (habit) {
      habit.stoppedAt = new Date().toISOString();
    }
  }

  // Remove a habit from both habits and dailyHabits
  function deleteHabit(habitId) {
    habits.value = habits.value.filter(h => h.id !== habitId);
    dailyHabits.value = dailyHabits.value.map(entry => ({
      ...entry,
      habits: entry.habits.filter(h => h.id !== habitId),
    }));
    cleanupEmptyDailyEntries();
  }

  // Get active habits for a specific date
  function getActiveHabitsForDate(date) {
    return habits.value.filter(habit => 
      new Date(habit.createdAt) <= new Date(date) && 
      (!habit.stoppedAt || new Date(habit.stoppedAt) > new Date(date))
    );
  }

  return {
    habits,
    dailyHabits,
    addHabit,
    addDailyEntry,
    completeHabit,
    updateHabitName,
    stopHabit,
    deleteHabit,
    getActiveHabitsForDate,
  };
}