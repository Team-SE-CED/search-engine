<template>
  <main>
    <div class="fixed-search-bar">
      <form class="container" @submit.prevent="handleSubmit()">
        <div class="position-relative">
          <!-- Search Icon -->
          <img
            class="search-icon"
            src="~/assets/static-images/search-eye.png"
          />
          <div class="vertical-line"></div>

          <SearchInput
            class="form-control form-control-lg pl-5 search-input"
            v-model="searchQuery"
            @input="filteredKeywords"
            @focus="showSuggestions = true"
            @enter="handleSubmit"
          />

          <!-- Search Suggestions Dropdown -->
          <SearchSuggestions
            :suggestions="filteredPapers"
            :suggestionsClass="'suggestions-list'"
            :searchField="selectedSearchField"
            :showSuggestions="showSuggestions"
            @suggestion-click="redirectTo"
          />

          <!-- Filter Dropdown -->
          <SearchFilters
            class="search-filters"
            :filterDropdownState="isOpen"
            @selectedFilter="handleSelectedFilter"
            @filterDropdownState="handleFilterDropdownState"
            @selectedYear="handleSelectedYear"
            @selectedDepartment="handleSelectedDepartment"
          />
        </div>

        <!-- Hidden input to include selected filter in form submission -->
        <input type="hidden" name="filter" :value="selectedFilter?.value" />
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PaperUI } from "~/types/research-paper-ui";
const { getResearchPaper } = usePaper();
const { filterPapersFactory, filterLastKeyword } = usePaperFactory();
const { setSuggestedPaperStore } = usePaperStores();
const router = useRouter();

// Declarations
const researchPaper = ref<PaperUI[]>([]);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const selectedSearchField = ref<string>("title");
const isOpen = ref<boolean>(false);
const selectedYear = ref<string>();
const selectedDepartment = ref<string>();

// Functions

// Search Engine Algorithm
const filteredPapers = computed((): PaperUI[] => {
  return filterPapersFactory(
    researchPaper.value,
    searchQuery.value,
    selectedSearchField.value,
    selectedYear.value,
    selectedDepartment.value
  );
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

const hasSearchSuggestions = computed(() => {
  if (searchQuery.value === " ") return false;
  return searchQuery.value.length && showSuggestions.value;
});

function redirectTo(id: number) {
  router.push(`/result/${id}`);
}

function selectedSuggestion(suggestion: PaperUI) {
  if (selectedSearchField.value === "title") return suggestion.title;
  if (selectedSearchField.value === "Author") return suggestion.author;
  if (selectedSearchField.value === "Date") return suggestion.title;
  if (selectedSearchField.value === "Department") return suggestion.title;

  return "No Display";
}

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
  isOpen.value = isOpenValue;
}

function handleSelectedYear(selectedYearValue: string) {
  selectedYear.value = selectedYearValue;
}

function handleSelectedDepartment(selectedDepartmentValue: string) {
  selectedDepartment.value = selectedDepartmentValue;
}

function handleSelectedFilter(selectedFilter: string) {
  selectedSearchField.value = selectedFilter;
}

async function fetchPaper() {
  const paper = await getResearchPaper();
  researchPaper.value = paper;
}

function handleSubmit() {
  showSuggestions.value = false;

  if (searchQuery.value) {
    setSuggestedPaperStore(filteredPapers.value);
  }

  const queryParams: any = {
    search: searchQuery.value.trim(),
  };

  if (selectedFilter.value) {
    queryParams.filter = selectedFilter.value;
  }

  router.push({
    path: "/result",
    query: queryParams,
  });
}

// Shows suggestion-list if hasSuggestions
watch(
  () => searchQuery.value,
  (newValue) => {
    if (newValue) showSuggestions.value = true;
  }
);

onMounted(() => {
  fetchPaper().catch((error) => console.error(error));
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("click", handleClickOutsideFilter);
  selectedSearchField.value = "title";
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("click", handleClickOutsideFilter);
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
  /* padding: 4px; */
  padding-top: 1.5vh;
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

.suggestions-list {
  position: absolute;
  top: 40px;
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
