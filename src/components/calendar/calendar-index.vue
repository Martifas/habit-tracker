<script setup>
import { ref, computed } from 'vue';

const centerDate = ref(new Date());
const selected = ref('Week');
const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectView(view) {
  selected.value = view;
  showDropdown.value = false;
}
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

  <div class="week-view">
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
  <div class="view-select">
    <a href="#" @click.prevent="toggleDropdown">Select View: {{ selected }}</a>
    <div v-if="showDropdown" class="dropdown">
      <a href="#" @click.prevent="selectView('Month')">Month</a>
      <a href="#" @click.prevent="selectView('Week')">Week</a>
      <a href="#" @click.prevent="selectView('Day')">Day</a>
    </div>
  </div>
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

.view-select {
  position: relative;
  text-align: right;
}

.view-select > a:first-child {
  color: hsl(160deg 100% 37% / 100%);
}

.view-select a {
  color: inherit;
}

.dropdown {
  position: absolute;
  right: 0;
  white-space: nowrap;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 0;
}

.dropdown a {
  display: block;
  padding: 5px 10px;
}

.dropdown a:hover {
  background-color: #f0f0f0;
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
