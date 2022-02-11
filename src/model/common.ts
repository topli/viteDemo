export type PageSize = 10 | 20 | 50 | 100

export class PageOpts {
  constructor(public pageNum: number = 1, public pageSize: PageSize = 20) {}
}

export class ResponseData<T> {
  code!: number
  data!: T
  message?: string
  token?: string
}
