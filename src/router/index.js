import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/Users.vue'
import Rgihts from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import DashBoard from '../components/DashBoard/Index.vue'
import Report from '../components/Report/Report.vue'
import Excel from '../components/Tools/Excel.vue'
import PersonSetting from '../components/users/PersonSetting.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },//新增路由规则,当用户访问login这个地址指定要展示的组件
  {
    path: '/Home',
    component: Home,
    redirect: '/welcome',
    children: [//子路由规则
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/Permission', component: Rgihts },
      { path: '/Role', component: Roles },
      { path: '/DashBoard', component: DashBoard },
      { path: '/Report', component: Report },
      { path: '/Excel', component: Excel },
      { path: '/PersonSetting', component: PersonSetting },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数 表示放行
  // next() 放行 next('/login')强制跳转
  if (to.path === '/login') return next();
  // 获取Token
  const tokenstr = window.localStorage.getItem('Token')//根据键拿值
  if (!tokenstr) return next('/login')
  next()
})

export default router
