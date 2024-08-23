<script setup>
import { ref } from 'vue';
import DeleteIcon from '../../assets/icons/delete.svg';
import StopIcon from '../../assets/icons/stop.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EditPopup from './EditPopup.vue';

const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-habit-name']);

const showPopup = ref(false);

function togglePopup() {
  showPopup.value = !showPopup.value;
}

function handleConfirm(newName) {
  if (newName && newName !== props.habit.text) {
    emit('update-habit-name', props.habit.id, newName);
  }
  showPopup.value = false;
}
</script>

<template>
  <EditPopup
    v-model:show="showPopup"
    :initial-value="habit.text"
    @confirm="handleConfirm"
  />
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
