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
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = aws_exports.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = aws_exports.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...aws_exports,
  oauth: {
    ...aws_exports.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);
//Amplify.configure(aws_exports);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')