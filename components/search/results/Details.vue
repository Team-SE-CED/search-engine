<template>
  <title>{{ showTitle }}</title>
  <div class="container-sm">

    <div class="img-wrapper" v-if="isLoading">
      <div class="shimmer-loader"></div>
    </div>

    <div class="img-wrapper" v-if="!isLoading && !isAuthorMode" v-for="paper in researchPaper" :key="paper.id">
      <img v-if="paper.imgUrl" :src="paper.imgUrl" alt="research_img" class="img-poster" />
      <img v-else src="https://via.placeholder.com/200x300?text=research" alt="sample poster" class="img-poster" />
    </div>

    <!-- Author Mode -->
    <div class="img-wrapper" v-if="!isLoading && isAuthorMode" v-for="author in paperAuthors" :key="author.id">
      <img v-if="author.profile_pic" :src="author.profile_pic" alt="research_img" class="img-poster" />
      <img v-else src="https://via.placeholder.com/200x300?text=research" alt="sample poster" class="img-poster" />
    </div>

    <div class="content">
      <div class="title-section">
        <h1 v-if="!isLoading" class="paperTitle">
          <span v-if="isAuthorMode">{{ showTitle }}</span>
          <span v-else>{{ showTitle }}</span>
        </h1>
        <div v-else class="shimmer-loader title-shimmer"></div>

        <div class="labels">
          <div v-if="!isLoading && !isAuthorMode" @click="showRelevantYear" class="yearLabel">
            {{ showPaperYear }}
          </div>

          <div v-if="isLoading" class="shimmer-loader label-shimmer"></div>

          <div v-if="!isLoading && !isAuthorMode" @click="showRelevantDepartment" class="departmentLabel">
            {{ showPaperDepartment }}
          </div>
          <div v-if="isLoading" class="shimmer-loader label-shimmer"></div>
        </div>
      </div>

      <div v-if="!isLoading" class="authors">
        <span v-if="!isAuthorMode">Authors: {{ showPaperAuthor }}</span>
      </div>

      <div v-else class="shimmer-loader text-shimmer"></div>

      <div v-if="!isLoading && !isAuthorMode" class="actions">
        <button class="action-button request-pdf" @click="requestFullPdf">
          <LineMdDownloadingLoop />
          Request full-text PDF
        </button>
        <button class="action-button copy-citation" @click="copyCitation" :disabled="!hasAuthors">
          <img src="~assets/static-images/copy.png" alt="Copy Icon" class="btn-icon" />
          {{ copyButtonText }}
        </button>
      </div>

      <div v-if="isLoading" class="shimmer-loader button-shimmer"></div>

      <hr v-if="!isLoading" class="divider" />

      <h2 v-if="!isLoading && !isAuthorMode" class="section-title">Abstract</h2>

      <p v-if="!isLoading" class="abstract">{{ showPaperAbstract }}</p>

      <div v-else class="shimmer-loader text-shimmer paragraph-shimmer"></div>

    </div>

  </div>
  <!-- Requested Notification -->
  <ToastRedDialog v-if="isRequested" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { PaperUI } from "~/types/research-paper-ui";
import { useRoute, useRouter } from "vue-router";
import LineMdDownloadingLoop from "~/assets/svg-images/LineMdDownloadingLoop.vue";
import { NuxtLink } from "#build/components";
import type { DateRangeType } from "~/types/date-range";
import { DateRangeEnum } from "~/enums/date-range";
import type { Author } from "~/types/research-author-server";
import { useAuthorStore } from "~/server/stores/research-author-store";

const route = useRoute();
const id = route.params.id;
const { getResearchPaper } = usePaper();
const { getAuthor } = useAuthor();
const router = useRouter();
const { filterPapersFactory, filterLastKeyword } = usePaperFactory();
const { setSuggestedPaperStore, getSuggestedPaperStore } = usePaperStores();
const { getIsAuthorMode } = useAuthorStore();

const emit = defineEmits(["searchQuery", "yearClicked", "department"])

// Declarations
const researchPaper = ref<PaperUI[]>([]);
const paperAuthors = ref<Author[]>([]);
const isLoading = ref(true);
const paperId = Number(id);
const authorId = Number(id);
const isRequested = ref(false);
const copyButtonText = ref("Copy Citation");
const client = useSupabaseClient();
const response = ref();
const selectedDepartment = ref<string[]>([])
const searchQuery = ref<string>("");
const isAuthorMode = ref(false)
const selectedYear = ref<DateRangeType>(
  {
    lowerYear: DateRangeEnum.lowerYear,
    upperYear: DateRangeEnum.upperYear
  })


function showRelevantYear() {
  const date = researchPaper.value[0].yearPublished;

  const yearClicked = ref<DateRangeType>({
    lowerYear: date,
    upperYear: date,
  })
  emit("searchQuery", "#")
  emit("yearClicked", yearClicked.value)
}

function showRelevantDepartment() {
  const department = researchPaper.value[0]?.department;

  emit("searchQuery", "#")
  emit("department", department)
}

async function fetchPaper(id: number) {
  if (isAuthorMode.value) return
  console.log("isAuthor: " + isAuthorMode.value)
  const papers = await getResearchPaper();
  const paper = papers.find((p) => p.id === id);

  if (paper) {
    researchPaper.value = [paper];
  } else {
    router.push("/not-found");
  }
  isLoading.value = false;
}

async function fetchAuthor(id: number) {
  if (!isAuthorMode.value) return
  console.log("isAuthor: " + isAuthorMode.value)

  const authors = await getAuthor();
  console.log("authors: " + JSON.stringify(authors))
  const author = authors.find((p) => p.id === id);
  console.log("author: " + JSON.stringify(author))
  if (author) {
    paperAuthors.value = [author];
  }
  isLoading.value = false;
}

const showTitle = computed(() => {
  if (isAuthorMode.value) {
    return paperAuthors.value.length
      ? paperAuthors.value[0].author_name
      : "Loading...";
  }
  else {
    return researchPaper.value.length
      ? researchPaper.value[0].title
      : "Loading...";
  }
});

const showPaperDepartment = computed(() => {
  const department = researchPaper.value[0]?.department;
  return department ? department : "N/A";
});

const showPaperAbstract = computed(() => {
  if (isAuthorMode.value) return
  const abstract = researchPaper.value[0]?.abstract;
  return abstract ? abstract : "N/A";
});

const showPaperYear = computed(() => {
  if (!researchPaper.value.length) {
    return "Loading...";
  }

  const date = researchPaper.value[0].yearPublished;
  const year = date ? new Date(date).getFullYear() : "N/A";
  return year;
});

const showPaperAuthor = computed(() => {
  if (!researchPaper.value.length) {
    return "Loading...";
  }

  const authors = researchPaper.value[0].author;
  return authors ? authors.replace(/,/g, ", ") : "N/A";
});

const hasAuthors = computed(() => {
  return showPaperAuthor.value && showPaperAuthor.value !== "N/A";
});

async function requestFullPdf() {
  const user = await client.auth.getUser();
  isRequested.value = true;

  setTimeout(() => {
    isRequested.value = false;
  }, 10000);

  try {
    const res = await $fetch("/api/send-email", {
      method: "POST",
      body: { 
        email: user.data.user?.email,
        id: id
       }, 
    });
    response.value = res;
  } catch (error) {
    console.error(error);
    response.value = { message: "Failed to send email." };
  }
}

function copyCitation() {
  const authors = showPaperAuthor.value;
  const year = showPaperYear.value;
  const title = showTitle.value;
  const citation = authors + ". (" + year + "). " + title + ".";

  navigator.clipboard.writeText(citation).then(() => {
    copyButtonText.value = "Copied!";
    setTimeout(() => {
      copyButtonText.value = "Copy Citation";
    }, 4000);
  });
}

watch(
  () => getIsAuthorMode(),
  (newValue) => {
    isAuthorMode.value = newValue
  }
);

onMounted(async () => {
  await fetchPaper(paperId);
  await fetchAuthor(authorId)
});
</script>

<style scoped>
.container-sm {
  margin-top: 6rem;
  padding: 2rem;
  width: 60%;
  border: 1px solid #ddd;
  border-radius: 1rem;
  background-color: #fff;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.img-wrapper {
  width: 15rem;
}

.img-poster {
  width: 100%;
  height: 20rem;
  border-radius: 1rem;
  object-fit: cover;
}

.content {
  flex: 1;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.paperTitle {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.labels {
  display: flex;
  gap: 0.5rem;
}

.yearLabel,
.departmentLabel {
  font-size: 1rem;
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  display: inline-block;
}

.yearLabel {
  background-color: #e4002b;
  color: #fff;
  cursor: pointer;
}

.departmentLabel {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.authors {
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  align-items: center;
}

.btn-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.request-pdf {
  background-color: #e4002b;
  color: #fff;
}

.request-pdf:hover {
  background-color: #900000;
}

.copy-citation {
  background-color: #6c757d;
  color: #fff;
}

.copy-citation:hover {
  background-color: #474849;
  color: #fff;
}

.divider {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #504e4e;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.abstract {
  font-size: 1rem;
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
  height: 40vh;
  /* Same height as img-poster */
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
