import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 动态路由引入
const importRoutesAll = routesContext => {
  let list = []
  routesContext.keys().forEach(key => {
    list = list.concat(routesContext(key).default)
  })
  return list
}
const routes = importRoutesAll(require.context('./', false, /\.routes\.js$/))

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  store.dispatch('base/RESET_LOADING')
  next()
})

export default router
