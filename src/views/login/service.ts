import Axios from '@/libs/request'
import { AxiosResponse } from 'axios'
/**
 * @interface loginParams -登录参数
 * @property {string} username -用户名
 * @property {string} password -用户密码
 */
interface LoginParams {
  u: string
  p: string
}
//封装User类型的接口方法
export class UserService {
  /**
   * @description 查询User的信息
   * @param {number} teamId - 所要查询的团队ID
   * @return {HttpResponse} result
   */
  static async login(data: LoginParams): Promise<AxiosResponse> {
    return Axios('/api/user/login', {
      method: 'post',
      data
    })
  }

  static async register(data: LoginParams): Promise<AxiosResponse> {
    return Axios('/api/user/register', {
      method: 'post',
      data
    })
  }
}
