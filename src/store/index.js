import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth/auth.js';
import { users } from './users/users.js';
import { categories } from './categories/categories.js';
import { products } from './products/products.js';
import { shops } from './shops/shops.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {   
    auth,
    users,
    categories,
    products,
    shops
  }
})
