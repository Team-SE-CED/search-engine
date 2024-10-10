<template>
    <input class="form-control form-control-lg pl-5 search-input" type="text" name="search" placeholder="Search..."
        autocomplete="off" v-model="searchQuery" @input="emitInput" @focus="emitFocus" @keydown.enter="emitEnter" />
</template>

<script setup lang="ts">
import "../assets/global_style1/bootstrap.min.css";

const props = defineProps({
    searchQuery: String
})

const emit = defineEmits(["input", "focus", "enter"])

const searchQuery = ref(props.searchQuery);

const emitInput = () => {
    emit('input', searchQuery.value);
};

const emitFocus = () => {
    emit('focus');
};

const emitEnter = () => {
    emit('enter');
};
</script>

<style scoped>
.form-control {
    border-color: gray;
    border-radius: 50px;
    height: 80px;
}
</style>