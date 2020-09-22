import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { userAuth } from './firebase'
import { rtdbPlugin } from 'vuefire'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus, faPlus, faMinus, faPhone, faShoppingCart,
  faEnvelope, faMapMarkerAlt, faTruck, faUtensils, faCheese, faTrash  } from '@fortawesome/free-solid-svg-icons'
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCartPlus, faPlus, faMinus, faPhone, faShoppingCart, faEnvelope, faMapMarkerAlt,
  faTruck, faUtensils, faCheese, faInstagramSquare, faTrash )
 
Vue.component('fa-icon', FontAwesomeIcon)

Vue.use(rtdbPlugin)

userAuth.onAuthStateChanged(user => {
  store.dispatch('user/fetchUser', user);
});


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
