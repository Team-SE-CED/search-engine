<template>
    <main>
        <form class="container" @submit.prevent="handleSubmit">
            <div class="position-relative">
                <!-- Search Icon -->
                <img class="search-icon" src="/assets/img/search-icon.png" />
                <div class="vertical-line"></div>

                <!-- Search Input -->
                <input class="form-control form-control-lg pl-5 search-input" type="text" name="search"
                    placeholder="Search..." autocomplete="off" v-model="searchQuery" @input="filteredKeywords"
                    @focus="showSuggestions = true" @keydown.enter="handleSubmit" />

                <!-- Search Suggestions Dropdown -->
                <ul v-if="hasSearchSuggestions" class="suggestions-list">
                    <li v-for="suggestion in filteredProducts.slice(0, 8)" :key="suggestion.id"
                        @click="redirectTo(suggestion.id)">
                        <img class="suggestion-search-icon" src="/assets/img/search-icon.png" />
                        {{ suggestion.title }}
                    </li>
                </ul>

                <!-- Filter Dropdown -->
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
            </div>

            <!-- Hidden input to include selected filter in form submission -->
            <input type="hidden" name="filter" :value="selectedFilter?.value" />
        </form>
    </main>
</template>

<script setup lang="ts">
import "../assets/global_style1/bootstrap.min.css";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { filters } from "~/enums/filters";
import type { Filters } from "~/server/types/filters";
import type { PaperUI } from "~/types/research-paper-ui"
const { getResearchPaper } = usePaper();
const { filterPapers, filterLastKeyword } = usePaperFactory()
const router = useRouter();

// Declarations
const filter = ref<Filters[]>(filters);
const isOpen = ref(false);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const researchPaper = ref<PaperUI[]>([]);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);

// Functions
const toggleFilterDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectFilter = (filter: { value: string; label: string }) => {
    selectedFilter.value = filter;
    isOpen.value = false;
};

async function fetchPaper() {
    const fetchedPaper = await getResearchPaper();
    researchPaper.value = fetchedPaper;
}

const filteredProducts = computed((): PaperUI[] => {
    return filterPapers(researchPaper.value, searchQuery.value);
});

const filteredKeywords = () => {
    return filterLastKeyword(searchQuery.value, researchPaper.value, showSuggestions.value);
}

const handleClickOutside = (event: MouseEvent) => {
    const searchInput = document.querySelector(".search-input");
    const suggestionsElement = document.querySelector(".suggestions-list");

    if (
        searchInput &&
        !searchInput.contains(event.target as Node) &&
        suggestionsElement &&
        !suggestionsElement.contains(event.target as Node)
    ) {
        showSuggestions.value = false;
    }
};

function redirectTo(id: number) {
    router.push(`/search-result/${id}`);
}

function handleSubmit() {
    if (searchQuery.value.trim()) {
        router.push(`/search-result?search=${encodeURIComponent(searchQuery.value)}`);
    }
}

const hasSearchSuggestions = computed(() => {
    return showSuggestions.value && filteredProducts.value.length > 0;
});

onMounted(() => {
    fetchPaper().catch((error) => console.error(error));
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.container {
    width: 60%;
}

.form-control {
    border-color: gray;
    border-radius: 50px;
    height: 80px;
}

.filter-dropdown {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
}

button.dropdown-toggle:focus {
    border: none;
}

.dropdown-menu {
    padding: 10px 0;
    font-size: 16px;
}

button.dropdown-toggle {
    font-size: 20px;
}

.search-icon {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    height: 50px;
    pointer-events: none;
}

input.form-control {
    padding-left: 100px;
    padding-right: 150px;
}

.vertical-line {
    position: absolute;
    right: 130px;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 1px;
    background-color: #484848;
}

/* Suggestions List Styles */
.suggestions-list {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid gray;
    border-radius: 50px;
    z-index: 10;
    overflow-y: auto;
    list-style: none;
    padding-top: 10px;
    padding-left: 0;
    padding-bottom: 10px;
    margin-top: 20px;
}

.suggestions-list li {
    padding: 10px 30px;
    cursor: pointer;
}

.suggestion-search-icon {
    position: relative;
    height: 50px;
    padding-right: 15px;
}

.suggestions-list li:hover {
    background-color: #f0f0f0;
}
</style>