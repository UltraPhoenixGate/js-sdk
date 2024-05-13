import type { BaseClient, MessageCallback } from '../types'

export interface DataPayload<T = any> {
  sender: string
  data: T
}

export type DataCallback<T = any> = MessageCallback<DataPayload<T>>

export function dataPlugin(client: BaseClient) {
  const data = {
    onData<T>(sender: string, callback: DataCallback<T>) {
      client.ws.on<DataPayload<T>>(`data::${sender}`, callback)
    },
    sendData<T>(data: T) {
      return client.ws.send<DataPayload<T>>(`data`, { sender: '', data })
    },
  }

  return { data }
}
