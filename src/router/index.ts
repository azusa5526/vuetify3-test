// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		component: () => import('@/layouts/LayoutPrimary.vue'),
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('@/views/home/Home.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
