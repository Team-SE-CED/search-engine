<template>
    <div>
        <h1>
            <NuxtLink to="/welcome">Login</NuxtLink>
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