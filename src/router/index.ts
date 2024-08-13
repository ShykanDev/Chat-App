import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { UseUserValues } from '@/store/UserValuesStore'

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
  },
  {
    path:'/chat/:recipientName',
    name:'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/chats/CurrentChatView.vue'),
    props: route => ({currentUserId: route.query.currentUserId, recipientName:route.query.recipientName})
  },
  // tempfirestore 
  {
    path: '/tempfirestore',
    name: 'tempfirestore',
    component: () => import(/* webpackChunkName: "tempfirestore" */ '../views/temp/TempFirestore.vue')
  }
]
 

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

const loginPaths = new Set(['createAccount', 'forgotPassword', 'login']); //paths used for login purposes 

router.beforeEach((to, from, next) => {
  const isAuth = UseUserValues().getIsAuth;
  const requiresAuth = to.meta.requiresAuth;
  if(requiresAuth && !isAuth) {
    next({name:'login'})
  }else if (isAuth && loginPaths.has(to.name as string) ){
    next({name:'home'})
  } else{
    next()
  }
})

export default router
