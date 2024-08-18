<script setup>
import { ref } from 'vue';
import DropdownElement from './dropdownElement.vue';
import useDropdown from './useDropdown';

const centerDate = ref(new Date());
const { selected } = useDropdown();
const calendar = ref(null);

function moveToday() {
  calendar.value.move(new Date());
  centerDate.value = new Date();
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
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
            @click="moveToday"
          >
            Today
          </button>
        </div>
      </template></VDatePicker
    ><DropdownElement />
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
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
            @click="moveToday"
          >
            Today
          </button>
        </div>
      </template>
    </VDatePicker>
    <DropdownElement />
  </div>
</template>
