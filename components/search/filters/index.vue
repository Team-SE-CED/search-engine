<template>
    <div class="filter-dropdown dropdown">
        <button class="btn dropdown-toggle" type="button" @click="toggleFilterDropdown">
            {{ selectedFilter ? selectedFilter.label : "Filters" }}
        </button>
        <ul class="dropdown-menu" :class="{ show: isOpen }">
            <li v-for="filters in filter" :key="filters.value">
                <span class="dropdown-item">{{ filters.value }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { filters } from '~/enums/filters';
import type { Filters } from '~/server/types/filters';


// Declarations
const filter = ref<Filters[]>(filters);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const isOpen = ref(false);

// Functions
const toggleFilterDropdown = () => {
    isOpen.value = !isOpen.value;
};
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
}
</style>