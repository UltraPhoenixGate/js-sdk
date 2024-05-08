import type { BaseClientOptions } from './sdk'

export interface R<T> {
  error?: string
  data?: T
}

export class HttpService {
  private baseUrl: string
  private token: string

  constructor(opt: BaseClientOptions) {
    this.baseUrl = opt.baseUrl
    this.token = opt.token || ''
  }

  setToken(token: string) {
    this.token = token
  }

  async get<T>(path: string, data?: Record<string, any>, opt?: RequestInit): Promise<R<T>> {
    for (const key in data) {
      if (data[key] === undefined)
        delete data[key]

      // date to string
      if (data[key] instanceof Date)
        data[key] = data[key].toISOString()
    }
    const url = new URL(`${this.baseUrl + path}?${new URLSearchParams(data).toString()}`)

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      ...opt,
    })
    return response.json() as Promise<R<T>>
  }

  async post<T>(path: string, data: any, opt?: RequestInit): Promise<R<T>> {
    const response = await fetch(this.baseUrl + path, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...opt,
    })
    return response.json() as Promise<R<T>>
  }

  async put<T>(path: string, data: any, opt?: RequestInit): Promise<R<T>> {
    const response = await fetch(this.baseUrl + path, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...opt,
    })
    return response.json() as Promise<R<T>>
  }

  async delete<T>(path: string, data?: Record<string, any>, opt?: RequestInit): Promise<R<T>> {
    const url = new URL(`${this.baseUrl + path}?${new URLSearchParams(data).toString()}`)

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      ...opt,
    })
    return response.json() as Promise<R<T>>
  }
}
