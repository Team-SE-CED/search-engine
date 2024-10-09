<template>
  <div class="container">
    <SearchMainTitle />
  </div>
  <div>
    <SearchArea />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'welcome',
  ],
});
</script>

<style scoped>
.container {
  padding-top: 15vh;
  text-align: center;
}
</style>
