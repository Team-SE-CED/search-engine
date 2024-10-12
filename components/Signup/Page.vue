<template>
  <div class="header"></div>
  <div class="container">
    <div class="logo">
      <img src="~assets/static-images/su-logo.png" alt="Logo" class="logo-img" />
    </div>
    <form class="signup-form" @submit.prevent="createAccount">
      <div class="form-row">
        <input type="text" class="input-field" v-model="name" placeholder="Name" />
        <input type="text" class="input-field" v-model="idnum" placeholder="ID no." />
      </div>
      <input type="text" class="input-field" v-model="course" placeholder="Course" />
      <input type="email" class="input-field" v-model="email" placeholder="Email" />

      <div class="form-group">
        <div class="password-input-wrapper">
          <input :type="passwordInputType" id="password" v-model="password" class="input-field" placeholder="Password" required />
          <div class="eye-icon" v-if="password.length > 0" @click="togglePassword">
            <img :src="eyeIcon" id="eyeicon" />
          </div>
        </div>
        <div class="password-strength-bar">
          <div :class="['strength-indicator', passwordStrengthClass]" :style="{ width: passwordStrengthPercentage + '%' }"></div>
        </div>
      </div>
      <div :class="{'error-popup': true, 'fade-out': fadeOut}" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="success-popup" v-if="successMessage"> {{ successMessage }} </div>
      <button type="submit" class="signup-btn">SIGN UP</button>
      
    </form>
    
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
const name = ref('');
const idnum = ref('');
const course = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const fadeOut = ref(false);

async function createAccount() {
  try {
    fadeOut.value = false;
    const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
         name: name.value,
         idnum: idnum.value,
         course: course.value,
       }
     }
    })
    
    if (error) {
      errorMessage.value = "User already registered."
      setTimeout(() => {
        fadeOut.value = true;
        setTimeout(() => {
          errorMessage.value = "";
          fadeOut.value = false;
        }, 500);
      }, 3000);
      return;
    }
    
    else {
      successMessage.value = "Success! Check your email for confirmation";
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    }
  } catch (error) {
      console.log(error);
      errorMessage.value = "Something went wrong. Try again.";
  }
}

const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'));
const eyeIcon = computed(() => (showPassword.value ? eyeOpen : eyeClose));

const passwordStrength = computed(() => {
const length = password.value.length;
  if (length > 16) return 'strong';
  if (length > 12) return 'medium';
  if (length > 8) return 'weak';
  return 'very-weak';
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
</script>


<style scoped>

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

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.logo {
  margin-bottom: 30px;
}

.logo-img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}

.signup-form {
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 101%;
}

.input-field {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: Segoe UI;
}

.signup-btn {
  background-color: #c40030;
  color: white;
  padding: 10px;
  width: 101%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: Verdana;
}

.signup-btn:hover {
  background-color: #a00025;
}

.password-input-wrapper {
  position: relative;
}

.eye-icon img {
  width: 80%;
  height: 80%;
  object-fit: contain;
  margin-top: -1px;
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

.error-popup {
  color: white;
  background-color: red;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.success-popup {
  color: white;
  background-color: green;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.password-strength-bar {
  background-color: #ffffff;
  height: 5px;
  border-radius: 5px;
  margin-top: -5px;
  margin-bottom: 20px;
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
