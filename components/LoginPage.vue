<template>
  <div class="login-page">
    <div class="header"></div>
    <div class="login-container">
      <div class="left-content">
        <img src="~assets/static-images/su-logo.png" class="left-logo" />
      </div>
      <div class="login-box">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Silliman Email</label>
            <input type="email" id="email" v-model="email" class="form-control" placeholder="" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-input-wrapper">
              <input :type="passwordInputType" id="password" v-model="password" class="form-control" placeholder=""
                required />
              <div class="eye-icon" v-if="isPasswordEntered()" @click="togglePassword">
                <img :src="eyeIcon" id="eyeicon" />
              </div>
            </div>
            <div class="password-strength-bar">
              <div :class="['strength-indicator', passwordStrengthClass]"
                :style="{ width: passwordStrengthPercentage + '%' }"></div>
            </div>
          </div>

          <button type="submit" class="login-button">LOG IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import eyeOpen from "@/assets/static-images/eye-open.png";
import eyeClose from "@/assets/static-images/eye-close.png";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const passwordInputType = computed(() =>
  showPassword.value ? "text" : "password"
);
const eyeIcon = computed(() => (showPassword.value ? eyeOpen : eyeClose));

const passwordStrength = computed(() => {
  const length = password.value.length;
  if (length > 16) return "strong";
  if (length > 12) return "medium";
  if (length > 8) return "weak";
  return "very-weak";
});

const passwordStrengthPercentage = computed(() => {
  const length = password.value.length;
  if (length > 16) return 100;
  if (length > 12) return 75;
  if (length > 8) return 50;
  return length > 0 ? 25 : 0;
});

const passwordStrengthClass = computed(() => passwordStrength.value);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const login = () => {
  console.log("Logging in with", email.value, password.value);
};

function isPasswordEntered() {
  return password.value.length > 0;
}
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #b70536;
  color: white;
  padding: 1.5%;
  text-align: center;
  z-index: 1000;
}

.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1200px;
}

.left-logo {
  width: 450px;
  height: auto;
  margin-bottom: 20px;
  margin-left: 30px;
}

.left-content {
  flex: 1;
  padding-right: 30px;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.password-input-wrapper {
  position: relative;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 8px;
  font-weight: bold;
  font-family: Segoe UI;
  color: #7a1f32;
}

.form-control {
  width: 95%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  font-family: Segoe UI;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.eye-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.login-button {
  background-color: #b70536;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  font-family: Verdana;
}

.login-button:hover {
  background-color: #5f1728;
}

.password-strength-bar {
  background-color: #ffffff;
  height: 5px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.strength-indicator {
  height: 100%;
  border-radius: 5px;
}

.very-weak {
  background-color: #ec1a1a;
}

.weak {
  background-color: #e67e22;
}

.medium {
  background-color: #ddd23d;
}

.strong {
  background-color: #2ecc71;
}
</style>
