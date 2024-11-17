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
  gap: 15px;
  position: relative;
  z-index: 2;
  padding-top: 1vh;
}

.logo img {
  width: 55px;
  height: 55px;
  margin-left: 20px;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.research-title,
.catalog-title {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  letter-spacing: 1.5px;
  font-family: Segoe UI;
  color: white;
}
</style>
