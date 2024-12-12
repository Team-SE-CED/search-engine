<template>
  <div class="container">
    <SearchArea />
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
</script>

<style scoped>
.container {
  padding-top: 15vh;
  text-align: center;
}
</style>
