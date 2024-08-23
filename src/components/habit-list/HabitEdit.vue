<script setup>
import { ref } from 'vue';
import DeleteIcon from '../../assets/icons/delete.svg';
import StopIcon from '../../assets/icons/stop.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EditPopup from './popups/EditPopup.vue';
import StopPopup from './popups/StopPopup.vue';
import DeletePopup from './popups/DeletePopup.vue';

const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-habit-name']);

const showEditPopup = ref(false);
const showStopPopup = ref(false);
const showDeletePopup = ref(false);

function handleConfirm(newName) {
  if (newName && newName !== props.habit.text) {
    emit('update-habit-name', props.habit.id, newName);
  }
  showEditPopup.value = false;
}
</script>

<template>
  <StopPopup v-model:show="showStopPopup" />
  <DeletePopup v-model:show="showDeletePopup" />
  <EditPopup
    v-model:show="showEditPopup"
    :initial-value="habit.text"
    @confirm="handleConfirm"
  />
  <div class="flex space-x-1">
    <button
      class="rounded-full size-9 bg-white hover:bg-blue-400"
      type="button"
      @click="showEditPopup = true"
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
      @click="showStopPopup = true"
    >
      <img
        :src="StopIcon"
        alt="Stop habit"
        title="Stop habit"
        class="size-6 mx-auto"
      />
    </button>
    <button
      class="rounded-full size-9 bg-white hover:bg-red-400"
      type="button"
      @click="showDeletePopup = true"
    >
      <img
        :src="DeleteIcon"
        alt="Delete habit"
        title="Delete habit"
        class="size-6 mx-auto"
      />
    </button>
  </div>
</template>
