<template>
  <body>
    <div class="container">
      <div class="split left" @click.native="goToLogin">
        <div class="content">
          <h1 class="login-text">LOG IN</h1>
        </div>
      </div>
      <div class="split right" @click.native="goToSignup">
        <div class="content">
          <h1 class="signup-text">SIGN UP</h1>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
const router = useRouter();
const goToLogin = () => {
  router.push("/login");
};
const goToSignup = () => {
  router.push("/signup");
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  font-family: Segoe UI;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.split {
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.5s ease, background-color 0.5s ease;
}

.left {
  background-color: #99012c;
}

.right {
  background-color: #f8f8f8;
}

.login-text,
.signup-text {
  font-size: 3rem;
  font-weight: bold;
  transition: transform 0.5s ease, color 0.5s ease;
  font-family: Segoe UI;
}

.login-text {
  color: white;
}

.signup-text {
  color: #b70536;
}

.left:hover {
  width: 80%;
}

.right:hover {
  width: 80%;
}

.left:hover .login-text {
  transform: scale(1.5);
  transition: transform 0.5s ease;
}

.right:hover .signup-text {
  transform: scale(1.5);
  transition: transform 0.5s ease;
}

.content {
  position: relative;
}
</style>
