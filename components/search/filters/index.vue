<template>
    <div class="filter-dropdown dropdown">
        <button class="btn dropdown-toggle" type="button" @click="toggleFilterDropdown">
            {{ selectedFilter ? selectedFilter.label : "Filters" }}
        </button>
        <ul class="dropdown-menu" :class="{ show: isOpen }">
            <li v-for="filterItem in filter" :key="filterItem.value" @click="selectFilter(filterItem)">
                <span class="dropdown-item">{{ filterItem.label }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { filters } from '~/enums/filters';
import type { Filters } from '~/server/types/filters';
import { ref, watch } from 'vue';

const emit = defineEmits(["selectedFilter", "filterDropdownState", "selectedYear", "selectedDepartment"]);
const props = defineProps({
    filterDropdownState: Boolean
});

// Declarations
const filter = ref<Filters[]>(filters);
const selectedFilter = ref<Filters | null>(null);
const isOpen = ref(false);
const selectedYear = ref<number>()

// Functions
function toggleFilterDropdown() {
    isOpen.value = !isOpen.value;
};

function selectFilter(filterItem: Filters) {
    toggleFilterDropdown();

    if (filterItem.value === "None") {
        emit("selectedFilter", "title");
        selectedFilter.value = null;
        return;
    }
    if (filterItem.value === "Date") {
        emit("selectedYear", "2023");
    }
    if (filterItem.value === "Department") {
        emit("selectedDepartment", "Computer Engineering");
    }

    selectedFilter.value = filterItem;
    emit("selectedFilter", selectedFilter.value.value);
}

watch(() => props.filterDropdownState,
    (newValue) => {
        isOpen.value = newValue;
    });

watch(() => isOpen.value,
    (newValue) => {
        emit("filterDropdownState", newValue);
    });
</script>


<style scoped>
.filter-dropdown {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
}

.dropdown-menu {
    padding: 10px 0;
    font-size: 16px;
    cursor: pointer;
}
</style>