import Vue from 'vue';
import './plugins/axios'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementui)
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next();
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
