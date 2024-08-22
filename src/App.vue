<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HabitIndex from './components/habit-list/HabitIndex.vue';
</script>

<template>
  <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
    <header>
      <nav class="p-4">
        <RouterLink to="/"> Home </RouterLink>
      </nav>
    </header>
    <div>
      <div class="sticky top-0">
        <RouterView />
      </div>
      <div>
        <HabitIndex />
      </div>
    </div>
  </div>
</template>
