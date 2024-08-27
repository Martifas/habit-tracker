<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import HabitIndex from './components/habit-list/HabitIndex.vue';
import ErrorPopup from './components/popups/ErrorPopup.vue';

const route = useRoute();
const errorMessage = ref('');

watch(
  () => route.query.error,
  newError => {
    if (newError === 'invalid') {
      errorMessage.value = 'Invalid date entered. Redirected to today.';
    } else if (newError === 'future') {
      errorMessage.value = 'Future date entered. Redirected to today.';
    } else {
      errorMessage.value = '';
    }
  },
);
</script>

<template>
  <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
    <ErrorPopup v-if="errorMessage" :message="errorMessage" />
    <div>
      <header class="sticky top-0 z-40">
        <RouterView class="pb-3" />
      </header>
      <main>
        <HabitIndex />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sticky {
  background-color: #f8faed;
}
</style>
