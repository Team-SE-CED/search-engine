<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'LineMdArrowLeft',
});
</script>
<template>
	<svg xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	class="btn-icon" 
	>
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12h-17.5">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="20;0" />
			</path>
			<path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12l7 7M3 12l7 -7">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.6s" values="12;0" />
			</path>
		</g>
	</svg>
</template>

<style scoped>
.btn-icon {
  margin-left: -30px; 
  display: inline-block; 
  vertical-align: middle; 
  width: 20px;  
  height: 20px;
}
</style>
