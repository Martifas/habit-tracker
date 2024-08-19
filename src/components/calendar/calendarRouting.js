import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default function useCalendarRouting() {
  const router = useRouter();
  const route = useRoute();

  const initialDate = route.params.date
    ? new Date(route.params.date)
    : new Date();
  const centerDate = ref(initialDate);

  watch(centerDate, newDate => {
    const dateString = newDate.toISOString().split('T')[0];
    router.push({ name: 'day', params: { date: dateString } });
  });

  function moveToday() {
    const today = new Date();
    centerDate.value = today;
  }

  return {
    centerDate,
    moveToday,
  };
}
