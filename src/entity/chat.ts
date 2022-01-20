import { IUser } from './user'

export interface IChat {
  _id: string
  form: IUser
  to: IUser
  unread: number
  show: boolean
  newMsg: string
}
