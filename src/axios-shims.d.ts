import { AxiosRequestConfig } from 'axios'
import { ResponseData } from './model/common'

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>>
    request<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>>
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>
  }
}
