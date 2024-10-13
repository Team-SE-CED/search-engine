<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'LineMdLogout',
});
</script>
<template>
	<svg 
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="btn-icon" 
	>
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path stroke-dasharray="36" stroke-dashoffset="36" d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.75s" values="36;0" />
			</path>
			<path stroke-dasharray="14" stroke-dashoffset="14" d="M9 12h11.5">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.3s" values="14;0" />
			</path>
			<path stroke-dasharray="6" stroke-dashoffset="6" d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.3s" values="6;0" />
			</path>
		</g>
	</svg>
</template>

<style scoped>
.btn-icon {
  margin-right: -30px; 
  display: inline-block; 
  vertical-align: middle; 
  width: 20px;  
  height: 20px;
}
</style>
