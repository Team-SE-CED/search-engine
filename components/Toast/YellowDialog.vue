<template>
    <div>
      <div
        class="toast-container position-fixed bottom-0 end-0 p-3"
        style="z-index: 11"
      >
        <div
          class="toast show align-items-center text-white bg-warning border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="d-flex">
            <div class="toast-body">
              Success! Please wait for the confirmation from the Librarian.
            </div>
            <button
              type="button"
              class="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              @click="closeToast"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const showToast = ref(true);
  
  const closeToast = () => {
    showToast.value = false;
  };
  </script>
  
  <style scoped>
  .toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000000;
  }
  
  .toast {
    min-width: 500px;
    border-radius: 8px;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  }
  
  .toast-body {
    padding: 15px;
  }
  </style>
  