import './assets/main.css';

import { createApp } from 'vue';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import 'v-calendar/dist/style.css';
import './index.css';

const app = createApp(App);

app.use(router);

app.mount('#app');

app.use(VCalendar, {});
