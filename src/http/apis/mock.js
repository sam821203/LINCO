import Mock from 'mockjs'
import { getEmployeeData } from './mockServerData/employee'
import permission from './mockServerData/permission'

// 定義 Mock 請求攔截
Mock.mock('/api/home/getData', getEmployeeData)

Mock.mock('/api/permission/getMenu', 'post', permission.getMenuData)
// Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenuData)
