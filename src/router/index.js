import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CalendarIndex from '../components/calendar/CalendarIndex.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/day/:date?',
      name: 'day',
      component: CalendarIndex,
      props: true,
    },
  ],
});

export default router;
