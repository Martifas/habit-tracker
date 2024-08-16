<script setup>
import { ref, computed } from 'vue';
import DropdownElement from './dropdownElement.vue';
import useDropdown from './useDropdown';

const centerDate = ref(new Date());
const { selected } = useDropdown();

function formatDate(date) {
  const options = { month: 'short', day: 'numeric', weekday: 'short' };
  return date.toLocaleDateString('en-US', options);
}

function getDateOffset(date, offset) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + offset);
  return newDate;
}

const weekDays = computed(() => {
  return [-3, -2, -1, 0, 1, 2, 3].map(offset => {
    const date = getDateOffset(centerDate.value, offset);
    return {
      date,
      formattedDate: formatDate(date),
      isCenter: offset === 0,
    };
  });
});

function setNewCenter(newCenter) {
  centerDate.value = newCenter;
}

function moveToPreviousWeek() {
  centerDate.value = getDateOffset(centerDate.value, -7);
}

function moveToNextWeek() {
  centerDate.value = getDateOffset(centerDate.value, 7);
}
</script>

<template>
  <div id="week-navigator">
    <a href="#" @click.prevent="moveToPreviousWeek">Previous week</a>
    <a id="second" href="#" @click.prevent="moveToNextWeek">Next week</a>
  </div>

  <div v-if="selected === 'Week'" class="week-view">
    <button
      type="button"
      v-for="day in weekDays"
      :key="day.formattedDate"
      :class="{ center: day.isCenter }"
      @click="setNewCenter(day.date)"
    >
      {{ day.formattedDate }}
    </button>
  </div>
  <div v-else-if="selected === 'Month'">Month</div>
  <div v-else>Day</div>
  <DropdownElement />
</template>

<style scoped>
.week-view {
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
}

#week-navigator {
  display: flex;
}

#second {
  margin-left: auto;
}

.center {
  font-weight: bold;
  border: 1px solid black;
}
button {
  width: 3rem;
  height: 4.5rem;
  font-size: 1rem;
  font-family: 'Montserrat', system-ui;
}
</style>
