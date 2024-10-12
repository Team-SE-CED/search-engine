<template>
    <main>
        <form class="container" @submit.prevent="handleSubmit">
            <div class="position-relative">
                <!-- Search Icon -->
                <img class="search-icon" src="~/assets/static-images/search-eye.png" />
                <div class="vertical-line"></div>

                <SearchInput class="form-control form-control-lg pl-5 search-input" v-model="searchQuery"
                    @input="filteredKeywords" @focus="showSuggestions = true" @enter="handleSubmit" />

                <!-- Search Suggestions Dropdown -->
                <ul v-if="hasSearchSuggestions" class="suggestions-list">
                    <li v-for="suggestion in filteredPapers.slice(0, 8)" :key="suggestion.id"
                        @click="redirectTo(suggestion.id)">
                        <img class="suggestion-search-icon" src="/assets/img/search-icon.png" />
                        {{ selectedSuggestion(suggestion) }}
                    </li>
                </ul>

                <!-- Filter Dropdown -->
                <SearchFilters class="search-filters" :filterDropdownState="isOpen"
                    @selectedFilter="handleSelectedFilter" @filterDropdownState="handleFilterDropdownState"
                    @selectedYear="handleSelectedYear" @selectedDepartment="handleSelectedDepartment" />

            </div>

            <!-- Hidden input to include selected filter in form submission -->
            <input type="hidden" name="filter" :value="selectedFilter?.value" />
        </form>
    </main>
</template>

<script setup lang="ts">
import "../bootstrap/global_style1/bootstrap.min.css";
import type { PaperUI } from "~/types/research-paper-ui"
const { getResearchPaper } = usePaper();
const { filterPapersFactory, filterLastKeyword } = usePaperFactory()
const { setSuggestedPaperStore } = usePaperStores();
const router = useRouter();

// Declarations
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const researchPaper = ref<PaperUI[]>([]);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const test = ref<string>("title")
const isOpen = ref<boolean>(false)
const selectedYear = ref<string>()
const selectedDepartment = ref<string>()

// Functions
async function fetchPaper() {
    const fetchedPaper = await getResearchPaper();
    researchPaper.value = fetchedPaper;
}

// Search Engine Algorithm
const filteredPapers = computed((): PaperUI[] => {
    return filterPapersFactory(researchPaper.value, searchQuery.value, test.value, selectedYear.value, selectedDepartment.value);
});

const filteredKeywords = () => {
    return filterLastKeyword(
        searchQuery.value,
        researchPaper.value,
        showSuggestions.value
    );
};
// Search Engine Algorithm

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

const handleClickOutsideFilter = (event: MouseEvent) => {
    const filtersElement = document.querySelector(".search-filters"); // Assuming you add a class to your SearchFilters component

    if (
        isOpen.value &&
        filtersElement &&
        !filtersElement.contains(event.target as Node)
    ) {
        isOpen.value = false; // or any other logic to close your filters
    }
};

function handleFilterDropdownState(isOpenValue: boolean) {
    isOpen.value = isOpenValue
}

function handleSelectedYear(selectedYearValue: string) {
    selectedYear.value = selectedYearValue
}

function handleSelectedDepartment(selectedDepartmentValue: string) {
    selectedDepartment.value = selectedDepartmentValue
}

function handleSelectedFilter(selectedFilter: string) {
    test.value = selectedFilter
}

function redirectTo(id: number) {
    router.push(`/result/${id}`);
}

function handleSubmit() {
    setSuggestedPaperStore(filteredPapers.value)
    if (searchQuery.value.trim()) {
        router.push(`/result?search=${encodeURIComponent(searchQuery.value)}`);
    }
}

function selectedSuggestion(suggestion: PaperUI) {
    if (test.value === "title") return suggestion.title
    if (test.value === "Author") return suggestion.author
    if (test.value === "Date") return suggestion.title
    if (test.value === "Department") return suggestion.title

    return "No Display"
}

const hasSearchSuggestions = computed(() => {
    return showSuggestions.value && filteredPapers.value.length > 0;
});

onMounted(() => {
    fetchPaper().catch((error) => console.error(error));
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickOutsideFilter);
    test.value = "title"
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("click", handleClickOutsideFilter);
});
</script>

<style scoped>
.container {
    width: 60vw;
}

.form-control {
    border-color: gray;
    border-radius: 50vh;
    height: 10vh;
}

button.dropdown-toggle:focus {
    border: none;
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
    text-align: left;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid gray;
    border-radius: 50px;
    overflow: hidden;
    list-style: none;
    padding-top: 10px;
    padding-left: 0;
    padding-bottom: 10px;
    margin-top: 20px;
}

.suggestions-list li {
    padding: 10px 30px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
