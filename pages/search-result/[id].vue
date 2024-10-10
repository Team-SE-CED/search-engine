<template>
    <div>
        Fetched: {{ showPaperTitle }}
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import type { PaperUI } from '~/types/research-paper-ui';
import { useRoute } from 'vue-router';

const { id } = useRoute().params; // Get the ID from route params
const { getResearchPaper } = usePaper();

// Declarations
const researchPaper = ref<PaperUI[]>([]);
const paperId = Number(id); // Convert the ID to a number

onMounted(() => {
    fetchPaper();
});

async function fetchPaper() {
    const papers = await getResearchPaper();
    researchPaper.value = papers;
}

const showPaperTitle = computed(() => {
    const paper = researchPaper.value.find(p => p.id === paperId); // Find the paper by ID
    if (paper) return paper.title;
    return 'Loading...';
});
</script>

<style scoped>
div {
    font-size: 100px;
    display: flex;
    place-content: center;
    place-items: center;
    height: 100vh;
    width: 100vw;
}
</style>
