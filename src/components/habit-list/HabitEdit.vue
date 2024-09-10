<script setup lang="ts">
import { ref } from 'vue';
import DeleteIcon from '../../assets/icons/delete.svg';
import StopIcon from '../../assets/icons/stop.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EditPopup from '../popups/EditPopup.vue';
import StopPopup from '../popups/StopPopup.vue';
import DeletePopup from '../popups/DeletePopup.vue';

const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-habit-name', 'stop-habit', 'delete-habit']);

const showEditPopup = ref(false);
const showStopPopup = ref(false);
const showDeletePopup = ref(false);

function handleConfirm(newName) {
  if (newName && newName !== props.habit.text) {
    emit('update-habit-name', props.habit.id, newName);
  }
  showEditPopup.value = false;
}

function handleStop() {
  emit('stop-habit', props.habit.id);
  showStopPopup.value = false;
}

function handleDelete() {
  emit('delete-habit', props.habit.id);
  showDeletePopup.value = false;
}
</script>

<template>
  <StopPopup v-model:show="showStopPopup" @confirm="handleStop" />
  <DeletePopup v-model:show="showDeletePopup" @confirm="handleDelete" />
  <EditPopup
    v-model:show="showEditPopup"
    :initial-value="habit.text"
    @confirm="handleConfirm"
  />

  <div class="flex space-x-1" role="group" aria-label="Habit actions">
    <button
      class="rounded-full size-9 bg-white hover:bg-blue-400"
      type="button"
      @click="showEditPopup = true"
      aria-label="Edit habit name"
    >
      <img :src="EditIcon" alt="" class="size-6 mx-auto" />
    </button>
    <button
      class="rounded-full size-9 bg-white hover:bg-yellow-400"
      type="button"
      @click="showStopPopup = true"
      aria-label="Stop habit"
    >
      <img :src="StopIcon" alt="" class="size-6 mx-auto" />
    </button>
    <button
      class="rounded-full size-9 bg-white hover:bg-red-400"
      type="button"
      @click="showDeletePopup = true"
      aria-label="Delete habit"
    >
      <img :src="DeleteIcon" alt="" class="size-6 mx-auto" />
    </button>
  </div>
</template>
