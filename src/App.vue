<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- temporarly commented - Eve -->
    <!-- <img alt="SU logo" class="img-fluid" src="./assets/su-logo.png" width="125" height="125" /> -->

    <div class="container">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
