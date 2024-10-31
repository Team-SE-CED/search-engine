<template>
  <div style="margin-top: 120px">
    <div class="container mt-4">
      <div
        class="row mb-4 justify-content-center"
        v-for="(form, index) in forms"
        :key="index"
      >
        <div class="col-md-6 mb-4">
          <form
            class="border p-4 rounded"
            style="max-width: 100%; overflow-y: auto"
          >
            <div class="row mb-3">
              <div class="col-3 d-flex align-items-center">
                <div
                  class="img-placeholder bg-dark border"
                  style="width: 200px; height: 100px"
                >
                  <img
                    src="assets/static-images/bear.png"
                    alt="Placeholder"
                    class="img-fluid"
                  />
                </div>
              </div>

              <div class="col-9">
                <div class="row mb-3">
                  <div class="col">
                    <input
                      type="date"
                      class="form-control"
                      v-model="form.date"
                      placeholder="Date"
                    />
                  </div>

                  <div class="col-auto">
                    <img
                      src="assets/static-images/delete.png"
                      alt="Custom Icon"
                      class="icon-button"
                      @click="removeForm(index)"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.title"
                      placeholder="Title"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              v-for="(author, authorIndex) in form.authors"
              :key="authorIndex"
              class="row mb-3 author-course-row"
            >
              <div class="col-7">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.authors[authorIndex]"
                  placeholder="Author"
                />
              </div>
              <div class="col-5">
                <select class="form-select" v-model="form.courses[authorIndex]">
                  <option value="alpha">Alpha</option>
                  <option value="bravo">Bravo</option>
                  <option value="charlie">Charlie</option>
                </select>
              </div>
              <div class="col-auto">
                <div
                  class="fixed-button fixed-button-1"
                  @click="removeAuthor(form, authorIndex)"
                >
                  <div class="icon-box">
                    <img
                      src="assets/static-images/person-delete.png"
                      alt="Remove Author"
                      class="icon-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="fixed-button fixed-button-2" @click="addAuthorCourse(form)">
          <div class="icon-box">
            <img
              src="assets/static-images/person-add.png"
              alt="Button Icon 2"
              class="icon-img"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-button fixed-button-3">
      <div class="icon-box">
        <img
          src="assets/static-images/save.png"
          alt="Button Icon 3"
          class="icon-img"
        />
      </div>
    </div>
    <div class="fixed-button fixed-button-4" @click="addForm">
      <div class="icon-box">
        <img
          src="assets/static-images/plus.png"
          alt="Button Icon 4"
          class="icon-img"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const forms = reactive([
  {
    date: "",
    title: "",
    authors: [""],
    courses: [""],
  },
]);

const addForm = () => {
  forms.push({ date: "", title: "", authors: [""], courses: [""] });
};

const removeForm = (index) => {
  forms.splice(index, 1);
};

const addAuthorCourse = (form) => {
  form.authors.push("");
  form.courses.push("");
};

const removeAuthor = (form, authorIndex) => {
  if (form.authors.length > 0) {
    form.authors.splice(authorIndex, 1);
    form.courses.splice(authorIndex, 1);
  }
};
</script>

<style scoped>
.container {
  max-width: 2000px;
}

form {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.icon-button {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.img-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

form::-webkit-scrollbar {
  width: 10px;
}

form::-webkit-scrollbar-thumb {
  background-color: #a94442;
  border-radius: 5px;
}

.fixed-button {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
}

.fixed-button-1 {
  bottom: 75px;
  right: 40px;
}

.fixed-button-2 {
  bottom: 140px;
  right: 52px;
}

.fixed-button-3 {
  bottom: 205px;
  right: 40px;
}

.fixed-button-4 {
  bottom: 270px;
  right: 40px;
}

.icon-box {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #ced4da;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.icon-box:hover {
  background-color: #6d757c;
}

.icon-img {
  width: 30px;
  height: 30px;
}

.icon-box:hover .icon-img {
  filter: brightness(0) invert(1);
}
</style>
