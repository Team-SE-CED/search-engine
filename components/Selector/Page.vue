<template>
  <body>
    <div class="container">
      <div class="split left">
        <div class="content">
          <h1 class="login-text">LOG IN</h1>
        </div>
      </div>
      <div class="logo">
        <img src="~assets/static-images/su-logo.png" alt="Center Logo" />
      </div>
      <div class="split right">
        <div class="content">
          <h1 class="signup-text">SIGN UP</h1>
        </div>
      </div>
    </div>
  </body>
</template>


<style scoped>
body, html {
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
}

.split {
  width: 50%; 
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.4s ease, background-color 0.4s ease;
}

.left {
  background-color: #B70536;
}

.right {
  background-color: #f8f8f8;
}

.login-text, .signup-text {
  font-size: 3rem;
  font-weight: bold;
  transition: transform 0.4s ease, color 0.4s ease;
  font-family: Segoe UI;
}

.login-text {
  color: white;
}

.signup-text {
  color: #B70536;
}

.left:hover {
  width: 70%;
}

.right:hover {
  width: 70%;
}

.left:hover .login-text {
  transform: scale(1.3);
  transition: transform 0.4s ease;
}

.right:hover .signup-text {
  transform: scale(1.3);
  transition: transform 0.4s ease;
}

.content {
  position: relative;
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
