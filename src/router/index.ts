import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CalendarIndex from '../components/calendar/CalendarIndex.vue';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'day' },
  },
  {
    path: '/day/:date?',
    name: 'day',
    component: CalendarIndex,
    props: (route) => ({
      date: route.params.date,
      error: route.query.error,
    }),
    beforeEnter: (to, from, next) => {
      const dateParam = to.params.date as string | undefined;
      if (dateParam) {
        const inputDate = new Date(dateParam);
        const today = new Date();
        if (Number.isNaN(inputDate.getTime())) {
          // Invalid date format
          next({
            name: 'day',
            params: { date: formatDate(today) },
            query: { error: 'invalid' },
          });
        } else if (inputDate > today) {
          // Future date
          next({
            name: 'day',
            params: { date: formatDate(today) },
            query: { error: 'future' },
          });
        } else {
          // Valid date
          next();
        }
      } else {
        // No date parameter, redirect to today's date
        next({ name: 'day', params: { date: formatDate(new Date()) } });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
