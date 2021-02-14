import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import { BootstrapVue, ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import VueCompositionAPI from '@vue/composition-api'
import FeatherIcon from '@/components/FeatherIcon.vue'

// Global Components
import './assets/main.scss'

// import core styles
require('@/scss/core.scss')

// 3rd party plugins
Vue.use(PortalVue)

// Composition API
Vue.use(VueCompositionAPI)

// BSV Plugin Registration
Vue.use(BootstrapVue)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Component
Vue.component(FeatherIcon.name, FeatherIcon)

// Amplify Configure
Amplify.configure(aws_exports);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')