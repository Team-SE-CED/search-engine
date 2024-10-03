<template>
  <!-- search bar div -->
  <div class="fixed-search-bar">
    <form class="container" action="/search" @submit.prevent="handleSearch">
      <div class="position-relative">
        <!-- Search Icon -->
        <img
          class="search-icon"
          src="/assets/img/search-icon.png"
          alt="Search"
        />
        <!-- <div class="vertical-line"></div> -->

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
        <ul
          v-if="showSuggestions && filteredSuggestions.length > 0"
          class="suggestions-list"
        >
          <li
            v-for="suggestion in filteredSuggestions"
            :key="suggestion.id"
            @click="selectSuggestion(suggestion)"
          >
            <img
              class="suggestion-search-icon"
              src="/assets/img/search-icon.png"
              alt="Search"
            />
            {{ suggestion.title }}
          </li>
        </ul>
      </div>
    </form>
  </div>

  <!-- search results div -->
  <div v-if="hasSearched" class="container-sm">
    <div v-if="searchResults.length === 0" class="no-results">
      No results found.
    </div>
    <ul v-else class="img-grid">
      <li
        class="img-card"
        v-for="researchPaper in searchResults"
        :key="researchPaper.id"
      >
        <img
          v-if="researchPaper.imgUrl"
          :src="researchPaper.imgUrl"
          :alt="researchPaper.title"
          class="img-poster"
        />
        <img
          v-else
          src="https://via.placeholder.com/200x300?text=research"
          alt="sample poster"
          class="img-poster"
        />
        <div class="img-title">{{ researchPaper.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import "../assets/global_style1/bootstrap.min.css";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import type { PaperUI } from "~/types/research-paper-ui";

const { getResearchPaper } = usePaper();

// Declarations
const researchPapers = ref<PaperUI[]>([]);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const searchResults = ref<PaperUI[]>([]);
const hasSearched = ref<boolean>(false);

// Functions
async function fetchPaper() {
  const papers = await getResearchPaper();
  researchPapers.value = papers;
}

const filteredSuggestions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return [];

  return researchPapers.value
    .filter((p) => p.title.toLowerCase().includes(query))
    .slice(0, 8);
});

const selectSuggestion = (suggestion: PaperUI) => {
  searchQuery.value = suggestion.title;
  showSuggestions.value = false;
  handleSearch();
};

const handleSearch = () => {
  const query = searchQuery.value.trim().toLowerCase();

  searchResults.value = researchPapers.value.filter((paper) => {
    return paper.title.toLowerCase().includes(query);
  });

  hasSearched.value = true;
  showSuggestions.value = false;
};

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

onMounted(() => {
  fetchPaper().catch((error) => console.error(error));
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.container-sm {
  margin-top: 2%;
  padding-left: 8%;
}

.no-results {
  padding: 35vh;
  font-size: 60px;
  color: #666;
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
  padding-right: 60px;
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
