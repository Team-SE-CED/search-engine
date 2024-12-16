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
  background-color: #800000;
  color: white;
  padding: 1.5rem; /* Equivalent to 2% padding scaled with rem */
  text-align: center;
  z-index: 1;
  font-size: 1.2rem; /* Adjust font size with rem for scaling */
}

/* Optional: Add responsive adjustments for different screen sizes */
@media (min-width: 768px) {
  header {
    padding: 1.8rem 3rem; /* Adjust padding slightly on larger screens */
    font-size: 1.4rem; /* Adjust font size for larger screens */
  }
}
</style>
