<template>
  <main>
    <div class="fixed-search-bar">
      <form class="container" @submit.prevent="handleSubmit()">
        <div class="position-relative">
          <!-- Search Icon -->
          <img class="search-icon" src="~/assets/static-images/search-eye.png" />
          <div class="vertical-line"></div>

          <SearchInput class="form-control form-control-lg pl-5 search-input" v-model="searchQuery"
            @input="filteredKeywords" @focus="showSuggestions = true" @enter="handleSubmit" />

          <!-- Search Suggestions Dropdown -->
          <SearchSuggestions :suggestionsPaper="filteredPapers" :suggestionsAuthor="filteredAuthors"
            :suggestionsClass="'suggestions-list'" :searchField="selectedSearchField" :showSuggestions="showSuggestions"
            :isAuthorModeProp="isAuthorMode" @suggestion-click="redirectTo" />

          <!-- Filter Dropdown -->
          <SearchFilters class="search-filters" :filterDropdownState="isOpen" @selectedFilter="handleSelectedFilter"
            @filterDropdownState="handleFilterDropdownState" @selectedYear="handleSelectedYear"
            @selectedDepartment="handleSelectedDepartment" @isAuthorMode="handleIsAuthorMode" />
        </div>

        <!-- Hidden input to include selected filter in form submission -->
        <input type="hidden" name="filter" :value="selectedFilter?.value" />
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { DateRangeEnum } from "~/enums/date-range";
import { searchAndFilterAuthors } from "~/server/factories/author-filter.factory";
import { useAuthorStore } from "~/server/stores/research-author-store";
import type { DateRangeType } from "~/types/date-range";
import type { Author } from "~/types/research-author-server";
import type { PaperUI } from "~/types/research-paper-ui";
const { getResearchPaper } = usePaper();
const { getAuthor } = useAuthor();
const { filterPapersFactory, filterLastKeyword } = usePaperFactory();
const { setSuggestedPaperStore } = usePaperStores();
const { setSuggestedAuthorStores, setIsAuthorMode } = useAuthorStore();
const router = useRouter();

const props = defineProps({
  searchQueryProps: String,
  yearClickedPropsLow: Number,
  yearClickedPropsUp: Number,
  departmentProps: String,
})

const emit = defineEmits(["isAuthorMode"])

// Declarations
const researchPaper = ref<PaperUI[]>([]);
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const selectedSearchField = ref<string>("title");
const isOpen = ref<boolean>(false);
const isAuthorMode = ref(false)
const selectedYear = ref<DateRangeType>(
  {
    lowerYear: DateRangeEnum.lowerYear,
    upperYear: DateRangeEnum.upperYear
  })
const selectedDepartment = ref<string[]>([])
const authors = ref<Author[]>([])

// Functions

// Search Engine Algorithm
const filteredPapers = computed((): PaperUI[] => {
  return filterPapersFactory(
    researchPaper.value,
    searchQuery.value,
    selectedYear.value,
    selectedDepartment.value
  );
});

async function fetchAuthors() {
  const fetchedAuthors = await getAuthor();
  authors.value = fetchedAuthors
}

const filteredAuthors = computed((): Author[] => {
  return searchAndFilterAuthors(authors.value, searchQuery.value);
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

function handleSelectedYear(selectedYearValue: DateRangeType) {
  selectedYear.value = selectedYearValue;
}

function handleSelectedDepartment(selectedDepartmentValue: string[]) {
  selectedDepartment.value = selectedDepartmentValue;
}

function handleSelectedFilter(selectedFilter: string) {
  selectedSearchField.value = selectedFilter;
}

function handleIsAuthorMode(isAuthorModeReceived: boolean) {
  isAuthorMode.value = isAuthorModeReceived
  setIsAuthorMode(isAuthorMode.value)
}

async function fetchPaper() {
  const paper = await getResearchPaper();
  researchPaper.value = paper;
}

function handleSubmit() {
  showSuggestions.value = false;

  if (searchQuery.value) {
    setSuggestedPaperStore(filteredPapers.value);
    setSuggestedAuthorStores(filteredAuthors.value);
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

watch(
  () => props.searchQueryProps,
  (newValue) => {
    if (newValue) searchQuery.value = newValue;
  }
);

watch(
  () => props.yearClickedPropsLow,
  (newValue) => {
    if (newValue) selectedYear.value.lowerYear = newValue;
  }
);

watch(
  () => props.yearClickedPropsUp,
  (newValue) => {
    if (newValue) {
      selectedYear.value.upperYear = newValue
      handleSubmit()
    }
  }
);

watch(
  () => props.departmentProps,
  (newValue) => {
    if (newValue) {
      const receivedDepartment = ref<string[]>([])
      receivedDepartment.value.push(newValue)
      selectedDepartment.value = receivedDepartment.value
      handleSubmit()
    }
  }
);

watch(
  () => isAuthorMode.value,
  (newValue) => {
    emit("isAuthorMode", newValue)
  }
);

onMounted(() => {
  fetchPaper().catch((error) => console.error(error));
  fetchAuthors()
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
  width: 12.5rem;
  /* 200px converted to rem */
  margin: 0.625rem;
  /* 10px converted to rem */
  text-align: center;
  z-index: -2;
}

.img-poster {
  height: 18.75rem;
  /* 300px converted to rem */
  width: 12.5rem;
  /* 200px converted to rem */
  border-radius: 1.25rem;
  /* 20px converted to rem */
}

.img-title {
  font-size: 1rem;
  /* 16px converted to rem */
  font-weight: bold;
  margin-top: 0.625rem;
  /* 10px converted to rem */
  max-width: 12.5rem;
  /* 200px converted to rem */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3.125rem;
  /* 50px converted to rem */
  padding: 1.25rem;
  /* 20px converted to rem */
  list-style: none;
}

/* Search Bar */
.fixed-search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  padding-top: 1.5vh;
}

.container {
  width: 40vw;
  margin: auto;
}

.form-control {
  border-color: gray;
  border-radius: 50px;
  /* height: 3rem;  */
  max-height: 3rem;
  /* Matches the intended height */
  min-width: 100%;
  /* Ensures it doesn't shrink below container width */
}

button.dropdown-toggle:focus {
  border: none;
}

.dropdown-menu {
  padding: 0.3125rem 0;
  /* 5px converted to rem */
  font-size: 1rem;
  /* 16px converted to rem */
}

button.dropdown-toggle {
  font-size: 1.2rem;
  /* 1.2rem for dropdown button font */
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  /* 1.5rem for the distance from the left */
  top: 50%;
  transform: translateY(-50%);
  height: 1.8rem;
  /* Scales with zoom */
  pointer-events: none;
}

input.form-control {
  padding-left: 4rem;
  /* 4rem for the padding */
  padding-right: 10vw;
  /* Adjust to fit container */
}

.search-input:focus {
  outline: none;
  border-color: #b70536;
  box-shadow: 0 0 0.5rem rgba(167, 44, 25, 0.931);
}

.vertical-line {
  position: absolute;
  right: 8vw;
  top: 50%;
  transform: translateY(-50%);
  height: 1.8rem;
  /* Similar to the height of the search icon */
  width: 1px;
  background-color: #484848;
}

.suggestions-list {
  position: absolute;
  top: 3.5rem;
  /* Use rem for consistent distance */
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 50px;
  z-index: 10;
  overflow-y: auto;
  list-style: none;
  padding: 0.3125rem 0;
  /* 5px converted to rem */
  margin-top: 1rem;
  /* 1rem for the margin-top */
}

.suggestions-list li {
  padding: 0.3125rem 1.25rem;
  /* 5px converted to rem */
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.suggestion-search-icon {
  position: relative;
  height: 2.5rem;
  /* 40px converted to rem */
  padding-right: 1rem;
  /* 1rem for padding */
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
