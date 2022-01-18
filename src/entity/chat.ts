export interface Chat {
  _id: string
  form: {
    id: string
    account: string
    displayName: string
  }
  to: {
    id: string
    account: string
    displayName: string
  }
  unread: number
  show: boolean
  newMsg: string
}
