// 引入專案中全部的組件
import SvgIcons from './SvgIcons/index.vue'
import Pagination from './Pagination/index.vue'

// 全域物件
const allGlobalComponents = { SvgIcons, Pagination }

export default {
  // 這裡一定要叫做 install，且會把 app 實例帶入
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      // 註冊為全局組件
      app.component(key, allGlobalComponents[key])
    })
  }
}
