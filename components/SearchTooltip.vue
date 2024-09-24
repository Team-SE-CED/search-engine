<template>
  <div class="research-catalog">
    <div class="grid">
      <div 
        v-for="(research, index) in researchList" 
        :key="index" 
        class="research-item"
        @mouseover="showInfo(index)"
        @mouseleave="hideInfo"
      >
        <div class="card">
          <img src="~assets/static-images/crop.jpg" class="card-img" alt="">
          <div class="card-body">
            <h1 class="card-title">Research {{ index + 1 }}</h1>
            <p class="card-sub-title">{{ research.title }}</p>
            <p class="card-info">{{ research.date }}</p>
            <button class="card-btn">More Info</button>
          </div>
        </div>

        <!-- Hover Info -->
        <div v-if="hoverIndex === index" class="hover-info">
          <h4>{{ research.title }}</h4>
          <p>{{ research.date }}</p>
          <p>{{ research.authors.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverIndex: null,
      researchList: [
        {
          title: "Occupational Health and Safety Management",
          date: "April 5, 2018",
          authors: ["Nimar", "Gary", "Aaron"]
        },
        {
          title: "Environmental Science and Management",
          date: "June 12, 2020",
          authors: ["Alice", "Bob", "Charlie"]
        },
        {
          title: "Data Science in Public Health",
          date: "January 15, 2021",
          authors: ["David", "Eva", "Frank"]
        }
      ]
    };
  },
  methods: {
    showInfo(index) {
      this.hoverIndex = index;
    },
    hideInfo() {
      this.hoverIndex = null;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  background: #36768c;
  font-family: 'roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.research-catalog {
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Changed to 3 columns */
  gap: 20px;
}

.research-item {
  position: relative;
}

.card {
  width: 320px;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  border: 8px solid #fff;
  position: relative;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.card-body {
  width: 100%;
  height: 100%;
  top: 0;
  right: -100%;
  position: absolute;
  background: #1f3d4738;
  backdrop-filter: blur(5px);
  border-radius: 15px;
  color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 2s;
}

.card:hover .card-body {
  right: 0;
}

.card-title {
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 500;
}

.card-sub-title {
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 300;
}

.card-info {
  font-size: 16px;
  line-height: 25px;
  margin: 40px 0;
  font-weight: 400;
}

.card-btn {
  color: #1f3d47;
  background: #8fabba;
  padding: 10px 20px;
  width: 120px;
  border-radius: 5px;
  text-transform: capitalize;
  border: none;
  outline: none;
  font-weight: 500;
  cursor: pointer;
}

.hover-info h4 {
  margin: 0;
  font-size: 14px;
}

.hover-info p {
  margin: 5px 0;
  font-size: 12px;
}
</style>

//hover-info 
  position: absolute;
  top: 10px;
  left: 110px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
