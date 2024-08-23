<script setup>
import { ref } from 'vue';
import DeleteIcon from '../../assets/icons/delete.svg';
import StopIcon from '../../assets/icons/stop.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EditPopup from './EditPopup.vue'; // Import the new component

const showPopup = ref(false);

function togglePopup() {
  showPopup.value = !showPopup.value;
}

function handleConfirm() {
  // Handle the confirmation logic here
  console.log('Confirmed');
}
</script>

<template>
  <EditPopup v-model:show="showPopup" @confirm="handleConfirm" />
  <div class="flex space-x-1">
    <button
      class="rounded-full size-9 bg-white hover:bg-blue-400"
      type="button"
      @click="togglePopup"
    >
      <img
        :src="EditIcon"
        alt="Edit habit name"
        title="Edit habit name"
        class="size-6 mx-auto"
      />
    </button>
    <button
      class="rounded-full size-9 bg-white hover:bg-yellow-400"
      type="button"
    >
      <img
        :src="StopIcon"
        alt="Stop habit"
        title="Stop habit"
        class="size-6 mx-auto"
      />
    </button>
    <button class="rounded-full size-9 bg-white hover:bg-red-400" type="button">
      <img
        :src="DeleteIcon"
        alt="Delete habit"
        title="Delete habit"
        class="size-6 mx-auto"
      />
    </button>
  </div>
</template>
