<template>
  <body>
  <div class="container">
    <div class="split left" @click.native="goToLogin">
      <div class="content">
        <h1 class="login-text">LOG IN</h1>
      </div>
    </div>
    <div class="logo">
      <img src="~assets/static-images/su-logo.png" alt="Center Logo" />
    </div>
    <div class="split right" @click.native="goToSignup" >
      <div class="content" >
        <h1 class="signup-text">SIGN UP</h1>
      </div>
    </div>
  </div>
  </body>
</template>

<script setup lang="ts">
const router = useRouter()
const goToLogin = () => {
  router.push('/login')
}
const goToSignup = () => {
  router.push('/signup')
}

</script>


<style scoped>

body,html {
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
}

.split {
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  background-color: #B70536; 
}

.right {
  background-color: #f8f8f8; 
}

.login-text {
  font-size: 3rem;
  color: white;
  font-weight: bold;
}

.signup-text {
  font-size: 3rem;
  color: #B70536;
  font-weight: bold;
}

.logo {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
