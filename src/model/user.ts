import AR from '@/libs/axiosRequest'
import { PageOpts } from './common'

export class User {
  _id!: string
  nickName?: string
  age?: number
  phone?: number
  account?: string
  weId?: string
  pinyin?: string
  avatar?: string

  static getById(id: string) {
    return AR.get<User>('/api/user/infoById', { params: { id } })
  }

  static getList(params: object, pages: PageOpts) {
    return AR.get<User[]>('/api/user/list', { params: Object.assign(params, pages) })
  }

  static save(data: User) {
    return AR.post<User>('/api/user/save', data)
  }

  static login(data: any) {
    return AR.post<User>('/api/user/login', data)
  }

  static getUserInfo() {
    return AR.get<User>('/api/user/getUserInfo')
  }

  static serachByText(text: string) {
    return AR.get<User[]>('/api/user/search', {
      params: {
        text
      }
    })
  }
}
