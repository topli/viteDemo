import Axios from '@/libs/request'
import { AxiosResponse } from 'axios'
/**
 * @interface PageParams -分页
 * @property {string} pageSize - 分页条数
 * @property {string} pageNum - 页数
 */
// interface PageParams {
//   pageSize: number
//   pageNum: number
// }
//封装Chat类型的接口方法
export class ChatService {
  /**
   * @description 查询User的信息
   * @param {number} teamId - 所要查询的团队ID
   * @return {HttpResponse} result
   */
  static async getList(): Promise<AxiosResponse> {
    return Axios('/api/chat/list', {
      method: 'get'
    })
  }
}
