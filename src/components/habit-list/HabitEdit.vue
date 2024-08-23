<script setup>
import { ref } from 'vue';
import DeleteIcon from '../../assets/icons/delete.svg';
import StopIcon from '../../assets/icons/stop.svg';
import EditIcon from '../../assets/icons/edit.svg';

const showPopup = ref(false);
function togglePopup() {
  showPopup.value = !showPopup.value;
}
</script>
<template>
  <div class="absolute bottom-3 right-3 w-44" v-if="showPopup">
    <div
      class="popup bg-blue-400 border border-stone-400 p-2 rounded shadow-md"
    >
      <input type="text" id="nameChange" class="border border-stone-700 w-40" />
      <label for="nameChange" />
      <div class="flex justify-around">
        <button
          type="button"
          @click="togglePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-blue-700 border border-stone-700 mt-1"
        >
          Confirm
        </button>
        <button
          type="button"
          @click="togglePopup"
          class="bg-white text-black p-0.5 rounded-lg hover:bg-blue-700 border border-stone-700 mt-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
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
