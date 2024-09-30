import { ref, watch } from 'vue';
import type { Ref } from 'vue';

interface Habit {
  id: number;
  text: string;
  createdAt: string;
  stopped: boolean;
  stoppedAt?: string;
}

interface DailyHabit {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface DailyEntry {
  date: string;
  habits: DailyHabit[];
}

export default function useLocalStorage() {
  const habits: Ref<Habit[]> = ref(
    JSON.parse(localStorage.getItem('habits') || '[]')
  );
  const dailyHabits: Ref<DailyEntry[]> = ref(
    JSON.parse(localStorage.getItem('dailyHabits') || '[]')
  );

  function updateDailyHabitsWithNewHabit(newHabit: Habit): void {
    dailyHabits.value.forEach((entry) => {
      if (!entry.habits.some((h) => h.id === newHabit.id)) {
        entry.habits.push({
          id: newHabit.id,
          text: newHabit.text,
          isCompleted: false,
        });
      }
    });
  }

  function cleanupEmptyDailyEntries(): void {
    dailyHabits.value = dailyHabits.value.filter(
      (entry) => entry.habits.length > 0
    );
  }

  watch(
    habits,
    (newHabits) => {
      localStorage.setItem('habits', JSON.stringify(newHabits));
      if (newHabits.length > 0) {
        updateDailyHabitsWithNewHabit(newHabits[newHabits.length - 1]);
      }
      cleanupEmptyDailyEntries();
    },
    { deep: true }
  );

  watch(
    dailyHabits,
    (newDailyHabits) => {
      localStorage.setItem('dailyHabits', JSON.stringify(newDailyHabits));
    },
    { deep: true }
  );

  function createNewHabit(habitText: string, newId: number): Habit {
    return {
      id: newId,
      text: habitText,
      createdAt: new Date().toISOString(),
      stopped: false,
    };
  }

  function addHabit(habitText: string): void {
    const newId =
      habits.value.length > 0
        ? Math.max(...habits.value.map((h) => h.id)) + 1
        : 0;
    habits.value.push(createNewHabit(habitText, newId));
  }

  function addDailyEntry(date: Date): void {
    const dateString = date.toISOString().split('T')[0];
    const existingEntry = dailyHabits.value.find(
      (entry) => entry.date === dateString
    );
    if (!existingEntry) {
      dailyHabits.value.push({
        date: dateString,
        habits: habits.value
          .filter(
            (habit) =>
              !habit.stopped ||
              (habit.stoppedAt && habit.stoppedAt > dateString)
          )
          .map((habit) => ({
            id: habit.id,
            text: habit.text,
            isCompleted: false,
          })),
      });
    }
  }

  function completeHabit(date: string, habitId: number): void {
    const dayEntry = dailyHabits.value.find((entry) => entry.date === date);
    if (dayEntry) {
      const habit = dayEntry.habits.find((h) => h.id === habitId);
      if (habit) {
        habit.isCompleted = !habit.isCompleted;
      }
    }
  }

  function updateHabitName(habitId: number, newName: string): void {
    const habit = habits.value.find((h) => h.id === habitId);
    if (habit) {
      habit.text = newName;
    }
    dailyHabits.value.forEach((entry) => {
      const habitInDaily = entry.habits.find((h) => h.id === habitId);
      if (habitInDaily) {
        habitInDaily.text = newName;
      }
    });
  }

  function updateDailyEntriesAfterDate(date: string, habitId: number): void {
    dailyHabits.value = dailyHabits.value.map((entry) => {
      if (entry.date > date) {
        return {
          ...entry,
          habits: entry.habits.filter((h) => h.id !== habitId),
        };
      }
      return entry;
    });
    cleanupEmptyDailyEntries();
  }

  function stopHabit(habitId: number, calendarDate: string): void {
    const habit = habits.value.find((h) => h.id === habitId);
    if (habit) {
      habit.stopped = true;
      habit.stoppedAt = calendarDate;
      updateDailyEntriesAfterDate(calendarDate, habitId);
    }
  }

  function deleteHabit(habitId: number): void {
    habits.value = habits.value.filter((h) => h.id !== habitId);
    dailyHabits.value = dailyHabits.value.map((entry) => ({
      ...entry,
      habits: entry.habits.filter((h) => h.id !== habitId),
    }));
    cleanupEmptyDailyEntries();
  }

  function getActiveHabitsForDate(date: Date): Habit[] {
    const dateString = date.toISOString().split('T')[0];
    return habits.value.filter(
      (habit) =>
        new Date(habit.createdAt) <= date &&
        (!habit.stopped || (habit.stoppedAt && habit.stoppedAt > dateString))
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
