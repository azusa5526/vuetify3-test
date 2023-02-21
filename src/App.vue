<template>
	<v-app>
		<v-app-bar>
			<v-app-bar-title>
				<v-icon icon="mdi-circle-slice-4" />

				App foobar
			</v-app-bar-title>
		</v-app-bar>

		<router-view />
	</v-app>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
