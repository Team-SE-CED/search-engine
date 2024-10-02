<template>
    <main>
        <form class="container" action="/" method="GET">
            <div class="position-relative">
                <!-- Search Icon -->
                <img class="search-icon" src="/assets/img/search-icon.png" />
                <div class="vertical-line"></div>

                <!-- Search Input -->
                <input class="form-control form-control-lg pl-5 search-input" type="text" name="search"
                    placeholder="Search..." autocomplete="off" v-model="searchQuery" @input="onSearchInput"
                    @focus="showSuggestions = true" />

                <!-- Search Suggestions Dropdown -->
                <ul v-if="hasSearchSuggestions" class="suggestions-list">
                    <li v-for="suggestion in filteredProducts.slice(0, 8)" :key="suggestion.id">
                        <img class="suggestion-search-icon" src="/assets/img/search-icon.png" />
                        {{ suggestion.title }}
                    </li>
                </ul>

                <!-- Filter Dropdown -->
                <div class="filter-dropdown dropdown">
                    <button class="btn dropdown-toggle" type="button" @click="toggleDropdown">
                        {{ selectedFilter ? selectedFilter.label : "Filters" }}
                    </button>
                    <ul class="dropdown-menu" :class="{ show: isOpen }">
                        <li v-for="filter in filters" :key="filter.value">
                            <a class="dropdown-item" href="#" @click.prevent="selectFilter(filter)">{{ filter.label
                                }}</a>
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
import type { PaperUI } from "~/types/research-paper-ui";
const { getResearchPaper } = usePaper();

// Declarations
const filters = ref<{ value: string; label: string }[]>([
    { value: "relevance", label: "Relevance" },
    { value: "date", label: "Date" },
    { value: "popularity", label: "Popularity" }
]);
const isOpen = ref(false);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const products = ref<PaperUI[]>([]);
const searchQuery = ref("");
const showSuggestions = ref<boolean>(false);

// Toggle dropdown
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

// Select filter
const selectFilter = (filter: { value: string; label: string }) => {
    selectedFilter.value = filter;
    isOpen.value = false;
};

// Fetch Papers
async function fetchPaper() {
    const paper = await getResearchPaper();
    products.value = paper;
}

// Filter Logic: Word-by-Word Detection
const filteredProducts = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    const queryWords = query.split(" ").filter(Boolean); // Split query by spaces and filter empty strings

    if (queryWords.length === 0) return []; // No query means no results

    // Filter results based on query words
    const results = products.value.filter((p) => {
        const title = p.title.toLowerCase();

        // Word-by-word: Each word in the query must be found in the title
        return queryWords.every((word) => title.includes(word));
    });

    // Limit to 8 results
    return results.slice(0, 8);
});

// On input search
const onSearchInput = () => {
    const query = searchQuery.value.trim();

    // If a space is typed, filter strictly for results that match
    if (query.endsWith(" ")) {
        const lastWord = query.split(" ").filter(Boolean).pop()?.toLowerCase();

        if (lastWord) {
            // Automatically remove results that do not have the last keyword
            const filtered = products.value.filter((p) => p.title.toLowerCase().includes(lastWord));

            if (filtered.length > 0) {
                products.value = filtered;
            }
        }
    }

    // Show suggestions again after filtering
    showSuggestions.value = true;
};

// Close Suggestions when clicking outside
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

const hasSearchSuggestions = computed(() => {
    return showSuggestions.value && filteredProducts.value.length > 0
})

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