<template>
  <div class="login-page">
    <div class="header"></div>
    <div class="login-container">
      <div class="login-box">
        <h2 class="olis-title">Create an account</h2>
        <form @submit.prevent="signUp">
          <!-- Name Input -->
          <div class="form-group">
            <div class="success-popup" v-if="successMessage">
              {{ successMessage }}
            </div>
            <div class="input-wrapper">
              <label :class="{ active: isNameActive }" for="name">Name</label>
              <input
                type="text"
                id="name"
                v-model="name"
                class="form-control"
                @focus="isNameFocused = true"
                @blur="isNameFocused = false"
                required
              />
            </div>
          </div>

          <!-- ID Number Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <label :class="{ active: isIdNumActive }" for="idnum"
                >ID No.</label
              >
              <input
                type="text"
                id="idnum"
                v-model="idnum"
                class="form-control"
                @focus="isIdNumFocused = true"
                @blur="isIdNumFocused = false"
                required
              />
            </div>
          </div>

          <!-- Course Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <label :class="{ active: isCourseActive }" for="course"
                >Course</label
              >
              <input
                type="text"
                id="course"
                v-model="course"
                class="form-control"
                @focus="isCourseFocused = true"
                @blur="isCourseFocused = false"
                required
              />
            </div>
          </div>

          <!-- Email Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <label :class="{ active: isEmailActive }" for="email"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                @focus="isEmailFocused = true"
                @blur="isEmailFocused = false"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <label :class="{ active: isPasswordActive }" for="password"
                >Password</label
              >
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control"
                @focus="isPasswordFocused = true"
                @blur="isPasswordFocused = false"
                required
              />
              <div class="eye-icon" v-if="hasPassword" @click="togglePassword">
                <img
                  :src="showPassword ? eyeOpen : eyeClose"
                  alt="Toggle Password"
                />
              </div>
            </div>
            <div class="password-strength-bar">
              <div
                :class="['strength-indicator', passwordStrengthClass]"
                :style="{ width: passwordStrengthPercentage }"
              ></div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            :class="{ 'error-popup': true, 'fade-out': fadeOut }"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button type="submit" class="login-button">Sign Up</button>

          <!-- Login Link -->
          <div class="register">
            <span>Already have an account?</span>
            <a href="/login">Log In</a>
          </div>
        </form>
      </div>
    </div>
    <div class="trademark">2024 © OLIS - Online Library Information System</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import eyeOpen from "@/assets/static-images/eye-open.png";
import eyeClose from "@/assets/static-images/eye-close.png";

// Initialize Supabase and Router
const client = useSupabaseClient();
const router = useRouter();

// Form State Variables
const name = ref("");
const idnum = ref("");
const course = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);

// Focus State Variables
const isNameFocused = ref(false);
const isIdNumFocused = ref(false);
const isCourseFocused = ref(false);
const isEmailFocused = ref(false);
const isPasswordFocused = ref(false);

// Feedback Messages
const errorMessage = ref("");
const fadeOut = ref(false);
const successMessage = ref("");

// Password Strength Computed Properties
const passwordStrength = computed(() => {
  const length = password.value.length;
  if (length > 16) return "strong";
  if (length > 12) return "medium";
  if (length > 8) return "weak";
  return "very-weak";
});

const passwordStrengthPercentage = computed(() => {
  const length = password.value.length;
  if (length > 16) return "100%";
  if (length > 12) return "75%";
  if (length > 8) return "50%";
  if (length > 0) return "25%";
  return "0%";
});

const passwordStrengthClass = computed(() => passwordStrength.value);

// Field Active/Focus States
const isNameActive = computed(
  () => name.value.length > 0 || isNameFocused.value
);
const isIdNumActive = computed(
  () => idnum.value.length > 0 || isIdNumFocused.value
);
const isCourseActive = computed(
  () => course.value.length > 0 || isCourseFocused.value
);
const isEmailActive = computed(
  () => email.value.length > 0 || isEmailFocused.value
);
const isPasswordActive = computed(
  () => password.value.length > 0 || isPasswordFocused.value
);
const hasPassword = computed(() => password.value.length > 0);

// Signup Logic
async function signUp() {
  try {
    fadeOut.value = false;
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          name: name.value,
          id_number: idnum.value,
          course: course.value,
        }
      }
    })

    // Validate Input
    if (!email.value || !password.value) {
      errorMessage.value = "Please fill in all required fields.";
      setTimeout(() => {
        fadeOut.value = true;
        setTimeout(() => {
          errorMessage.value = "";
          fadeOut.value = false;
        }, 500);
      }, 3000);
      return;
    }

    // Simulate Successful Login
    successMessage.value = "Success! Check your email for confirmation.";
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
  }
}

// Toggle Password Visibility
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
  background-color: #800000;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  z-index: 10;
}

.login-box {
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(100px);
  border: 1px solid rgba(255, 255, 255, 1);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-width: 400px;
  width: 100%;
  transition: box-shadow 0.5s ease-in-out;
}

.form-group {
  margin-bottom: -10px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 38px;
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
  color: #838282;
  pointer-events: none;
  transform: translateY(-50%);
  transition: 0.3s ease all;
  font-size: 15px;
}

label.active {
  top: -10px;
  font-size: 12px;
  color: #b70536;
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
  font-size: 12px;
  font-family: Segoe UI;
  color: #057fe2;
}

.remember-me input[type="checkbox"] {
  margin-right: 15px;
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
  background-color: #b70536;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  font-family: Verdana;
  margin-top: 5px;
}

.login-button:hover {
  background-color: #a00025;
}

.trademark {
  font-family: Segoe UI;
  color: white;
  font-size: 11px;
  margin-top: 20px;
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
  margin-bottom: 20px;
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
  margin-bottom: 20px;
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

.olis-title {
  font-size: 30px;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(-45deg, #b5364b, #ff9500, #b5364b);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: rainbowAnimation 2s linear infinite;
  font-family: Segoe UI;
  margin-bottom: 40px;
}

@keyframes rainbowAnimation {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: -200%;
  }
}

.register {
  margin-top: 15px;
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  text-align: center;
  color: #474747;
}

.register span {
  color: #6c6c6c;
}

.register a {
  color: #b70536;
  font-weight: bold;
  text-decoration: none;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.register a:hover {
  color: #a00025;
}
.password-strength-bar {
  background-color: #ffffff;
  height: 5px;
  border-radius: 5px;
  margin-top: -38px;
  margin-bottom: 25px;
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
