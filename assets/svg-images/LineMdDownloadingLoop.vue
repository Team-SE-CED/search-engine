<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'LineMdDownloadingLoop',
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="btn-icon1"  
  >
    <g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9">
        <animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0" />
      </path>
      <path stroke-dasharray="32" stroke-dashoffset="32" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0" />
      </path>
      <path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0" />
      </path>
      <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" />
      </path>
    </g>
  </svg>
</template>

<style scoped>
.btn-icon1 {
  margin-right:5px; /* Adjusts spacing between icon and text */
  display: inline-block; /* Ensure it behaves as an inline element */
  vertical-align: middle; /* Center vertically with text */ 
  width: 25px;  /* Size of the icon */
  height: 25px;
}
</style>
