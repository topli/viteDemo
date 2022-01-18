import Axios from '@/libs/request'
import { AxiosResponse } from 'axios'
//封装Relation类型的接口方法
export class RelationService {
  /**
   * @description 查询关系表
   * @param {string} userid - 需要查询的用户id
   * @return {HttpResponse} result
   */
  static async getList(): Promise<AxiosResponse> {
    return Axios('/api/relation/list', {
      method: 'get'
    })
  }
  /**
   * @description 保存关系
   * @param {string} userId - 用户id
   * @param {string} friendId - 好友id
   * @return {HttpResponse} result
   */
  static async save(userId: string, friendId: string): Promise<AxiosResponse> {
    return Axios('/api/relation/save', {
      method: 'post',
      data: {
        userId,
        friendId
      }
    })
  }
}
