<template>
  <div class="left-content">
    <div class="logo">
      <img src="~assets/static-images/su-logo.png" alt="Logo" />
    </div>
    <div class="title">
      <h1 class="research-title">RESEARCH</h1>
      <h1 class="catalog-title">CATALOG</h1>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.left-content {
  display: flex;
  align-items: center;
  gap: 1rem; /* Use rem for responsive gap */
  position: fixed;
  top: 1rem; /* Use rem for vertical positioning */
  left: 1rem; /* Use rem for horizontal positioning */
  z-index: 2;
  /* padding-top: 1rem; */
}

.logo img {
  width: 3rem; /* Width in rem for responsive image size */
  height: auto;
  margin-left: 1rem;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.research-title,
.catalog-title {
  font-size: 1rem; /* Font size in rem for scalability */
  margin: 0;
  line-height: 1.5;
  letter-spacing: 0.1rem; /* Adjust letter-spacing in rem for responsiveness */
  font-family: Segoe UI, sans-serif;
  color: white;
}
</style>
