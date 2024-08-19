<script setup>
import useDropdown from './useDropdown';

const { selected, showDropdown, toggleDropdown, selectView } = useDropdown();
</script>
<template>
  <div class="view-select bg-white">
    <a href="#" @click.prevent="toggleDropdown">Select View: {{ selected }}</a>
    <div v-if="showDropdown" class="dropdown">
      <a href="#" @click.prevent="selectView('Month')">Month</a>
      <a href="#" @click.prevent="selectView('Week')">Week</a>
    </div>
  </div>
</template>
<style scoped>
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
</style>
