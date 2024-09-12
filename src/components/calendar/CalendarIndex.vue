<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { DatePicker } from 'v-calendar';
import DropdownElement from './dropdown/DropdownIndex.vue';
import useDropdown from './dropdown/useDropdown';
import useCalendarStore from '../../store/calendarStore';
import useCalendarRouting from './calendarRouting';

const props = defineProps({
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
});

const { selected } = useDropdown();
const calendar: Ref<InstanceType<typeof DatePicker> | null> = ref(null);
const calendarStore = useCalendarStore();
const { moveToday } = useCalendarRouting();

function handleMoveToday() {
  moveToday();
  calendar.value?.move(calendarStore.centerDate);
}

function handleDateChange(newDate: Date | string) {
  calendarStore.setCenterDate(new Date(newDate));
}

calendarStore.setCenterDate(new Date(props.date));
</script>

<template>
  <div>
    <DropdownElement class="py-1" aria-label="Select calendar view" />
    <div v-if="selected === 'Week'">
      <VDatePicker
        :max-date="new Date()"
        :locale="{ firstDayOfWeek: 1 }"
        ref="calendar"
        expanded
        :model-value="calendarStore.centerDate"
        @update:model-value="handleDateChange"
        title-position="left"
        view="weekly"
        aria-label="Weekly calendar"
      >
        <template #footer>
          <div class="w-full px-4 pb-3">
            <router-link
              :to="{
                name: 'day',
                params: { date: new Date().toISOString().split('T')[0] },
              }"
              class="today-button hover:bg-slate-500 text-white font-bold w-full px-3 py-1 rounded-md inline-block text-center"
              @click="handleMoveToday"
              aria-label="Go to today's date"
            >
              Today
            </router-link>
          </div>
        </template>
      </VDatePicker>
    </div>
    <div v-else class="max-w-screen-md">
      <VDatePicker
        :max-date="new Date()"
        :locale="{ firstDayOfWeek: 2 }"
        ref="calendar"
        :model-value="calendarStore.centerDate"
        @update:model-value="handleDateChange"
        title-position="left"
        expanded
        aria-label="Monthly calendar"
      >
        <template #footer>
          <div class="w-full px-4 pb-3">
            <router-link
              :to="{
                name: 'day',
                params: { date: new Date().toISOString().split('T')[0] },
              }"
              class="today-button text-white font-bold w-full px-3 py-1 rounded-md inline-block text-center"
              @click="handleMoveToday"
              aria-label="Go to today's date"
            >
              Today
            </router-link>
          </div>
        </template>
      </VDatePicker>
    </div>
  </div>
</template>

<style scoped>
.today-button {
  background-color: #232323;
}
</style>
