import AR from '@/libs/axiosRequest'
import { User } from './user'

export class Chat {
  _id!: string
  members?: Array<User | string>
  type?: 'session' | 'group' | 'robot'
  from?: User
  to?: User
  unread = 0
  show?: boolean
  newMsg?: string
  newTime?: number

  static getList() {
    return AR.get('/api/chat/list')
  }

  static generate(data: Chat) {
    return AR.post('/api/chat/generate', data)
  }
}
