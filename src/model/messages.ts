import AR from '@/libs/axiosRequest'
import { User } from './user'

export class Messages {
  sessionId!: string
  from!: User
  content?: string
  time!: number
  type!: string

  static getList(id: string) {
    return AR.get(`/api/messages/list?sessionId=${id}`)
  }
  static sendMessage(data: Messages) {
    return AR.post('/api/messages/send', data)
  }
}
