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
            <div class="input-wrapper">
              <label :class="{ active: email.length > 0 || isEmailFocused }" for="email">Silliman Email</label>
              <input type="email" id="email" v-model="email" class="form-control" @focus="isEmailFocused = true"
                @blur="isEmailFocused = email.length > 0" required />
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <label :class="{ active: password.length > 0 || isPasswordFocused }" for="password">Password</label>
              <input :type="passwordInputType" id="password" v-model="password" class="form-control"
                @focus="isPasswordFocused = true" @blur="isPasswordFocused = password.length > 0" required />
              <div class="eye-icon" v-if="password.length > 0" @click="togglePassword">
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

async function login() {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    
    if (error) {
      alert(error.message);
    };

    router.push("/welcome");
    console.log("Logging in with", email.value, password.value);
    alert("Logged in successfully!");

  } catch (error: any) {
    alert("Invalid Login Credentials!");
    // errorMsg.value = error.message;
  }
}

const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'));
const eyeIcon = computed(() => (showPassword.value ? eyeOpen : eyeClose));

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
</style>