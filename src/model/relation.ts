import AR from '@/libs/axiosRequest'

export class Relation {
  /**
   * 获取当前用户关系
   * @returns Promise<ResponseData>
   */
  static getAll() {
    return AR.get('/api/relation/list')
  }
  static save(data: { userId: string; friendId: string }) {
    return AR.post('/api/relation/save', data)
  }
}
