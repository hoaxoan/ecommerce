import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth/auth.js';
import { users } from './users/users.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {   
    auth,
    users
  }
})
