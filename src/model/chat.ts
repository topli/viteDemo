import AR from '@/libs/axiosRequest'
import { User } from './user'

export class Chat {
  _id!: string
  form!: User
  to!: User
  unread?: number
  show?: boolean
  newMsg?: string

  static getList() {
    return AR.get('/api/chat/list')
  }
}
