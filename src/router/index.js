import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import ProductListPage from '../views/ProductListPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import ProductManagePage from '../views/ProductManagePage.vue';
import AddProductPage from '../views/AddProductPage.vue';
import AddShopPage from '../views/AddShopPage.vue';
import ShopManagePage from '../views/ShopManagePage.vue';
import AddCategoryPage from '../views/AddCategoryPage.vue';
import CategoryManagePage from '../views/CategoryManagePage.vue';

import { Auth } from 'aws-amplify';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },  
  {
    path: '/product-list',
    name: 'ProductListPage',
    component: ProductListPage
  },
  {
    path: '/product-detail/:id',
    name: 'product-detail',
    component: ProductDetailPage
  },
  {
    path: '/product-manage',
    name: 'ProductManagePage',
    component: ProductManagePage
  },
  {
    path: '/add-product/:id',
    name: 'AddProductPage',
    component: AddProductPage
  },
  {
    path: '/add-shop/:id',
    name: 'AddShopPage',
    component: AddShopPage
  },
  {
    path: '/shop-manage',
    name: 'ShopManagePage',
    component: ShopManagePage
  },
  {
    path: '/category-manage',
    name: 'CategoryManagePage',
    component: CategoryManagePage
  },
  {
    path: '/add-category/:id',
    name: 'AddCategoryPage',
    component: AddCategoryPage
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
