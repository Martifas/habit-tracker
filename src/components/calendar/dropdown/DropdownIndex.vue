<script setup lang="ts">
import { ref } from 'vue';
import useDropdown from './useDropdown';

const { selected, showDropdown, toggleDropdown, selectView } = useDropdown();
const dropdownId = ref('view-select-dropdown');
</script>

<template>
  <div class="view-select relative z-50 text-right">
    <button
      type="button"
      @click="toggleDropdown"
      :aria-expanded="showDropdown"
      :aria-controls="dropdownId"
      class="text-primary-green border-solid border-2 border-green-300 rounded-md p-1 hover:text-green-800 hover:border-green-800"
    >
      ▼ Select View: {{ selected }}
    </button>
    <div
      v-if="showDropdown"
      :id="dropdownId"
      class="absolute right-0 border border-green-800"
      role="menu"
      aria-label="View options"
    >
      <button
        type="button"
        @click="selectView('Month')"
        class="hover:bg-stone-200 block bg-white px-2 text-center w-full text-left"
        role="menuitem"
      >
        Month
      </button>
      <button
        type="button"
        @click="selectView('Week')"
        class="hover:bg-stone-200 block bg-white px-2 text-center w-full text-left"
        role="menuitem"
      >
        Week
      </button>
    </div>
  </div>
</template>

<style scoped>
.view-select {
  position: relative;
  background-color: #f8faed;
}
.text-primary-green {
  color: hsl(160deg 100% 37% / 100%);
}
</style>
