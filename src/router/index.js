import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import ProductListPage from '../views/ProductListPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import ProductManagePage from '../views/ProductManagePage.vue';
import AddProductPage from '../views/AddProductPage.vue';
import { Auth } from 'aws-amplify';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/product-list',
    name: 'ProductListPage',
    component: ProductListPage
  },
  {
    path: '/product-detail',
    name: 'ProductDetailPage',
    component: ProductDetailPage
  },
  {
    path: '/product-magage',
    name: 'ProductManagePage',
    component: ProductManagePage
  },
  {
    path: '/add-product',
    name: 'AddProductPage',
    component: AddProductPage
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next()
  }

})

export default router
