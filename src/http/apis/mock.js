import Mock from 'mockjs'
import { getEmployeeData } from './mockServerData/employee'

// 定義 Mock 請求攔截
Mock.mock('/api/home/getData', getEmployeeData)
