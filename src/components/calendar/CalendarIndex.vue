<script setup>
import { ref } from 'vue';
import DropdownElement from './dropdownElement.vue';
import useDropdown from './useDropdown';
import useCalendarRouting from './calendarRouting';

const { selected } = useDropdown();
const calendar = ref(null);
const { centerDate, moveToday } = useCalendarRouting();

function handleMoveToday() {
  moveToday();
  calendar.value.move(centerDate.value);
}
</script>

<template>
  <div v-if="selected === 'Week'" class="max-w-screen-md max-h-2 m-auto">
    <VDatePicker
      :locale="{ firstDayOfWeek: 2 }"
      ref="calendar"
      expanded
      v-model="centerDate"
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
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md inline-block text-center"
            @click="handleMoveToday"
          >
            Today
          </router-link>
        </div>
      </template>
    </VDatePicker>
    <DropdownElement />
  </div>
  <div v-else class="max-w-screen-md max-h-2 m-auto">
    <VDatePicker
      :locale="{ firstDayOfWeek: 2 }"
      ref="calendar"
      v-model="centerDate"
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
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md inline-block text-center"
          >
            Today
          </router-link>
        </div>
      </template>
    </VDatePicker>
    <DropdownElement />
  </div>
</template>
