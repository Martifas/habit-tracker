<script setup>
import { ref, computed } from 'vue';

const centerDate = ref(new Date());

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
</script>

<template>
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
</template>

<style scoped>
.week-view {
  display: flex;
  gap: 10px;
}
.center {
  font-weight: bold;
  border: 2px solid blue;
}
</style>
