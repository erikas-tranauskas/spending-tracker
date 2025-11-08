import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@/styles/style.scss';
import '@/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).mount('#app');
