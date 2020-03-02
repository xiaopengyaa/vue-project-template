import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 动态store引入
const importStoreAll = storeContext => {
  const reg = /\.\/([\s\S]+)\.store\.js$/
  const storeObj = {}
  storeContext.keys().forEach(key => {
    const matchInfo = reg.exec(key)
    if (matchInfo) {
      const moduleName = matchInfo[1]
      storeObj[moduleName] = storeContext(key).default
    }
  })
  return storeObj
}
const modules = importStoreAll(
  require.context('./modules', false, /\.store\.js$/)
)

export default new Vuex.Store({
  modules
})
