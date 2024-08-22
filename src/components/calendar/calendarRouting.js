import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useCalendarStore from '../../store/calendarStore';

export default function useCalendarRouting() {
  const router = useRouter();
  const route = useRoute();
  const calendarStore = useCalendarStore();

  const initialDate = route.params.date
    ? new Date(route.params.date)
    : new Date();

  calendarStore.setCenterDate(initialDate);

  watch(
    () => calendarStore.centerDate,
    newDate => {
      const dateString = newDate.toISOString().split('T')[0];
      if (route.params.date !== dateString) {
        router.push({ name: 'day', params: { date: dateString } });
      }
    },
  );

  watch(
    () => route.params.date,
    newDateString => {
      if (newDateString) {
        const newDate = new Date(newDateString);
        if (
          newDate.toString() !== 'Invalid Date' &&
          newDate.toISOString().split('T')[0] !==
            calendarStore.centerDate.toISOString().split('T')[0]
        ) {
          calendarStore.setCenterDate(newDate);
        }
      }
    },
  );

  function moveToday() {
    calendarStore.moveToday();
  }

  return {
    moveToday,
  };
}
