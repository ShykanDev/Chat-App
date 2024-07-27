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
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/Login/LoginView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/create-account',
    name: 'createAccount',
    component: () => import(/* webpackChunkName: "createAccount" */ '../views/Login/CreateAccountView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: ()=> import(/* webpackChunkName: "NotFound" */ '../views/Error/404View.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import(/* webpackChunkName: "forgotPassword" */ '../views/Login/ForgotPasswordView.vue'),
    meta: {
      requiresAuth: false
    }
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
