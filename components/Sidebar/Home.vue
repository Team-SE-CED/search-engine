<template>
    <div class="sidebar">
      <div class="header">
        <span class="nav-text">NAVIGATE TO</span>
        <span class="line"></span>
      </div>
      <ul class="menu">
        <li>
          <div class="number">01.</div>
          <div class="menu-text">Profile</div>
        </li>
        <li>
          <div class="number">02.</div>
          <div class="menu-text">Request</div>
        </li>
        <li>
          <div class="number">03.</div>
          <div class="menu-text">Contact</div>
        </li>
        <li>
          <div class="number">04.</div>
          <div class="menu-text">Feedback</div>
        </li>
        <li>
          <div class="number">05.</div>
          <div class="menu-text">Logout</div>
        </li>
      </ul>
    </div>
</template>
  
<style scoped>

  .sidebar {
    width: 350px;
    height: 100vh;
    background-color: #A2042F;
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
    margin-bottom: 70px;
    margin-top: -30px; 
  }
  
  .line {
    width: 160px;
    height: 2px;
    background-color: white;
    margin-right: 15px;
  }
  
  .nav-text {
    font-size: 20px;
    font-weight: 500;
  }
  
  .menu {
    list-style: none;
    padding: 0;
  }
  
  .menu li {
    margin-bottom: 30px;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
  }
  
  .menu li:hover .menu-text {
    color: rgb(0, 0, 0); 
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
  