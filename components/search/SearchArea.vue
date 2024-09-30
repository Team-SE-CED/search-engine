<template>
  <div class="body">
    <form class="container" action="/" method="GET">
      <div class="position-relative">
        <!-- Search Icon -->
        <img class="search-icon" src="/assets/img/search-icon.png" />
        <div class="vertical-line"></div>

        <!-- Search Input -->
        <input
          class="form-control form-control-lg pl-5 search-input"
          type="text"
          name="search"
          placeholder="Search..."
          autocomplete="off"
          v-model="searchQuery"
          @focus="showSuggestions = true"
        />

        <!-- Search Suggestions Dropdown -->
        <ul v-if="shouldDisplaySuggestions()" class="suggestions-list">
          <li
            v-for="suggestion in researchPaper"
            :key="suggestion.id"
            @click="selectSuggestion(suggestion)"
          >
            <img
              class="suggestion-search-icon"
              src="/assets/img/search-icon.png"
            />
            {{ suggestion.title }}
          </li>
        </ul>

        <!-- Filter Dropdown -->
        <div class="filter-dropdown dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            @click="toggleDropdown"
          >
            <!-- {{ selectedFilter ? selectedFilter.label : "Filters" }} -->
            {{ "Filters" }}
          </button>
          <ul class="dropdown-menu" :class="{ show: isOpen }">
            <li
              v-for="filter in filters"
              :key="filter.value"
              @click="selectFilter(filter)"
            >
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
import "../assets/global_style1/bootstrap.min.css";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import debounce from "lodash/debounce";
import { Paper } from "~/server/types/research-paper";

const { getResearchPaper, getFilteredResearchPaper } = usePaper();
const filters = ref<{ value: string; label: string }[]>([]);
const isOpen = ref(false);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const shouldShowSuggestions = ref<boolean>(false); // New state for keeping suggestions open
const suggestions = ref<string[]>([]);

const researchPaper = ref<Paper[]>([]);
// Close dropdown, but keep suggestions open if search query exists
const handleClickOutside = (event: MouseEvent) => {
  const dropdownElement = document.querySelector(".dropdown");
  const suggestionsElement = document.querySelector(".suggestions-list");
  const searchInput = document.querySelector(".search-input");

  // Close dropdown when clicking outside
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    isOpen.value = false;
  }

  // Keep suggestions open if there's a query
  if (
    suggestionsElement &&
    !suggestionsElement.contains(event.target as Node) &&
    searchInput &&
    !searchInput.contains(event.target as Node)
  ) {
    if (searchQuery.value.trim().length === 0) {
      shouldShowSuggestions.value = false; // Close suggestions only if search query is empty
    }
  }
};

onMounted(() => {
  fetchPaper();
  fetchFilters(); // Fetch filters from backend or API
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

async function fetchPaper() {
  const paper = await getResearchPaper();
  const filteredPaper = await getFilteredResearchPaper();
  researchPaper.value = filteredPaper as Paper[];
  console.log("ninjas" + JSON.stringify(researchPaper.value[0].title));
}

function getResearchTitleSuggestions() {
  console.log(searchQuery);
}
// Mock fetching filter categories (replace this with real API)
const fetchFilters = async () => {
  filters.value = [
    { value: "architecture", label: "Architecture" },
    { value: "civil", label: "Civil" },
    { value: "computer", label: "Computer" },
    { value: "mechanical", label: "Mechanical" },
    { value: "electrical", label: "Electrical" },
  ];
};

function shouldDisplaySuggestions() {
  console.log("Hello: " + searchQuery.value);
  searchQuerySuggestions();

  return showSuggestions && searchQuery.value.length;
}

// Update suggestions dynamically as the user types
function searchQuerySuggestions() {
  // If the search query is too short, reset suggestions
  if (searchQuery.value.length) {
    suggestions.value = [];
    shouldShowSuggestions.value = false;
    return;
  }

  // Perform a case-insensitive search based on the query
  const lowerCaseQuery = searchQuery.value.toLowerCase();

  // Filter research papers based on the search query
  const filteredPapers = researchPaper.value.filter((paper) =>
    paper.title.toLowerCase().includes(lowerCaseQuery)
  );

  // Sort or rank the results (e.g., alphabetically for now)
  const rankedSuggestions = filteredPapers.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Update the suggestions list with the filtered paper titles
  suggestions.value = rankedSuggestions.map((paper) => paper.title);

  // Show suggestions when query length is valid and suggestions are available
  shouldShowSuggestions.value = suggestions.value.length > 0;
}

// Watch the searchQuery input and trigger the function whenever it changes
watch(searchQuery, (newValue) => {
  searchQuerySuggestions(); // Trigger the search suggestions function immediately on change
});
</script>

<style scoped>
/* For Main Search Bar @searchArea.vue */
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
