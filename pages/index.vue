<template>
  <div class="container">
    <SearchMainTitle />
  </div>
  <div>
    <SearchArea />
  </div>
</template>

<script setup lang="ts">
import Test from '~/components/search/DropdownFilter.vue';


</script>



<style scoped>
@import "tailwindcss";
@import "@nuxt/ui"; 

.container {
  padding-top: 15vh;
  text-align: center;
}
</style>
