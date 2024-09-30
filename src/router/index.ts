import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CalendarIndex from '../components/calendar/CalendarIndex.vue';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function isValidDateFormat(dateString: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
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
      const today = new Date();
      const formattedToday = formatDate(today);

      if (dateParam) {
        if (!isValidDateFormat(dateParam)) {
          next({
            name: 'day',
            params: { date: formattedToday },
            query: { error: 'invalid' },
          });
          return;
        }

        const inputDate = new Date(dateParam);

        if (Number.isNaN(inputDate.getTime())) {
          next({
            name: 'day',
            params: { date: formattedToday },
            query: { error: 'invalid' },
          });
        } else if (inputDate > today) {
          next({
            name: 'day',
            params: { date: formattedToday },
            query: { error: 'future' },
          });
        } else {
          next();
        }
      } else {
        next({ name: 'day', params: { date: formattedToday } });
      }
    },
  },
  {
    path: '/:date(\\d{4}-\\d{2}-\\d{2})',
    redirect: (to) => ({ name: 'day', params: { date: to.params.date } }),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const today = new Date();
      return {
        name: 'day',
        params: { date: formatDate(today) },
        query: { error: 'invalid' },
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
