import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'
import MyTasks from './views/MyTasks.vue'
import Team from './views/Team.vue'
import Login from './views/Login.vue'
import Firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-tasks',
      name: 'mytasks',
      component: MyTasks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/team',
      name: 'team',
      component: Team,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach( (to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (!requiresAuth && currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;