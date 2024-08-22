import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCalendarStore = defineStore('calendar', () => {
  const centerDate = ref(new Date());

  function setCenterDate(date) {
    centerDate.value = new Date(date);
  }

  function moveToday() {
    centerDate.value = new Date();
  }

  return {
    centerDate,
    setCenterDate,
    moveToday,
  };
});

export default useCalendarStore;
