export class PageOpts {
  pageNum = 1
  pageSize = 20
}

export class ResponseData<T> {
  code!: number
  data!: T | T[]
  message?: string
  token?: string
}
