<template>
    <!-- search bar div -->
    <div class="fixed-search-bar">
        <form class="container" action="/search" method="GET">
            <div class="position-relative">
                <!-- Search Icon -->
                <img class="search-icon" src="/assets/img/search-icon.png" />
                <div class="vertical-line"></div>

                <!-- Search Input -->
                <input class="form-control form-control-lg pl-5 search-input" type="text" name="search"
                    placeholder="Search..." autocomplete="off" v-model="searchQuery" @input=""
                    @focus="showSuggestions = true" @keydown.enter="handleSubmit" />

                <!-- Search Suggestions Dropdown -->
                <ul v-if="searchQuery.length" class="suggestions-list">
                    <li v-for="suggestion in filteredSuggestions" :key="suggestion.id"
                        @click="redirectTo(suggestion.id)">
                        <img class="suggestion-search-icon" src="/assets/img/search-icon.png" />
                        {{ suggestion.title }}
                    </li>
                </ul>

                <!-- Filter Dropdown -->
                <div class="filter-dropdown dropdown">
                    <button class="btn dropdown-toggle" type="button">
                        <!-- {{ selectedFilter ? selectedFilter.label : "Filters" }} -->
                        {{ "Filters" }}
                    </button>
                    <ul class="dropdown-menu" :class="{ show: isOpen }">
                        <li v-for="filter in filters" :key="filter.value">
                            <a class="dropdown-item" href="#">{{ filter.label }}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Hidden input to include selected filter in form submission -->
            <input type="hidden" name="filter" :value="selectedFilter?.value" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PaperUI } from "~/types/research-paper-ui";
const { getResearchPaper } = usePaper()
const { filterPapers, filterLastKeyword } = usePaperFactory()
const { } = usePaperStores()
const router = useRouter();

// Declarations
const researchPaper = ref<PaperUI[]>([]);
const filters = ref<{ value: string; label: string }[]>([]);
const isOpen = ref(false);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const suggestions = ref<string[]>([]);

// Functions

// Search Engine Algorithm
const filteredSuggestions = computed((): PaperUI[] => {
    return filterPapers(researchPaper.value, searchQuery.value);
});

const filteredKeywords = () => {
    return filterLastKeyword(searchQuery.value, researchPaper.value, showSuggestions.value);
}
// Search Engine Algorithm

function redirectTo(id: number) {
    router.push(`/search-result/${id}`);
}

async function fetchPaper() {
    const paper = await getResearchPaper();
    researchPaper.value = paper;
}

function handleSubmit() {
    if (searchQuery.value.trim()) {
        router.push(`/search-result?search=${encodeURIComponent(searchQuery.value)}`);
    }
}

onMounted(() => {
    fetchPaper();
});
</script>

<style scoped>
.container-sm {
    margin-top: 2%;
    padding-left: 8%;
}

.img-card {
    width: 200px;
    margin: 10px;
    text-align: center;
    z-index: -2;
}

.img-poster {
    height: 300px;
    width: 200px;
    border-radius: 20px;
}

.img-title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.img-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 50px;
    padding: 20px;
    list-style: none;
}

/*Search Bar*/
.fixed-search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    /* Ensure it appears above other content */
    padding: 4px;
    /* Optional: padding for visual space */
}

.container {
    width: 40%;
    margin: auto;
}

.form-control {
    border-color: gray;
    border-radius: 50px;
    height: 40px;
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
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    pointer-events: none;
}

input.form-control {
    padding-left: 60px;
    padding-right: 150px;
}

.search-input:focus {
    outline: none;
    border-color: #b70536;
    box-shadow: 0 0 8px rgba(167, 44, 25, 0.931);
}

.vertical-line {
    position: absolute;
    right: 130px;
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    width: 1px;
    background-color: #484848;
}

/* Suggestions List Styles */
.suggestions-list {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid gray;
    border-radius: 50px;
    z-index: 10;
    /* max-height: 500px; */
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