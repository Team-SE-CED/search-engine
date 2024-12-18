<template>
  <SearchResultsTitleHeader />
  <SearchResultsSearchBar :searchQueryProps="searchQuery" :yearClickedPropsLow="yearClicked?.lowerYear"
    :yearClickedPropsUp="yearClicked?.upperYear" :departmentProps="department" />
  <div class="right-content">
    <div class="menu-icon" @click="toggleSidebar">
      <LineMdMenu />
    </div>
  </div>
  <div ref="sidebarContainer">
    <Sidebar v-if="isSidebarVisible" />
  </div>
  <SearchResultsDetails @searchQuery="handleSearchQuery" @yearClicked="handleYearClicked"
    @department="handleDepartment" />
</template>

<script lang="ts" setup>
import LineMdMenu from "~/assets/svg-images/LineMdMenu.vue";
import Sidebar from "~/components/Admin/Sidebar.vue";
import { onMounted, onBeforeUnmount } from "vue";
import type { DateRangeType } from "~/types/date-range";

const isSidebarVisible = ref(false);
const sidebarContainer = ref<HTMLElement | null>(null);
const searchQuery = ref()
const department = ref<string>()
const yearClicked = ref<DateRangeType>()

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

const closeSidebar = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    isSidebarVisible.value &&
    sidebarContainer.value &&
    !sidebarContainer.value.contains(target) &&
    !target.closest(".menu-icon")
  ) {
    isSidebarVisible.value = false;
  }
};

function handleSearchQuery(receivedQuery: string) {
  searchQuery.value = receivedQuery
  console.log("Received Query: " + searchQuery.value)
}

function handleYearClicked(receivedYearClicked: DateRangeType) {
  yearClicked.value = receivedYearClicked
  console.log("Received Year CLicked: " + JSON.stringify(yearClicked.value))
}

function handleDepartment(receivedDepartment: string) {
  department.value = receivedDepartment
  console.log("Received Department: " + JSON.stringify(department.value))
}

onMounted(() => {
  document.addEventListener("click", closeSidebar);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeSidebar);
});
</script>

<style scoped>
.right-content {
  position: fixed;
  /* Position fixed to the viewport */
  top: 1rem;
  /* Distance from the top, in rem */
  right: 1rem;
  /* Distance from the right, in rem */
  z-index: 9999;
}

.menu-icon {
  cursor: pointer;
  color: white;
  width: 3rem;
  /* Adjust the size of the icon */
  height: 3rem;
  /* Adjust the size of the icon */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
