import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CalendarIndex from '../components/calendar/CalendarIndex.vue';
import ErrorView from '../views/ErrorView.vue';

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
      beforeEnter: (to, from, next) => {
        const dateParam = to.params.date;
        if (dateParam) {
          const currentDate = new Date();
          const routeDate = new Date(dateParam);

          if (routeDate > currentDate) {
            next({ name: 'error' });
          } else {
            next();
          }
        } else {
          next();
        }
      },
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
  ],
});

export default router;
