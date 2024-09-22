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
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="form-control"
              placeholder=""
              required
            />
            <span @click="togglePasswordVisibility" class="toggle-password">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
            <div class="password-strength-bar">
              <div
                :class="['strength-indicator', passwordStrengthClass]"
                :style="{ width: passwordStrengthPercentage + '%' }"
              ></div>
            </div>
          </div>

          <button type="submit" class="login-button">LOG IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  computed: {
    passwordStrength() {
      const length = this.password.length;
      if (length > 15) return "strong";
      if (length > 12) return "medium";
      if (length > 8) return "weak";
      return "very-weak";
    },
    passwordStrengthPercentage() {
      const length = this.password.length;
      if (length > 15) return 100;
      if (length > 12) return 75;
      if (length > 8) return 50;
      return length > 0 ? 25 : 0;
    },
    passwordStrengthClass() {
      return this.passwordStrength;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    login() {
      console.log("Logging in with", this.email, this.password);
    },
  },
};
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

label {
  display: block;
  text-align: left;
  margin-bottom: 8px;
  font-weight: bold;
  color: #7a1f32;
}

.form-control {
  width: 95%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #999;
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
