<template>
  <!-- search bar div -->
  <div class="fixed-search-bar">
    <form class="container" action="/search" method="GET">
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
          @input=""
          @focus="showSuggestions = true"
        />

        <!-- Search Suggestions Dropdown -->
        <ul
          v-if="showSuggestions && suggestions.length"
          class="suggestions-list"
        >
          <li
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="selectSuggestion(suggestion)"
          >
            <img
              class="suggestion-search-icon"
              src="/assets/img/search-icon.png"
            />
            {{ suggestion }}
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
  <!-- search results div -->
  <div class="container-sm">
    <ul class="img-grid">
      <li
        class="img-card"
        v-for="researchPaper in research_papers"
        :key="researchPaper.id"
      >
        <img
          v-if="researchPaper.img_url"
          :src="researchPaper.img_url"
          alt="research_img"
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
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

import { supabase } from "~/server/db/supabaseClient";
import type { Paper } from "~/server/types/research-paper";

// Declare reactive variable to store the research papers

const { getResearchPaper } = usePaper();
const research_papers = ref<Paper[]>([]);
// Fetch data when the component is mounted
onMounted(() => {
  fetchPaper();
});

async function fetchPaper() {
  const paper = await getResearchPaper();
  research_papers.value = paper;
}
//search bar

const filters = ref<{ value: string; label: string }[]>([]);
const isOpen = ref(false);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const shouldShowSuggestions = ref<boolean>(false); // New state for keeping suggestions open
const suggestions = ref<string[]>([]);
const fetchSuggestions = async (query: string) => {
  if (query.trim().length === 0) {
    suggestions.value = [];
    return;
  }

  const { data, error } = await supabase
    .from("research_papers")
    .select("title")
    .ilike("title", `%${query}%`);

  if (error) {
    console.error("Error fetching suggestions:", error);
    suggestions.value = [];
  } else {
    const queryLower = query.toLowerCase().trim();
    const rankedSuggestions = data
      .map((paper: { title: string }) => {
        const titleLower = paper.title.toLowerCase().trim();
        let score = 0;

        if (titleLower === queryLower) {
          score += 100;
        } else {
          if (titleLower.startsWith(queryLower)) {
            score += 80;
          }

          const words = titleLower.split(/\s+/);
          if (words[0] === queryLower) {
            score += 70;
          }

          if (titleLower.includes(queryLower)) {
            score += 50;
          }

          const indexOfQuery = titleLower.indexOf(queryLower);
          if (indexOfQuery !== -1) {
            score += 30 / (indexOfQuery + 1);
          }

          if (
            titleLower.split(/\s+/).some((word) => word.includes(queryLower))
          ) {
            score += 20;
          }

          score += 10 / titleLower.length;
        }

        return { title: paper.title, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    suggestions.value = rankedSuggestions.map((s) => s.title);
  }

  shouldShowSuggestions.value = true;
};
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
  z-index: 1000; /* Ensure it appears above other content */
  padding: 4px; /* Optional: padding for visual space */
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
