import Mock from 'mockjs'
import employee from './mockServerData/employee'
import permission from './mockServerData/permission'

// 定義 Mock 請求攔截
Mock.mock('/api/home/getData', employee.getEmployeeData)
Mock.mock('/api/permission/getMenu', 'post', permission.getMenuData)
