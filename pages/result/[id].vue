<template>
  <SearchResultsTitleHeader />
  <SearchResultsSearchBar />
  <div class="right-content">
    <div class="menu-icon" @click="toggleSidebar">
      <LineMdMenu />
    </div>
  </div>
  <div ref="sidebarContainer">
    <Sidebar v-if="isSidebarVisible" />
  </div>
  <SearchResultsDetails />
</template>

<script lang="ts" setup>
import LineMdMenu from "~/assets/svg-images/LineMdMenu.vue";
import Sidebar from "~/components/Admin/Sidebar.vue";
import { onMounted, onBeforeUnmount } from "vue";

const isSidebarVisible = ref(false);
const sidebarContainer = ref<HTMLElement | null>(null);

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

onMounted(() => {
  document.addEventListener("click", closeSidebar);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeSidebar);
});
</script>

<style scoped>
.right-content {
  margin-top: 2.5vh;
  margin-right: 1vw;
  position: relative;
  float: right;
  z-index: 2;
}
.menu-icon {
  cursor: pointer;
}
</style>
