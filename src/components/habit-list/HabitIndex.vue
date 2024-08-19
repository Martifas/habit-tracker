<script setup>
import { ref } from 'vue';
import NewHabitElement from './NewHabitElement.vue';

const id = ref(0);
const newTodo = ref('');
const habits = ref([]);
function addTodo() {
  habits.value.push({ id: id.value + 1, text: newTodo.value });
  newTodo.value = '';
}
function removeTodo(todo) {
  habits.value = habits.value.filter(t => t !== todo);
}
</script>
<template>
  <div class="flex flex-col">
    <div class="px-4 flex-grow overflow-y-auto pb-20">
      <ul class="min-h-0">
        <li
          v-for="todo in habits"
          :key="todo.id"
          class="bg-indigo-300 w-full rounded-lg px-3 py-4 mb-3 justify-between border-black flex flex-row"
        >
          <div class="m-2 font-bold">{{ todo.text }}</div>
          <button
            class="bg-white rounded border-2 border-black m-1 p-1"
            type="button"
            @click="removeTodo(todo)"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
    <div class="fixed bottom-0 left-0 right-0 p-3">
      <form class="flex flex-col items-center" @submit.prevent="addTodo">
        <input
          v-model="newTodo"
          class="text-center border border-gray-300 p-2 w-full mb-4"
          required
          placeholder="New Habit"
        />
        <NewHabitElement />
      </form>
    </div>
  </div>
</template>
