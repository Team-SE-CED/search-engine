<template>
  <div class="container-sm">
    <ul class="img-grid">
      <li class="img-card" v-for="researchPaper in filteredPapers" :key="researchPaper.id"
        @click="redirectTo(researchPaper.id)">
        <div class="img-wrapper">
          <img v-if="researchPaper.imgUrl" :src="researchPaper.imgUrl" alt="research_img" class="img-poster" />
          <img v-else src="https://via.placeholder.com/200x300?text=research" alt="sample poster" class="img-poster" />
        </div>
        <div class="img-overlay">
          <div class="img-title">{{ researchPaper.title }}</div>
          <div class="img-author">{{ researchPaper.author }}</div>
          <div class="img-department">{{ researchPaper.department }}</div>
        </div>
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
  router.push(`/result/${id}`);
}

onMounted(() => { });
</script>

<style scoped>
.container-sm {
  margin-top: 8vh;
}

.img-card {
  position: relative;
  width: 200px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
}

.img-wrapper {
  height: 300px;
  width: 200px;
  overflow: hidden;
  border-radius: 20px;
}

.img-poster {
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease;
  object-fit: cover;
}

.img-card:hover .img-poster {
  transform: scale(1.2);
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2); 
  backdrop-filter: blur(50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 20px;
}

.img-card:hover .img-overlay {
  opacity: 1;
}

.img-title {
  font-size: 15px;
  font-weight: 500;
  color: rgb(255, 255, 255);
  margin-bottom: 30px;
  font-family: Segoe UI;
}

.img-author {
  font-size: 12px;
  font-weight: semi-bold;
  color: rgb(255, 255, 255);
  margin-bottom: 30px;
  font-family: Segoe UI;
}

.img-department {
  font-size: 12px;
  font-weight: semi-bold;
  color: rgba(255, 255, 255, 0.815);
  margin-bottom: 30px;
  font-family: Segoe UI;
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
