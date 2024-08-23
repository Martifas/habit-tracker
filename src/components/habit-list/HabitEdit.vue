<script setup>
import DeleteIcon from '../../assets/icons/delete.svg';
import StopIcon from '../../assets/icons/stop.svg';
import EditIcon from '../../assets/icons/edit.svg';
</script>

<template>
  <div class="flex space-x-1">
    <button
      class="rounded-full size-9 bg-white hover:bg-blue-400"
      type="button"
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
