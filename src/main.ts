import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import 'v-calendar/dist/style.css';
import './index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VCalendar, {});

app.mount('#app');
