<script setup>
import { ref } from 'vue';
import DropdownElement from './DropdownElement.vue';
import useDropdown from './useDropdown';
import useCalendarStore from '../../store/calendarStore';

const { selected } = useDropdown();
const calendar = ref(null);
const calendarStore = useCalendarStore(); // Use the Pinia store

function handleMoveToday() {
  calendarStore.moveToday();
  calendar.value.move(calendarStore.centerDate);
}
</script>

<template>
  <div v-if="selected === 'Week'">
    <VDatePicker
      :locale="{ firstDayOfWeek: 2 }"
      ref="calendar"
      expanded
      v-model="calendarStore.centerDate"
      title-position="left"
      view="weekly"
    >
      <template #footer>
        <div class="w-full px-4 pb-3">
          <router-link
            :to="{
              name: 'day',
              params: { date: new Date().toISOString().split('T')[0] },
            }"
            class="todayButton text-white font-bold w-full px-3 py-1 rounded-md inline-block text-center"
            @click="handleMoveToday"
          >
            Today
          </router-link>
        </div>
      </template>
    </VDatePicker>
    <DropdownElement />
  </div>
  <div v-else class="max-w-screen-md">
    <VDatePicker
      :locale="{ firstDayOfWeek: 2 }"
      ref="calendar"
      v-model="calendarStore.centerDate"
      title-position="left"
      expanded
    >
      <template #footer>
        <div class="w-full px-4 pb-3">
          <router-link
            :to="{
              name: 'day',
              params: { date: new Date().toISOString().split('T')[0] },
            }"
            class="todayButton text-white font-bold w-full px-3 py-1 rounded-md inline-block text-center"
            @click="handleMoveToday"
          >
            Today
          </router-link>
        </div>
      </template>
    </VDatePicker>
    <DropdownElement />
  </div>
</template>

<style scoped>
.todayButton {
  background-color: #232323;
}
.todayButton:hover {
  background-color: #8f8c8c;
}
</style>
