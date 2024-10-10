<template>
    <div class="container">
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
              <img src="~assets/static-images/search-eye.png" alt="Search Icon" class="search-icon"/>
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
          <div class="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
  
      <main class="main-content">
        <div class="paper">
          <div class="paper-header">
            <div class="paper-image">
              <img src="~assets/static-images/bear.png" alt="Paper Image" />
            </div>
            <div class="paper-details">
              <h2 class="paper-title">
                Face and Eye Detection Using Skin Color and Viola-Jones 
                Detector with a Focus on Masked Faces 
              </h2>
              <div class="year-tags">
                <span class="year">2024</span>
                <span class="tag-ce">CE</span>
                <span class="tag-python">Python</span>
              </div>
              <div class="authors">
                <strong>Authors:</strong> Chini, Chan • China, Ching • Choco, Chong
              </div>
            </div>
          </div>
  
          <div class="paper-details-row">
            <div></div>
            <div class="actions">
              <button class="btn">
                <LineMdDownloadingLoop />
                Request full-text PDF
              </button>

              <button class="btn">
              <img src="~assets/static-images/copy.png" alt="PDF Icon" class="btn-icon" />
                Copy Citation
              </button>
            </div>
          </div>

          <div class="line-separator"></div>
  
          <div class="abstract">
            <h3>Abstract</h3>
            <p>
              In this paper, we proposed a robust face and eye detection method based on skin color and 
              the Viola-Jones detector. First the images are segmented into skin region and non-skin region. 
              Then, the faces are detected using a Viola-Jones face detector applied only to the skin regions. 
              Then, in the detected faces we applied a Viol-Jones eye detector on the non-skin regions to 
              localize the position of the eyes. The results obtained show that our method is robust and 
              provides superior performance compared to other recently published methods. In this paper, we 
              proposed a robust face and eye detection method based on skin color and 
              the Viola-Jones detector. First the images are segmented into skin region and non-skin region. 
              Then, the faces are detected using a Viola-Jones face detector applied only to the skin regions. 
              Then, in the detected faces we applied a Viol-Jones eye detector.
            </p>
          </div>
        </div>
      </main>
    </div>
</template>

<script setup lang="ts">
import LineMdDownloadingLoop from '~/assets/svg-images/LineMdDownloadingLoop.vue'; 
</script>

    
<style scoped>

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
}
  
.header {
  background-color: #b70000;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 100%;
}
  
.left-content {
    display: flex;
    align-items: center;
    gap: 15px;
}
  
  .logo img {
    width: 55px;
    height: 55px;
    margin-left: 20px;
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
  width: 550px; 
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
    color: #333;
    cursor: pointer;
  }
  
  .right-content {
    display: flex;
    margin-right: 20px;
  }
  
  .menu-icon {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .menu-icon span {
    height: 3px;
    width: 25px;
    background-color: white;
    margin: 3px 0;
  }
  
  .main-content {
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .paper {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
}

  .paper-header {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  
  .paper-image {
    width: 250px; 
    height: 250px; 
    background-color: #e0e0e0;
    border-radius: 8px;
    flex-shrink: 0;
  }
  
  .paper-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .paper-title {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: Segoe UI;
  }
  
  .year-tags {
    display: flex;
    gap: 10px;
  }
  
  .year {
    padding: 5px 10px;
    border: 2px solid #B70536; 
    border-radius: 5px;
    font-size: 12px;
    font-family: Verdana;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    color: #B70536;
  }
  
  .tag-ce {
    padding: 5px 10px;
    border: 2px solid blue; 
    border-radius: 5px;
    font-size: 12px;
    font-family: Verdana;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    color: blue;
  }
  
  .tag-python {
    padding: 5px 10px;
    border: 2px solid green;
    border-radius: 5px;
    font-size: 12px;
    font-family: Verdana;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    color: green;
  }
  
  .filter-container {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  
  .filter {
    font-size: 14px;
    color: #8d8d8d; 
    cursor: pointer;
    margin-left: 2px;
  }
  
  .arrow-down {
    margin-left: 30px;
    border: solid #B70536; /* Red color for arrow */
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  
  .paper-details-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }
  
  .authors {
    margin: 30px 0; 
    font-family: Segoe UI;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: flex-start; 
  }
  
  .actions .btn {
    display: flex;
    align-items: center; 
    padding: 10px 15px;
    background-color: #b70000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Verdana;
  }
  
  .actions .btn:hover {
    background-color: #900000;
  }
  
  .line-separator {
    height: 2px;
    background-color: #ccc;
    opacity: 0.5;
    margin: 10px 0;
  }

  .btn-icon {
    width: 24px; 
    height: 24px;
  margin-right: 5px;  
}

.btn:hover {
  background-color: #900000; 
}
  

  .abstract p {
    font-size: 14px;
    line-height: 1.8;
    font-family: Segoe UI;
  }
  
</style>  