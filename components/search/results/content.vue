<template>
  <div class="container-sm">
    <ul class="img-grid">
      <li class="img-card" v-for="researchPaper in filteredPapers" :key="researchPaper.id"
        @click="redirectTo(researchPaper.id)">
        <img v-if="researchPaper.imgUrl" :src="researchPaper.imgUrl" alt="research_img" class="img-poster" />
        <img v-else src="https://via.placeholder.com/200x300?text=research" alt="sample poster" class="img-poster" />
        <div class="img-title">{{ researchPaper.title }}</div>
      </li>
    </ul>
  </div>
  <div v-if="!numberOfResults" class="no-results-found">No results found</div>
  <div v-else class="no-results-found">
    Loaded {{ numberOfResults }} results
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const { getSuggestedPaperStore } = usePaperStores();
const router = useRouter();

const filteredPapers = computed(() => {
  return getSuggestedPaperStore();
});

const numberOfResults = computed(() => {
  return filteredPapers.value.length;
});

function redirectTo(id: number) {
  router.push(`/result/${id}`); // Use router.push to navigate to the desired route
}
onMounted(() => { });
</script>

<style scoped>
.container-sm {
  margin-top: 8vh;
}

.img-card {
  width: 200px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
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
  gap: 40px;
  list-style: none;
}

.no-results-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
  color: #888;
  margin-top: 20px;
}
</style>
