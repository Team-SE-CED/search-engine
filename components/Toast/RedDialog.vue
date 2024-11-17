<template>
  <div v-if="showToast">
    <div
      class="toast-container position-fixed bottom-0 end-0 p-3"
      style="z-index: 11"
    >
      <div
        class="toast show align-items-center text-white bg-success border-0 slide-in"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            Requested Successfully! Please wait for the confirmation from the
            Librarian.
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="closeToast"
          ></button>
        </div>
        <div class="loading-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const showToast = ref(true);

const closeToast = () => {
  showToast.value = false;
};

onMounted(() => {
  // Auto close the toast after 10 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 10000);
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 2rem; /* Use rem for consistent spacing across zoom levels */
  right: 2rem;
  margin-bottom: 2vh;
  z-index: 3;
}

.toast {
  width: auto;
  border-radius: 0.5rem; /* Border radius in rem for scaling */
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  position: relative;
  opacity: 1;
}

.toast-body {
  padding: 1rem; /* Padding in rem */
}

.loading-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.25rem; /* Height in rem */
  background-color: white;
  width: 100%;
  /* Updated animation to 10s to match the timeout */
  animation: loading 10s linear forwards;
}

/* Slide-in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

@keyframes loading {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
