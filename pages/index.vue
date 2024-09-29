<template>
    <div>
        <h1>
            <NuxtLink to="/login-page">Login</NuxtLink>
        </h1>
    </div>
    <div>
        <h1>
            <NuxtLink to="/search-tooltip">Login</NuxtLink>
        </h1>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'search-area',
  ],
});
</script>

<style scoped>

</style>