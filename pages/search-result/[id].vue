<template>
    <div style="">
        Fetched: {{ showPaperTitle }}
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import type { PaperUI } from '~/types/research-paper-ui';
import { useRoute } from 'vue-router';

const { id } = useRoute().params;
const { getResearchPaper } = usePaper();

// Declarations
const researchPaper = ref<PaperUI[]>([]);
let index = Number(id);

onMounted(() => {
    fetchPaper();
});

async function fetchPaper() {
    const paper = await getResearchPaper();
    researchPaper.value = paper;
}

const showPaperTitle = computed(() => {
    if (researchPaper.value[index]) {
        return researchPaper.value[index].title;
    }
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
