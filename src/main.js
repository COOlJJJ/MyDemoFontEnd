import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import VCharts from 'v-charts'
Vue.use(VCharts)
Vue.use(dataV)

 

//导入全局样式表
import './assets/css/global.css'
//配置请求根路径
axios.defaults.baseURL = 'http://localhost:5000/api/'

// axios请求拦截器添加Token 做请求头做预处理
axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token验证的Authorization字段 
  config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('Token')
  //返回config
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
