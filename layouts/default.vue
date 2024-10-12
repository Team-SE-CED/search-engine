<template>
  <header></header>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #b70536;
  color: white;
  padding: 2%;
  text-align: center;
  z-index: 1;
}
</style>
