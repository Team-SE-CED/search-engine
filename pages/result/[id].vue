<template>
  <div class="container-sm">
    <div class="img-wrapper" v-if="isLoading">
      <!-- Shimmer loader for image -->
      <div class="shimmer-loader"></div>
    </div>
    <div
      class="img-wrapper"
      v-else
      v-for="paper in researchPaper"
      :key="paper.id"
    >
      <img
        v-if="paper.imgUrl"
        :src="paper.imgUrl"
        alt="research_img"
        class="img-poster"
      />
      <img
        v-else
        src="https://via.placeholder.com/200x300?text=research"
        alt="sample poster"
        class="img-poster"
      />
    </div>

    <div class="content">
      <div class="title-section">
        <h1 v-if="!isLoading" class="paperTitle">{{ showPaperTitle }}</h1>
        <div v-else class="shimmer-loader title-shimmer"></div>

        <div class="labels">
          <div v-if="!isLoading" class="yearLabel">{{ showPaperYear }}</div>
          <div v-else class="shimmer-loader label-shimmer"></div>

          <div v-if="!isLoading" class="departmentLabel">
            {{ showPaperDepartment }}
          </div>
          <div v-else class="shimmer-loader label-shimmer"></div>
        </div>
      </div>

      <div v-if="!isLoading" class="authors">
        Authors: {{ showPaperAuthor }}
      </div>
      <div v-else class="shimmer-loader text-shimmer"></div>

      <div v-if="!isLoading" class="actions">
        <button class="action-button request-pdf">Request full-text PDF</button>
        <button class="action-button copy-citation">Copy Citation</button>
      </div>
      <div v-else class="shimmer-loader button-shimmer"></div>

      <hr v-if="!isLoading" class="divider" />

      <h2 v-if="!isLoading" class="section-title">Abstract</h2>
      <!-- <div v-else class="shimmer-loader title-shimmer"></div> -->

      <p v-if="!isLoading" class="abstract">
        Adaptive reuse, the practice of repurposing existing buildings for new
        functions, has emerged as a sustainable approach to urban development,
        addressing the growing need to reduce environmental impact while
        preserving architectural heritage. This study explores the potential of
        adaptive reuse as a solution for revitalizing obsolete structures,
        transforming them into spaces that meet contemporary needs without
        sacrificing historical value. Focusing on case studies from various
        urban centers, the research examines the economic, environmental, and
        cultural benefits of adaptive reuse. Key findings reveal that repurposed
        buildings not only reduce construction waste and lower carbon footprints
        but also foster community identity by preserving a city's architectural
        legacy. However, challenges such as structural limitations, regulatory
        hurdles, and high renovation costs are also discussed, alongside
        potential strategies to overcome these obstacles. This paper argues that
        adaptive reuse, when carefully executed, can bridge the past and
        present, creating vibrant, functional spaces that contribute to
        sustainable urban development.
      </p>
      <div v-else class="shimmer-loader text-shimmer paragraph-shimmer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type { PaperUI } from "~/types/research-paper-ui";
import { useRoute, useRouter } from "vue-router";

const { id } = useRoute().params; // Get the ID from route params
const { getResearchPaper } = usePaper();
const router = useRouter();

// Declarations
const researchPaper = ref<PaperUI[]>([]);
const isLoading = ref(true); // Loading state
const paperId = Number(id); // Convert the ID to a number

onMounted(async () => {
  await fetchPaper(paperId); // Pass the ID to fetch the specific paper
});

async function fetchPaper(id: number) {
  const papers = await getResearchPaper();
  const paper = papers.find((p) => p.id === id);
  if (paper) {
    researchPaper.value = [paper]; // Set to an array with the found paper
  } else {
    router.push("/not-found"); // Redirect if paper not found
  }
  isLoading.value = false; // Set loading to false after fetching
}

const showPaperTitle = computed(() => {
  return researchPaper.value.length
    ? researchPaper.value[0].title
    : "Loading...";
});
const showPaperDepartment = computed(() => {
  const department = researchPaper.value[0]?.department;
  return department ? department : "N/A";
});

const showPaperYear = computed(() => {
  if (!researchPaper.value.length) {
    return "Loading...";
  }

  const date = researchPaper.value[0].date;
  const year = date ? new Date(date).getFullYear() : "N/A";
  return year;
});

const showPaperAuthor = computed(() => {
  if (!researchPaper.value.length) {
    return "Loading...";
  }

  const authors = researchPaper.value[0].author;
  return authors ? authors.replace(/,/g, " • ") : "N/A";
});
</script>

<style scoped>
.container-sm {
  margin-top: 10vh;
  padding: 2vw;
  width: 60vw;
  border: 1px solid #ddd;
  border-radius: 1vw;
  background-color: #fff;
  display: flex;
  gap: 2vw;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.img-wrapper {
  width: 15vw;
  height: auto;
}

.img-poster {
  width: 100%;
  height: 40vh;
  border-radius: 1vw;
  object-fit: cover;
}

.content {
  flex: 1;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
}

.paperTitle {
  font-size: 4vh;
  font-weight: bold;
  color: #333;
}

.labels {
  display: flex;
  gap: 0.5vw;
}

.yearLabel,
.departmentLabel {
  font-size: 1.8vh;
  padding: 0.2vh 1vh;
  border-radius: 0.5vh;
  display: inline-block;
}

.yearLabel {
  background-color: #e4002b;
  color: #fff;
}

.departmentLabel {
  background-color: #007bff;
  color: #fff;
}

.authors {
  font-size: 1.5vh;
  color: #555;
  margin: 1vh 0;
}

.actions {
  display: flex;
  gap: 1vw;
  margin-top: 1vh;
}

.action-button {
  padding: 0.8vh 1.5vw;
  font-size: 1.5vh;
  border: none;
  border-radius: 0.5vh;
  cursor: pointer;
}

.request-pdf {
  background-color: #e4002b;
  color: #fff;
}

.copy-citation {
  background-color: #6c757d;
  color: #fff;
}

.divider {
  margin: 2vh 0;
  border: none;
  border-top: 1px solid #ddd;
}

.section-title {
  font-size: 2vh;
  font-weight: bold;
  color: #333;
}

.abstract {
  font-size: 1.6vh;
  color: #444;
  line-height: 1.6;
}

/* Shimmer Loader Styles */
.shimmer-loader,
.title-shimmer,
.label-shimmer,
.text-shimmer,
.button-shimmer,
.paragraph-shimmer {
  width: 100%;
  height: 40vh; /* Same height as img-poster */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 1vw;
}

.title-shimmer {
  width: 80%;
  height: 4vh;
  margin-bottom: 0.5vh;
}

.label-shimmer {
  width: 6vw;
  height: 2vh;
  margin-right: 0.5vw;
}

.text-shimmer {
  width: 50%;
  height: 2vh;
  margin-top: 1vh;
}

.button-shimmer {
  width: 12vw;
  height: 3vh;
  margin-top: 1vh;
}

.paragraph-shimmer {
  width: 100%;
  height: 25vh;
  margin-top: 2vh;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
