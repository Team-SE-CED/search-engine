<template>
    <div class="container-sm">
        <ul class="img-grid">
            <li class="img-card" v-for="researchPaper in research_papers" :key="researchPaper.id"
                @click="redirectTo(researchPaper.id)">
                <img v-if="researchPaper.imgUrl" :src="researchPaper.imgUrl" alt="research_img" class="img-poster" />
                <img v-else src="https://via.placeholder.com/200x300?text=research" alt="sample poster"
                    class="img-poster" />
                <div class="img-title">{{ researchPaper.title }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PaperUI } from "~/types/research-paper-ui";
const { getSuggestedPaperStore } = usePaperStores()
const router = useRouter();

const research_papers = ref<PaperUI[]>(getSuggestedPaperStore())

function redirectTo(id: number) {
    router.push(`/search-result/${id}`); // Use router.push to navigate to the desired route
}

onMounted(() => {
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
    cursor: pointer;
    /* Remove z-index to ensure clicks work */
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
</style>
