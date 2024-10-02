<template>
  <div class="container" @click.native="goToPage">
    <div class="image-text">
      <img src="~assets/static-images/su-logo.png" alt="logo" class="animate-logo" />
      <div class="separator animate-separator"></div>
      <div class="text-content animate-text">
        <h1>CED - OLIS</h1>
        <h1>RESEARCH CATALOG</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter()

const goToPage = () => {
  router.push('/')
}
onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 5000)
})

</script>


<style scoped>
body {
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background-color: #B70536;
}

.image-text {
  display: flex;
  align-items: center;
}

.animate-logo {
  width: 450px;
  margin-right: 20px;
  opacity: 0;
  transform: scale(0.8);
  animation: morphLogo 2.5s ease-out forwards;
  animation-delay: 2s;
}

.animate-separator {
  border-left: 7px solid white;
  height: 190px;
  margin-right: 30px;
  margin-left: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: morphSeparator 2s ease-in forwards;
  animation-delay: 0s;
}

.animate-text {
  color: white;
  text-align: left;
  opacity: 0;
  transform: scale(0.9);
  animation: morphText 2.5s ease-out forwards;
  animation-delay: 2s;
}

h1 {
  font-size: 60px;
  font-family: Segoe UI;
  margin: 0;
}

@keyframes morphLogo {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes morphSeparator {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  50% {
    opacity: 0.5;
    transform: scaleY(1.2);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes morphText {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>