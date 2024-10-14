<template>
  <div class="sidebar">
    <div class="header">
      <LineMdArrowLeft class="icon left-arrow" />
      <span class="nav-text">Profile</span>
      <span class="line"></span>
      <LineMdLogout class="icon signout" />
    </div>
    <h1 class="title">CHANG CHINA CHO</h1>
    <p class="number">18-3-07911</p>

    <div class="change-password-section">
      <h2 class="subtitle">Change Password</h2>
      <form @submit.prevent="handleSubmit">
        <input type="password" placeholder="Current Password" class="password-input" />
        <input type="password" placeholder="New Password" class="password-input" />
        <input type="password" placeholder="Confirm Password" class="password-input" />
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineMdArrowLeft from '~/assets/svg-images/LineMdArrowLeft.vue'; 
import LineMdLogout from '~/assets/svg-images/LineMdLogout.vue';

const handleSubmit = () => {
  alert('Password change submitted, Please login again :)');
};
</script>

<style scoped>

.sidebar {
  width: 350px;
  height: 100vh;
  background-color: #a2042f;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 50px;
  color: white;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  font-family: Segoe UI;
  box-shadow: -2px 0 25px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease-in-out;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px; 
  margin-top: -30px; 
}

.line {
  width: 150px;
  height: 2px;
  background-color: white;
  margin: 0 15px;
  opacity: 0;
  animation: lineExpand 1s forwards;
}

.nav-text {
  font-size: 20px;
  font-weight: 500;
}

.icon {
  width: 24px;
  height: 24px;
}

.title {
  font-size: 32px;
  margin: 0;
  margin-top: 50px;
}

.number {
  font-size: 14px;
  color: #ffffff;
  margin-top: 5px;
}

.change-password-section {
  margin-top: 100px; 
}

.subtitle {
  font-size: 20px;
  margin-bottom: 20px;
  color: #ffffff;
}

.password-input {
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 7px;
  border: none;
  font-size: 15px;
  background-color: #f0f0f0;
}

.submit-button {
  width: 95%;
  padding: 10px;
  background-color: #f0f0f0;
  color: #791f1f;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 7px;
  font-family: Verdana;
}

.submit-button:hover {
  background-color: #8c2424;
}

@keyframes lineExpand {
  0% {
    width: 0;
    opacity: 0;
  }

  100% {
    width: 150px;
    opacity: 1;
  }
}

</style>
