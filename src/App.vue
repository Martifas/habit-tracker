<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HabitIndex from './components/habit-list/HabitIndex.vue';
</script>

<template>
  <div>
    <header>
      <nav class="p-4">
        <RouterLink to="/"> Home </RouterLink>
      </nav>
    </header>
    <div>
      <div>
        <RouterView />
      </div>
      <div>
        <HabitIndex />
      </div>
    </div>
  </div>
</template>
