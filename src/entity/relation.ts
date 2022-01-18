import { IUser } from './user'

export interface IRelation {
  _id: string
  linkToId: IUser
  linkFromId: IUser
}
