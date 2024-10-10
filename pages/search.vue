<template>
  <SearchResults />
  <SearchLogout />
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});
</script>

<style scoped></style>
