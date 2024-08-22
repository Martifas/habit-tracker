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
      beforeEnter: (to, from, next) => {
        const dateParam = to.params.date;
        if (dateParam) {
          const inputDate = new Date(dateParam);
          const today = new Date();

          if (Number.isNaN(inputDate.getTime())) {
            // Invalid date format
            next({ name: 'home' });
          } else if (inputDate > today) {
            // Future date
            next({ name: 'home' });
          } else {
            // Valid date
            next();
          }
        } else {
          // No date parameter, allow navigation
          next();
        }
      },
    },
  ],
});

export default router;
