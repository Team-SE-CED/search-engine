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
            <div :class="{'error-popup': true, 'fade-out': fadeOut}" v-if="errorMessage">{{ errorMessage }}</div>
            <div class="success-popup" v-if="successMessage"> {{ successMessage }} </div>
            <div class="input-wrapper">
              <label :class="{ active: isEmailActive }" for="email">Silliman Email</label>
              <input type="email" id="email" v-model="email" class="form-control" @focus="handleEmailFocus"
                @blur="handleEmailBlur" required />
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <label :class="{ active: isPasswordActive }" for="password">Password</label>
              <input :type="passwordInputType" id="password" v-model="password" class="form-control"
                @focus="handlePasswordFocus" @blur="handlePasswordBlur" required />
              <div class="eye-icon" v-if="hasPassword" @click="togglePassword">
                <img :src="eyeIcon" id="eyeicon" />
              </div>
            </div>
          </div>

          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="rememberMe" v-model="rememberMe" />
              <label for="rememberMe"> </label> Remember me
            </div>
            <div class="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <button type="submit" class="login-button">LOG IN</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import { ref, computed } from 'vue';
import eyeOpen from '@/assets/static-images/eye-open.png';
import eyeClose from '@/assets/static-images/eye-close.png';

const client = useSupabaseClient();
const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const isEmailFocused = ref(false);
const isPasswordFocused = ref(false);
const errorMessage = ref('');
const fadeOut = ref(false);
const successMessage = ref('');

async function login() {
  try {
    fadeOut.value = false;
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    
    if (error) {
      errorMessage.value = "Incorrect Email or Password. Please try again.";
      setTimeout(() => {
        fadeOut.value = true;
        setTimeout(() => {
          errorMessage.value = "";
          fadeOut.value = false;
        }, 500);
      }, 3000);
    }
    else {
      successMessage.value = "Logged In Successfully";
      setTimeout(() => {
        router.push('/welcome');
      }, 3000);
    }
    
  } catch (error) {
    errorMessage.value = "Something went wrong. Try again.";
  }
}

const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'));
const eyeIcon = computed(() => (showPassword.value ? eyeOpen : eyeClose));
const isEmailActive = computed(() => (email.value.length > 0 || isEmailFocused.value))
const isPasswordActive = computed(() => (password.value.length > 0 || isPasswordFocused.value))
const hasPassword = computed(() => (password.value.length > 0))

const handleEmailFocus = () => {
  isEmailFocused.value = true;
}
const handleEmailBlur = () => {
  isEmailFocused.value = false;
}

const handlePasswordFocus = () => {
  isPasswordFocused.value = true;
}
const handlePasswordBlur = () => {
  isPasswordFocused.value = false;
}

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

</script>


<style scoped>
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
  background-color: #B70536;
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
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  transition: box-shadow 0.5s ease-in-out; 
}

.login-box:focus-within {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 20px;
}

.input-wrapper {
  position: relative;
}

input.form-control {
  width: 95%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  font-family: Segoe UI;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.8);
  transition: background-color 0.3s ease;
}

input.form-control:focus {
  color: rgba(0, 0, 0, 1);
}

input.form-control::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

label {
  position: absolute;
  top: 50%;
  left: 10px;
  font-family: Segoe UI;
  font-size: 10px;
  color: #474747;
  pointer-events: none;
  transform: translateY(-50%);
  transition: 0.3s ease all;
}

label.active {
  top: -10px;
  font-size: 12px;
  color: #B70536;
}

.password-input-wrapper {
  position: relative;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  font-family: Segoe UI;
  color: #057fe2;

}

.remember-me input[type="checkbox"] {
  margin-right: 5px;
}

.forgot-password {
  font-size: 12px;
  font-family: Segoe UI;
  color: #057fe2;
}

.forgot-password a {
  color: #057fe2;
  text-decoration: none;
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
  width: 80%;
  height: 80%;
  object-fit: contain;
  margin-top: 4px;
}

.login-button {
  background-color: #B70536;
  color: white;
  padding: 10px;
  width: 40%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 240px;
  font-family: Verdana;
}

.login-button:hover {
  background-color: #a00025;
}

.error-popup {
  color: white;
  background-color: #d60000;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
  margin-bottom: 8px;
  font-family: Verdana;
  font-size: 12px;
  margin-bottom: 40px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.success-popup {
  color: white;
  background-color: green;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
  margin-bottom: 8px;
  font-family: Verdana;
  font-size: 12px;
  margin-bottom: 40px;
}

.fade-out {
  opacity: 0;
  animation: fadeOut 0.5s ease-in-out;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>