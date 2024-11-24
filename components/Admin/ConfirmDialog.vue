<template>
  <div class="blur-background">
    <div class="confirmation-dialog card shadow-sm p-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="mb-0 font-weight-bold">Confirmation Dialog</h5>
        <div class="icon-container">
          <img
            src="assets/static-images/warning.png"
            alt="Warning"
            class="warning-icon"
          />
        </div>
      </div>

      <div class="separator-line"></div>

      <p class="mb-3">
        Are you sure you want to delete this data? Please type "<strong>{{
          confirmationText
        }}</strong
        >" to confirm.
      </p>
      <input
        v-model="input"
        placeholder=""
        class="form-control mb-3"
        type="text"
      />
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-outline-secondary abort-btn" @click="abort">
          Abort
        </button>
        <button
          class="btn btn-danger delete-btn"
          @click="confirm"
          :disabled="input !== confirmationText"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps<{
  confirmationText: string;
}>();

const emit = defineEmits(["confirm", "abort"]);
const input = ref<string>("");

const confirm = () => {
  emit("confirm");
};

const abort = () => {
  emit("abort");
};
</script>

<style scoped>
.blur-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
}

.confirmation-dialog {
  width: 400px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  border: 1px solid #ddd;
}

.icon-container img {
  width: 24px;
  height: 24px;
}

.warning-icon {
  margin-left: 10px;
}

.separator-line {
  border-bottom: 1.5px solid #ddd;
  margin: 10px 0;
  width: 100%;
}

.btn {
  width: 100px;
}

.delete-btn {
  margin-top: 20px;
}

.abort-btn {
  margin-top: 20px;
  margin-left: 100px;
}
.form-control:focus {
  border-color: #000000 !important; /* Change to a custom border color if needed */
  box-shadow: none !important; /* Remove the box-shadow */
}

/* Optional: Change border color on hover */
.form-control:hover {
  border-color: #000000; /* Change hover border color if needed */
}
</style>
  