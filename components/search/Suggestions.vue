<template>
    <ul v-if="hasSearchSuggestions" :class="suggestionsClass">
        <li v-for="suggestion in suggestions.slice(0, 8)" :key="suggestion.id" @click="handleClick(suggestion.id)">
            <img class="suggestion-search-icon" src="~/assets/static-images/search-eye.png" />
            {{ selectedSuggestion(suggestion) }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import "../bootstrap-css/global_style1/bootstrap.min.css";
import { defineProps, defineEmits, computed } from 'vue';
import type { PaperUI } from '~/types/research-paper-ui';

// Props definition
const props = defineProps({
    suggestions: {
        type: Array as () => PaperUI[],
        required: true,
    },
    suggestionsClass: {
        type: String,
        default: 'suggestions-list',
    },
    searchField: {
        type: String,
        default: 'title',
    },
    showSuggestions: {
        type: Boolean,
        required: true,
    }
});

// Emits definition
const emit = defineEmits(['suggestion-click']);

// Computed property to check if suggestions should be shown
const hasSearchSuggestions = computed(() => {
    return props.showSuggestions && props.suggestions.length > 0;
});

// Function to handle suggestion click and emit event to the parent
function handleClick(id: number) {
    emit('suggestion-click', id);
}

// Function to display correct field (e.g. title, author, etc.) based on search field
function selectedSuggestion(suggestion: PaperUI) {
    if (props.searchField === 'title') return suggestion.title;
    if (props.searchField === 'Author') return suggestion.author;
    if (props.searchField === 'Date') return suggestion.title;
    if (props.searchField === 'Department') return suggestion.title;

    return 'No Display';
}
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
</style>