import Axios from '@/libs/request'
import { AxiosResponse } from 'axios'

//封装User类型的接口方法
export class UserApi {
  /**
   * @description 查询User的信息
   * @param {number} teamId - 所要查询的团队ID
   * @return {HttpResponse} result
   */
  static async getUserInfo(): Promise<AxiosResponse> {
    return Axios('/api/user/info', {
      method: 'get'
    })
  }
  /**
   * @description 根据信息查询用户
   * @param {string} text - 查询文本
   * @return {HttpResponse} result
   */
  static async getUserByText(text: String): Promise<AxiosResponse> {
    return Axios('/api/user/search', {
      method: 'get',
      params: {
        text
      }
    })
  }
  /**
   * @description 查询User的信息
   * @param {string} id - 用户id
   * @return {HttpResponse} result
   */
  static async getInfoById(id: string): Promise<AxiosResponse> {
    return Axios('/api/user/infoById', {
      method: 'get',
      params: {
        id
      }
    })
  }
  /**
   * @description 查询关系
   * @param {string} id - 用户id
   * @return {HttpResponse} result
   */
  static async getRelation(id: string): Promise<AxiosResponse> {
    return Axios('/api/relation/search', {
      method: 'get',
      params: {
        id
      }
    })
  }
}
