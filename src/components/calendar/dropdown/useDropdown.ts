import { ref } from 'vue';

const selected = ref('Week');
const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectView(view: string) {
  selected.value = view;
  showDropdown.value = false;
}

export default function useDropdown() {
  return {
    selected,
    showDropdown,
    toggleDropdown,
    selectView,
  };
}
