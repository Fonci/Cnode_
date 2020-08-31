// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'; //element-ui
import 'element-ui/lib/theme-chalk/index.css';
import './assets/reset.css' //reset.css
import './utils/flexible' //flexible

Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://cnodejs.org/api/v1' //请求地址


Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})