import type { BaseClient, MessageCallback } from '../types'

export interface DataPayload<T = any> {
  sender: string
  data: T
}

export type DataCallback<T = any> = MessageCallback<DataPayload<T>>

export interface QueryRangeParams {
  query: string
  start: number
  end: number
  step: number
}

export interface MetricsResultItem {
  metric: {
    __name__: string
    [key: string]: string
  }
  value?: [number, string]
  values?: [number, string][]
}

export interface MetricsResult {
  resultType: string
  result: MetricsResultItem[]
}

export function dataPlugin(client: BaseClient) {
  const data = {
    onData<T>(sender: string, callback: DataCallback<T>) {
      client.ws.on<DataPayload<T>>(`data::${sender}`, callback)
    },
    sendData<T>(data: T) {
      return client.ws.send<DataPayload<T>>(`data`, { sender: '', data })
    },
    query(promQL: string) {
      return client.http.get<MetricsResult>('/auth/vmdb/api/v1/query', { query: promQL })
    },
    queryRange(params: QueryRangeParams) {
      return client.http.get<MetricsResult>('/auth/vmdb/api/v1/query_range', params)
    },
  }

  return { data }
}
