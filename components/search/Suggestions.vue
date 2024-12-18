<template>
  <ul v-if="hasSearchSuggestions" :class="suggestionsClass">
    <li v-if="!isAuthorMode" v-for="suggestion in suggestionsPaper.slice(0, 8)" :key="suggestion.id"
      @click="handleClick(suggestion.id)" class="suggestion-item">
      <img class="suggestion-search-icon" src="~/assets/static-images/search-eye.png" />
      {{ selectedSuggestion(suggestion) }}
    </li>

    <li v-if="isAuthorMode" v-for="author in suggestionsAuthor.slice(0, 8)" :key="author.id"
      @click="handleClick(author.id)" class="suggestion-item">
      <img class="suggestion-search-icon" src="~/assets/static-images/search-eye.png" />
      {{ author.author_name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Author } from "~/types/research-author-server";
import "../bootstrap-css/global_style1/bootstrap.min.css";
import type { PaperUI } from "~/types/research-paper-ui";
import { useAuthorStore } from "~/server/stores/research-author-store";

const { getSuggestedAuthorStores, getIsAuthorMode } = useAuthorStore();

const authors = ref<Author[]>([])
const isAuthorMode = ref<boolean>(false)

// Props definition
const props = defineProps({
  suggestionsPaper: {
    type: Array as () => PaperUI[],
    required: true,
  },
  suggestionsAuthor: {
    type: Array as () => Author[],
    required: true,
  },
  suggestionsClass: {
    type: String,
    default: "suggestions-list",
  },
  searchField: {
    type: String,
    default: "title",
  },
  showSuggestions: {
    type: Boolean,
    required: true,
  },
});

// Emits definition
const emit = defineEmits(["suggestion-click"]);

function fetchAuthor() {
  const fetchedAuthor = getSuggestedAuthorStores()
  authors.value = fetchedAuthor
}

// Computed property to check if suggestions should be shown
const hasSearchSuggestions = computed(() => {
  return props.showSuggestions && props.suggestionsPaper.length > 0;
});

// Function to handle suggestion click and emit event to the parent
function handleClick(id: number) {
  emit("suggestion-click", id);
}

// Function to display correct field (e.g. title, author, etc.) based on search field
function selectedSuggestion(suggestion: PaperUI) {
  if (props.searchField === "title") return suggestion.title;
  if (props.searchField === "Author") return suggestion.author;
  if (props.searchField === "Date") return suggestion.title;
  if (props.searchField === "Department") return suggestion.title;

  return "No Display";
}

watch(
  () => getIsAuthorMode(),
  (newValue) => {
    isAuthorMode.value = newValue
    console.log("NewValueOfIsAuthorMode: " + newValue)
  }
);

onMounted(() => {
  fetchAuthor()
});
</script>

<style scoped>
/* Suggestions List Styles */
.suggestions-list {
  position: absolute;
  text-align: left;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 3vh;
  overflow: hidden;
  list-style: none;
  padding: 10px 0;
  margin-top: 20px;
}

.suggestions-list li {
  padding: 10px 20px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.suggestion-search-icon {
  position: relative;
  height: 2.5rem;
  padding-right: 15px;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}
</style>
