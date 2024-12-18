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
  </main>
</template>

<script setup lang="ts">
import { DateRangeEnum } from "~/enums/date-range";
import "../bootstrap-css/global_style1/bootstrap.min.css";
import type { PaperUI } from "~/types/research-paper-ui";
import type { DateRangeType } from "~/types/date-range";
import { useAuthorStore } from "~/server/stores/research-author-store";
import type { Author } from "~/types/research-author-server";
import { searchAndFilterAuthors } from "~/server/factories/author-filter.factory";
const { getResearchPaper } = usePaper();
const { getAuthor } = useAuthor();
const { filterPapersFactory, filterLastKeyword } = usePaperFactory();
const { setSuggestedPaperStore } = usePaperStores();
const { setSuggestedAuthorStores, setIsAuthorMode } = useAuthorStore();
const router = useRouter();

const emit = defineEmits(["isAuthorMode"])

// Declarations
const selectedFilter = ref<{ value: string; label: string } | null>(null);
const researchPaper = ref<PaperUI[]>([]);
const authors = ref<Author[]>([])
const searchQuery = ref<string>("");
const showSuggestions = ref<boolean>(false);
const selectedSearchField = ref<string>("title")
const isOpen = ref<boolean>(false)
const isAuthorMode = ref()
const selectedYear = ref<DateRangeType>(
  {
    lowerYear: DateRangeEnum.lowerYear,
    upperYear: DateRangeEnum.upperYear
  })

const selectedDepartment = ref<string[]>([])

// Functions
async function fetchPaper() {
  const fetchedPaper = await getResearchPaper();
  researchPaper.value = fetchedPaper;
}

async function fetchAuthors() {
  const fetchedAuthors = await getAuthor();
  authors.value = fetchedAuthors
}

// Search Engine Algorithm
const filteredPapers = computed((): PaperUI[] => {
  return filterPapersFactory(researchPaper.value, searchQuery.value, selectedYear.value, selectedDepartment.value);
});

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
  selectedYear.value = selectedYearValue
}

function handleSelectedDepartment(selectedDepartmentValue: string[]) {
  selectedDepartment.value = selectedDepartmentValue
}

function handleSelectedFilter(selectedFilter: string) {
  selectedSearchField.value = selectedFilter;
}

function handleIsAuthorMode(isAuthorModeReceived: boolean) {
  isAuthorMode.value = isAuthorModeReceived
  setIsAuthorMode(isAuthorMode.value)
}

function redirectTo(id: number) {
  router.push(`/result/${id}`);
}

function handleSubmit() {
  setSuggestedPaperStore(filteredPapers.value);
  setSuggestedAuthorStores(filteredAuthors.value);

  if (searchQuery.value.trim()) {
    router.push(`/result?search=${encodeURIComponent(searchQuery.value)}`);
  }
}

onMounted(() => {
  setIsAuthorMode(false)
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
.container {
  width: 60vw;
  padding-top: 2rem;
}

.form-control {
  border-color: gray;
  border-radius: 1rem;
  height: 8vh;
}

button.dropdown-toggle:focus {
  border: none;
}

button.dropdown-toggle {
  font-size: 20px;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 2.5rem;
  pointer-events: none;
}

input.form-control {
  padding-left: 70px;
  padding-right: 150px;
  font-size: 1.1rem;
}

.vertical-line {
  position: absolute;
  right: 130px;
  top: 50%;
  transform: translateY(-50%);
  height: 1.3rem;
  width: 1px;
  background-color: #484848;
}

/* Suggestions List Styles */
.suggestions-list {
  position: absolute;
  text-align: left;
  top: 4rem;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 1rem;
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

.form-control:focus {
  outline: none;
  border-color: #b70536;
  box-shadow: 0 0 0.5rem rgba(167, 44, 25, 0.931);
}

.form-control:hover {
  outline: none;
  border-color: #b70536;
  box-shadow: 0 0 0.5rem rgba(167, 44, 25, 0.931);
}
</style>
