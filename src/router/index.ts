import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/LoginView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: ()=> import(/* webpackChunkName: "NotFound" */ '../views/Error/404View.vue')
  }
]
 

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    next({name:'login'})
  }else{
    next()
  }
})

export default router
