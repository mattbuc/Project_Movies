import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Inclure jQuery, Popper.js, Bootstrap avant l'application Vue
import './assets/js/jquery.min.js';
// import './assets/js/popper.js';
import './assets/js/bootstrap.min.js';
import './assets/js/main.js';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');