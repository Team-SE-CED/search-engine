<template>
    <div class="login-page">
      <div class="login-box">
        <div class="login-logo">

        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Silliman E-mail</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder=""
              required
            />
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              placeholder=""
              required
            />
            <small class="password-strength">Password strength: Strong</small>
          </div>
  
          <button type="submit" class="login-button">LOG IN</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {

        console.log("Logging in with", this.email, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f8f8;
  }
  
  .login-box {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  .login-logo img {
    width: 100px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    text-align: left;
    margin-bottom: 8px;
    font-weight: bold;
    color: #7a1f32;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .login-button {
    background-color: #7a1f32;
    color: white;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .login-button:hover {
    background-color: #5f1728;
  }
  
  .password-strength {
    display: block;
    text-align: left;
    font-size: 12px;
    color: #e0a22e;
  }
  </style>
  