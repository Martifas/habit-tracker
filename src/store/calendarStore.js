import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const useCalendarStore = defineStore('calendar', () => {
  const router = useRouter();
  const route = useRoute();
  const centerDate = ref(new Date(route.params.date || new Date()));

  watch(centerDate, newDate => {
    const dateString = newDate.toISOString().split('T')[0];
    router.push({ name: 'day', params: { date: dateString } });
  });

  function moveToday() {
    centerDate.value = new Date();
  }

  return {
    centerDate,
    moveToday,
  };
});

export default useCalendarStore;
