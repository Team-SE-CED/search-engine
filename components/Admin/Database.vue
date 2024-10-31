<template>
  <div class="container mt-4 custom-bottom-margin">
    <header class="header">
      <div class="left-content">
        <div class="logo">
          <img src="~assets/static-images/su-logo.png" alt="Logo" />
        </div>
        <div class="title">
          <h1 class="research-title">ADMIN</h1>
          <h1 class="catalog-title">DATABASE</h1>
        </div>
      </div>
      <div class="right-content">
        <div class="menu-icon">
          <LineMdMenu />
        </div>
      </div>
    </header>

    <div class="search-bar-container" style="margin-top: 120px">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex w-50 position-relative">
          <input
            type="text"
            class="form-control search-bar"
            placeholder="Find..."
          />
          <img
            src="assets/static-images/search-eye.png"
            alt="Search Icon"
            class="search-icon"
          />
          <button
            class="btn btn-outline-secondary custom-btn"
            @click="toggleFilter"
            ref="filterButton"
          >
            <img
              src="assets/static-images/filter.png"
              alt="Filter Icon"
              class="filter-icon"
            />
          </button>

          <div v-show="showFilter" class="filter-dropdown">
            <div class="filter-option">
              <input type="checkbox" id="name-filter" v-model="filters.name" />
              <label for="name-filter">Show all columns</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="date-filter" v-model="filters.date" />
              <label for="date-filter">Name</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="date-filter" v-model="filters.date" />
              <label for="date-filter">Email</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="date-filter" v-model="filters.date" />
              <label for="date-filter">Course</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="date-filter" v-model="filters.date" />
              <label for="date-filter">Research Paper</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="date-filter" v-model="filters.date" />
              <label for="date-filter">Date</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th><input type="checkbox" /></th>
            <th>
              Name
              <img
                src="assets/static-images/arrow-down.png"
                alt="User Icon"
                class="arrow-down"
              />
            </th>
            <th>
              Email
              <img
                src="assets/static-images/arrow-down.png"
                alt="User Icon"
                class="arrow-down"
              />
            </th>
            <th>
              Course
              <img
                src="assets/static-images/arrow-down.png"
                alt="User Icon"
                class="arrow-down"
              />
            </th>
            <th>
              Research Paper Request
              <img
                src="assets/static-images/arrow-down.png"
                alt="User Icon"
                class="arrow-down"
              />
            </th>
            <th>
              Date Request
              <img
                src="assets/static-images/arrow-down.png"
                alt="User Icon"
                class="arrow-down"
              />
            </th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td><input type="checkbox" /></td>
            <td class="name-column">{{ row.name }}</td>
            <td class="email-column">{{ row.email }}</td>
            <td class="course-column">{{ row.course }}</td>
            <td class="paper-request-column scrollable">
              {{ row.paperRequest }}
            </td>
            <td class="date-request-column">{{ row.dateRequest }}</td>
            <td class="actions-column">
              <button class="action-btn">
                <img
                  src="assets/static-images/file-check.png"
                  alt="Approved"
                  class="action-icon"
                />
              </button>
              <button class="action-btn">
                <img
                  src="assets/static-images/bin.png"
                  alt="Delete"
                  class="action-icon"
                />
              </button>
            </td>
            <td class="status-column">
              <img
                v-if="row.status === 'pending'"
                src="assets/static-images/pending.png"
                alt="Pending Icon"
                class="status-icon"
              />
              <img
                v-else-if="row.status === 'approved'"
                src="assets/static-images/approved.png"
                alt="Approved Icon"
                class="status-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-between align-items-center">
        <span>Showing 1 of 50000 pages</span>
        <div class="pagination">
          <button class="btn btn-outline-secondary">Prev</button>
          <button class="btn btn-outline-secondary">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineMdMenu from "~/assets/svg-images/LineMdMenu.vue";
import { ref, onMounted } from "vue";

const showFilter = ref(false);
const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};

const closeFilter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    showFilter.value &&
    !target.closest(".filter-dropdown") &&
    !target.closest(".custom-btn")
  ) {
    showFilter.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeFilter);
});

const filters = {
  name: false,
  date: false,
};

const tableData = [
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "EE",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "pending",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "CpE",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "approved",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "ME",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "pending",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "CE",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "pending",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "Arch",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "approved",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "EE",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "approved",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "CpE",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "pending",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "ME",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "pending",
  },
  {
    name: "Chang Chong",
    email: "ching@gmail.com",
    course: "CpE",
    paperRequest: "The Founder of Lorem Ipsum The Founder of Lorem Ipsum",
    dateRequest: "09/10/2024",
    status: "approved",
  },
];
</script>

<style scoped>
.header {
  background-color: #b70536;
  padding: 10px;
  color: white;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
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

.menu-icon {
  margin-right: 10px;
  cursor: pointer;
}

.search-bar {
  padding-left: 40px;
  width: 50%;
  border-radius: 8px;
  border: 1.5px solid #ced4da;
}

.search-bar::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
}

.filter-icon {
  width: 25px;
  height: 25px;
  display: block;
  margin: auto;
}

.custom-btn {
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.375rem 0.75rem;
  margin-left: 5px;
  border: 1.5px solid #ced4da;
}

.table th,
.table td {
  vertical-align: middle;
}

.pagination {
  display: flex;
  gap: 0.5rem;
}

.name-column,
.email-column,
.course-column,
.paper-request-column {
  padding-left: 7px;
  padding-right: 20px;
}

.date-request-column {
  padding-left: 20px;
  padding-right: 15px;
}

.scrollable {
  max-width: 100px;
  overflow-x: auto;
}

.actions-column {
  padding-left: 14px;
  padding-right: 15px;
}

.action-icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 8px;
}

.actions-column .action-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

/* Animations - Action Column */
@keyframes scale-up {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
  }
}

@keyframes scale-down {
  from {
    transform: scale(1.3);
  }
  to {
    transform: scale(1);
  }
}

.actions-column .action-btn:hover .action-icon {
  animation: scale-up 0.3s ease-in-out forwards;
}

.actions-column .action-btn:not(:hover) .action-icon {
  animation: scale-down 0.3s ease-in-out forwards;
}
/* Animations - Action Column */

.status-icon {
  width: 3rem;
  height: 3rem;
  margin-right: -1px;
}

.arrow-down {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 8px;
  vertical-align: middle;
}

.custom-btn:hover .filter-icon {
  filter: brightness(0) invert(1);
}

.filter-dropdown {
  position: absolute;
  top: 110%;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ced4da;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-left: 328px;
}

.filter-option {
  margin-bottom: 8px;
}

.filter-option label {
  color: #6b6b6b;
}

.filter-dropdown input[type="checkbox"] {
  margin-right: 15px;
}

.table {
  position: relative;
  z-index: 1;
}
</style>
