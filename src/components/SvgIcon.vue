<template>
	<svg class="svg-icon">
		<use :xlink:href="`#${use}`"></use>
	</svg>
</template>

<script setup lang="ts">
defineProps({
	use: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
.svg-icon {
	fill: currentColor;
}
</style>
