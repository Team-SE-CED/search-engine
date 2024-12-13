<template>
    <div class="sidebar text-white d-flex flex-column">
      <div class="header d-flex align-items-center justify-content-between mb-5 py-4 px-5">
        <span class="nav-text">NAVIGATE TO</span>
        <span class="line"></span>
      </div>
      <ul class="menu list-unstyled px-5">
        <li class="d-flex flex-column align-items-start mb-4">
          <div class="number">01.</div>
          <div class="menu-text">Home</div>
        </li>
        <li class="d-flex flex-column align-items-start mb-4">
          <div class="number">02.</div>
          <div class="menu-text">Database</div>
        </li>
        <li class="d-flex flex-column align-items-start mb-4">
          <div class="number">03.</div>
          <div class="menu-text">Contact</div>
        </li>
        <li class="d-flex flex-column align-items-start mb-4">
          <div class="number">04.</div>
          <div class="menu-text">Feedback</div>
        </li>
        <li class="d-flex flex-column align-items-start mb-4">
          <div class="number">05.</div>
          <div class="menu-text" @click="logout">Logout</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  const client = useSupabaseClient();
  const router = useRouter();
  async function logout() {
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.log(error.message);
    }
    finally {
      alert("Logged Out Successfully!");
      router.push('/login');
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 400px;
    height: 100vh;
    background-color: #800000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100000;
    font-family: "Segoe UI";
    box-shadow: -2px 0 25px rgba(0, 0, 0, 0.6);
    transition: box-shadow 0.3s ease-in-out;
  }
  
  .header .line {
    width: 130px;
    height: 2px;
    background-color: white;
    margin-right: 15px;
  }
  
  .nav-text {
    font-size: 20px;
    font-weight: 500;
  }
  
  .menu li {
    font-weight: 500;
    cursor: pointer;
    position: relative;
  }
  
  .menu li:hover .menu-text {
    color: rgb(230, 50, 18); 
    transform: translate(5px, -5px) scale(1.1);
    transition: transform 0.5s ease, color 0.5s ease;
  }
  
  .menu li:active .menu-text {
    transform: translate(20px, -5px) scale(1);
    transition: transform 0.5s ease;
  }
  
  .number {
    font-size: 15px;
    color: rgb(255, 205, 205);
  }
  
  .menu-text {
    font-size: 35px;
    transition: color 2s ease, transform 1.5s ease;
  }
  </style>
  