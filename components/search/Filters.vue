<template>
    <div class="filter-dropdown dropdown">
        <button class="btn dropdown-toggle" type="button" @click="toggleFilterDropdown">
            {{ filterLabel }}
        </button>
        <ul class="dropdown-menu" :class="{ show: isOpen }">
            <li class="date-slider-container">
                <div class="title">PUBLISHING YEAR</div>
                <div class="slider">
                    <input type="range" v-model="dateRange[0]" min="1900" max="2099" @input="updateDateRange" />
                    <input type="range" v-model="dateRange[1]" min="1900" max="2099" @input="updateDateRange" />
                    <div class="slider-track"></div>
                    <div class="slider-range" :style="sliderRangeStyle"></div>
                </div>
                <div class="slider-values">
                    <span>{{ dateRange[0] }}</span> <span>{{ dateRange[1] }}</span>
                </div>
            </li>
            <li class="department-container">
                <div class="title">DEPARTMENT</div>
                <div v-for="dept in departments" :key="dept" class="department-item">
                    <input type="checkbox" :id="dept" v-model="selectedDepartments" :value="dept" @change="emitSelectedDepartments" />
                    <label :for="dept">{{ dept }}</label>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const emit = defineEmits([
  "selectedFilter",
  "filterDropdownState",
  "selectedYear",
  "selectedDepartment",
]);
const props = defineProps({
  filterDropdownState: Boolean,
});

const isOpen = ref(false);
const dateRange = ref<[number, number]>([1900, 2099]);
const departments = ref(["Architecture", "Civil Engineering", "Computer Engineering", "Electrical Engineering", "Mechanical Engineering"]); // Add your departments here
const selectedDepartments = ref<string[]>([]);

const filterLabel = computed(() => "Filters");

function toggleFilterDropdown() {
    isOpen.value = !isOpen.value;
}

function updateDateRange() {
    if (dateRange.value[0] > dateRange.value[1]) {
        const temp = dateRange.value[0];
        dateRange.value[0] = dateRange.value[1];
        dateRange.value[1] = temp;
    }
    emit("selectedYear", dateRange.value);
}

function emitSelectedDepartments() {
  emit("selectedDepartment", selectedDepartments.value);
}

const sliderRangeStyle = computed(() => {
    const minPercent = ((dateRange.value[0] - 1900) / 199) * 100;
    const maxPercent = ((dateRange.value[1] - 1900) / 199) * 100;
    return { left: `${minPercent}%`, right: `${100 - maxPercent}%` };
});
</script>

<style scoped>
.filter-dropdown {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
}

.dropdown-menu {
  padding: 10px 10px;
  font-size: 16px;
  width: 300px;
  cursor: pointer;
}
.filter-arrowdown-icon {
  /* position: absolute; */
  /* left: 20px; */
  top: 50%;
  /* transform: translateY(-50%); */
  height: 1.5rem;
  pointer-events: none;
}

.date-slider-container,
.department-container {
  padding: 15px;
}

.title {
  font-weight: 500;
  font-family: Segoe UI;
  font-size: 16px;
  margin-bottom: 10px;
}

.slider {
  position: relative;
  width: 100%;
  height: 8px;
  margin-top: 20px;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: transparent;
  position: absolute;
  pointer-events: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #ac243a;
  border-radius: 50%;
  pointer-events: auto;
  position: relative;
  z-index: 2;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background: #cacaca;
  transform: translateY(-50%);
  z-index: 1;
}

.slider-range {
  position: absolute;
  top: 50%;
  height: 2px;
  background: #ac243a;
  z-index: 1;
  transform: translateY(-50%);
}

.slider-values {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
}

.department-container {
  display: flex;
  flex-direction: column;
}

.department-container .department-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.department-container input[type="checkbox"] {
  margin-right: 10px;
}

.department-container label {
  cursor: pointer;
  font-size: 15px;
}
</style>
