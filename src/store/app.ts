import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAppStore = defineStore('app', () => {
	const count = ref(2);
	const doubleCount = computed(() => count.value * 2);
	function increment() {
		count.value++;
	}

	return { count, doubleCount, increment };
});
