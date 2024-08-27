import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useCalendarStore from '../../store/calendarStore';

export default function useCalendarRouting() {
  const router = useRouter();
  const route = useRoute();
  const calendarStore = useCalendarStore();

  // Helper function to get today's date as YYYY-MM-DD
  const getTodayString = () => new Date().toLocaleDateString('en-CA');

  // Helper function to check if a date is valid
  const isValidDate = date => date instanceof Date && !isNaN(date);

  // Initialize with route date or today
  const initialDate = route.params.date
    ? new Date(route.params.date)
    : new Date();

  calendarStore.setCenterDate(isValidDate(initialDate) ? initialDate : new Date());

  watch(
    () => calendarStore.centerDate,
    newDate => {
      if (isValidDate(newDate)) {
        const dateString = newDate.toLocaleDateString('en-CA');
        if (route.params.date !== dateString) {
          router.push({ name: 'day', params: { date: dateString } });
        }
      } else {
        // If invalid date somehow got set, reset to today
        moveToday();
      }
    },
  );

  watch(
    () => route.params.date,
    newDateString => {
      if (newDateString) {
        const newDate = new Date(newDateString);
        if (isValidDate(newDate)) {
          const newDateString = newDate.toLocaleDateString('en-CA');
          const currentDateString = calendarStore.centerDate.toLocaleDateString('en-CA');
          if (newDateString !== currentDateString) {
            calendarStore.setCenterDate(newDate);
          }
        } else {
          // Invalid date provided, move to today
          moveToday();
        }
      } else {
        // Empty date, move to today
        moveToday();
      }
    },
  );

  function moveToday() {
    const today = new Date();
    calendarStore.setCenterDate(today);
    router.push({ name: 'day', params: { date: getTodayString() } });
  }

  return {
    moveToday,
  };
}