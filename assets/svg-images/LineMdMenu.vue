<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'LineMdMenu',
});
</script>
<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path d="M5 5h14">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="16;0" />
			</path>
			<path d="M5 12h14">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.6s" values="16;0" />
			</path>
			<path d="M5 19h14">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.6s" values="16;0" />
			</path>
		</g>
	</svg>
</template>
