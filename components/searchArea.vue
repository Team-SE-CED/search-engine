<template>
    <div>
        <form class="container" action="/" method="GET">
            <div class="position-relative">
                <img class="search-icon" src="/assets/img/search-icon.png" />
                <div class="vertical-line"></div>
                <input class="form-control form-control-lg pl-5 search-input" type="text" name="search" placeholder="Search..." autocomplete="off" />
            <div class="filter-dropdown dropdown">
            <button class="btn dropdown-toggle" type="button" @click="toggleDropdown">
                Filters
            </button>
            <ul class="dropdown-menu" :class="{ 'show': isOpen }">
                <li><NuxtLink class="dropdown-item" to="#">Architecture</NuxtLink></li>
                <li><NuxtLink class="dropdown-item" to="#">Civil</NuxtLink></li>
                <li><NuxtLink class="dropdown-item" to="/login-page">Computer</NuxtLink></li>
                <li><NuxtLink class="dropdown-item" to="#">Mechanical</NuxtLink></li>
                <li><NuxtLink class="dropdown-item" to="#">Electrical</NuxtLink></li>
            </ul>
        </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
const isOpen = ref(false); // Reactive state for dropdown visibility

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event:any) => {
  const dropdownElement = document.querySelector('.dropdown');
  if (dropdownElement && !dropdownElement.contains(event.target)) {
    isOpen.value = false; // Close the dropdown when clicked outside
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped>
.container{
    width: 60%;
}
.form-control{
    border-color: gray;
    border-radius: 50px;
    height: 80px;
}
.filter-dropdown {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
}
button.dropdown-toggle:focus {
    border: none;
}

.dropdown-menu {
    padding: 10px 0;
    font-size: 16px; /* Adjust the font size */
}
button.dropdown-toggle {
    font-size: 20px; /* Adjust font size as needed */
}
.search-icon {
    position: absolute;
    left: 30px; /* Adjust this value to your needs */
    top: 50%;
    transform: translateY(-50%);
    height: 50px; /* Adjust size of the image */
    pointer-events: none; /* To prevent image from being clickable */
}

input.form-control {
    padding-left: 100px; /* Adjust this value based on the image size */
    padding-right: 150px;
}
input:focus {
    outline: none;
    border-color: #b70536;
    box-shadow: 0 0 8px rgba(167, 44, 25, 0.931);
}
.vertical-line {
    position: absolute;
    right: 130px; 
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 1px;
    background-color: #484848; 
}
</style>