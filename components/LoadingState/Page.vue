<template>
  <body>
    <header class="header">
      <div class="left-content">
        <div class="logo">
          <img src="~assets/static-images/su-logo.png" alt="Logo" />
        </div>
        <div class="title">
          <h1 class="research-title">RESEARCH</h1>
          <h1 class="catalog-title">CATALOG</h1>
        </div>
      </div>

      <div class="center-content">
        <div class="search-container">
          <div class="search-bar">
            <img src="~assets/static-images/search-eye.png" alt="Search Icon" class="search-icon" />
            <input type="text" placeholder="Search" class="search-input" />
            <div class="filter-container">
              <span class="separator"></span>
              <span class="filter">Filters</span>
              <span class="arrow-down"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-content">
        <div class="menu-icon" > 
          <LineMdMenu/>
        </div>
      </div>
    </header>
    <div class="cup">
      <span class="steam"></span>
      <span class="steam"></span>
      <span class="steam"></span>
      <div class="cup-handle"></div>
    </div>
    <div class="text">
         <h2> You're offline. </h2>
         <h2> Have a coffee break! </h2>
      </div>
  </body>
</template>

<script setup lang="ts">
import LineMdMenu from '~/assets/svg-images/LineMdMenu.vue'; 
</script>

<style scoped>
* {
  box-sizing: border-box;
}

  body {
    height: 100vh;
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    overflow-x: hidden;
  }

  .header {
    background-color: #B70536;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .logo img {
    width: 55px;
    height: 55px;
    margin-left: 10px;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .research-title,
  .catalog-title {
    font-size: 14px;
    margin: 0;
    line-height: 1.5;
    letter-spacing: 1.5px;
    font-family: Segoe UI;
  }

  .center-content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }


  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .search-bar {
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 1px solid #ccc;
    padding: 8px;
    margin-right: 100px;
    background-color: white;
    width: 570px;
    position: relative;
  }

  .search-icon {
    width: 30px;
    height: 30px;
    margin-right: 1px;
  }

  .search-input {
    flex-grow: 1;
    border: none;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 36px;
  }

  .search-input:focus {
    outline: none;
  }

  .filter-container {
    display: flex;
    align-items: center;
  }

  .separator {
    width: 1px;
    height: 20px;
    background-color: #ccc;
    margin-right: 10px;
  }

  .filter {
  font-size: 14px;
  color: #8d8d8d; 
  cursor: pointer;
  margin-left: 2px;
}

  .right-content {
  display: flex;
  margin-right: 10px;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

  .arrow-down {
    margin-left: 30px;
    border: solid #b70536;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .cup {
    position: relative;
    width: 220px;
    height: 180px;
    border: 8px solid #ffffff;
    box-shadow: 0 0 0 12px #352a22;
    border-radius: 10px 10px 60px 75px;
    background: url('@/assets/static-images/kape.png');
    background-repeat: repeat-x;
    background-position: 0 130px;
    animation: filling 10s infinite;
    margin: 290px auto 0;
    
  }

  @keyframes filling {
    0%,
    100% {
      background-position: 0 130px;
    }
    50% {
      background-position: 600px -70px;
    }
  }

  .cup .cup-handle {
    position: absolute;
    top: 10px;
    right: -74px;
    width: 65px;
    height: 120px;
    border: 12px solid #352a22;
    border-radius: 20px 10px 50px 20px;
  }

  .cup .steam {
    position: absolute;
    border-radius: 10px 2px;
    width: 10px;
    animation: steaming 3s infinite;
  }

  @keyframes steaming {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      filter: blur(0.8px);
      transform: translateY(-10px);
    }
  }

  .cup .steam:nth-child(1) {
    top: -70px;
    left: 65px;
    height: 30px;
    background: #8e5a3423;
    animation-delay: 0.2s;
  }

  .cup .steam:nth-child(2) {
    top: -120px;
    left: 95px;
    height: 50px;
    background: #8e5a3454;
    animation-delay: 0.6s;
  }

  .cup .steam:nth-child(3) {
    top: -90px;
    left: 125px;
    height: 40px;
    background: #8e5a3433;
    animation-delay: 1s;
  }

  .text {
    font-family: Segoe UI;
    font-size: 15px;
    color: #a0a0a0;
    text-align: center;
    line-height: 3.5; 
    letter-spacing: 2.5px;
    margin-top: 30px;
    margin-left: 15px;

  }
</style>
