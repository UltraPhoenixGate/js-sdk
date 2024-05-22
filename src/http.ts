import type { BaseClientOptions } from './sdk'

export interface R<T> {
  error?: string
  data?: T
}

export class HttpService {
  private baseUrl: string
  private token: string
  private debug: boolean

  constructor(opt: BaseClientOptions) {
    this.baseUrl = `${opt.baseUrl}`
    this.token = opt.token || ''
    this.debug = opt.debug || false
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(method: string, path: string, data?: any, opt?: RequestInit): Promise<T> {
    const headers = new Headers({
      Authorization: `Bearer ${this.token}`,
      ...opt?.headers,
    })

    if (['POST', 'PUT'].includes(method))
      headers.set('Content-Type', 'application/json')

    const url = new URL(this.baseUrl + path)
    this.debug && console.log(`🚀 [HTTP] ${method} ${url.toString()}`)
    let body

    if (method === 'GET' || method === 'DELETE') {
      if (data) {
        Object.keys(data).forEach((key) => {
          if (data[key] === undefined)
            delete data[key]
          else if (data[key] instanceof Date)
            data[key] = data[key].toISOString()
        })
        url.search = new URLSearchParams(data).toString()
      }
    }
    else {
      body = JSON.stringify(data)
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
      ...opt,
    })

    const res = await response.json() as R<T>
    if (res.error)
      throw new Error(res.error)

    return res.data as T
  }

  get<T>(path: string, data?: Record<string, any>, opt?: RequestInit): Promise<T> {
    return this.request<T>('GET', path, data, opt)
  }

  post<T>(path: string, data: any, opt?: RequestInit): Promise<T> {
    return this.request<T>('POST', path, data, opt)
  }

  put<T>(path: string, data: any, opt?: RequestInit): Promise<T> {
    return this.request<T>('PUT', path, data, opt)
  }

  delete<T>(path: string, data?: Record<string, any>, opt?: RequestInit): Promise<T> {
    return this.request<T>('DELETE', path, data, opt)
  }
}
