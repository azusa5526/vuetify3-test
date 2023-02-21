/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Components
import App from './App.vue';
import SvgIcon from '@/components/SvgIcon.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// Vite svg sprite
import 'virtual:svg-sprite';

// nav-guard
import '@/router/nav-guard';

import rules from '@vee-validate/rules';
import { defineRule, configure } from 'vee-validate';
import { setLocale, localize } from '@vee-validate/i18n';
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json';

// Add all rules in vee-validate
Object.keys(rules).forEach((rule) => {
	defineRule(rule, rules[rule]);
});

// Set vee-validate message to zh-TW
configure({
	generateMessage: localize({
		tw,
	}),
});
setLocale('tw');

const app = createApp(App);

registerPlugins(app);

app.component('svg-icon', SvgIcon);

// Import tailwind css after vuetify add in app can override vuetify style.
import '@/styles/style.css';

app.mount('#app');
