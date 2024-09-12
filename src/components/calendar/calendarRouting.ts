import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useCalendarStore from '../../store/calendarStore';

export default function useCalendarRouting() {
  const router = useRouter();
  const route = useRoute();
  const calendarStore = useCalendarStore();
  const getTodayString = (): string => new Date().toLocaleDateString('en-CA');

  const isValidDate = (date: Date): boolean =>
    date instanceof Date && !Number.isNaN(date.getTime());

  const initialDate = (route.params.date as string)
    ? new Date(route.params.date as string)
    : new Date();

  function moveToday(): void {
    const today = new Date();
    calendarStore.setCenterDate(today);
    router.push({ name: 'day', params: { date: getTodayString() } });
  }

  calendarStore.setCenterDate(
    isValidDate(initialDate) ? initialDate : new Date()
  );

  watch(
    () => calendarStore.centerDate,
    (newDate: Date) => {
      if (isValidDate(newDate)) {
        const dateString = newDate.toLocaleDateString('en-CA');
        if (route.params.date !== dateString) {
          router.push({ name: 'day', params: { date: dateString } });
        }
      } else {
        // If invalid date somehow got set, reset to today
        moveToday();
      }
    }
  );

  watch(
    () => route.params.date,
    (newDateString: string | string[] | undefined) => {
      if (newDateString && typeof newDateString === 'string') {
        const newDate = new Date(newDateString);
        if (isValidDate(newDate)) {
          const formattedNewDateString = newDate.toLocaleDateString('en-CA');
          const currentDateString =
            calendarStore.centerDate.toLocaleDateString('en-CA');
          if (formattedNewDateString !== currentDateString) {
            calendarStore.setCenterDate(newDate);
          }
        } else {
          // Invalid date provided, move to today
          moveToday();
        }
      } else {
        // Empty date or invalid type, move to today
        moveToday();
      }
    }
  );

  return {
    moveToday,
  };
}
