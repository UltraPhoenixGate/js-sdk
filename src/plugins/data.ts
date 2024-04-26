import type { HubClient, MessageCallback } from '../types'

export interface DataPayload<T = any> {
  sender: string
  data: T
}

export type DataCallback<T = any> = MessageCallback<DataPayload<T>>

export function dataPlugin(client: HubClient) {
  return {
    onData<T>(sender: string, callback: DataCallback<T>) {
      client.on<DataPayload<T>>(`data::${sender}`, callback)
    },
    sendData<T>(sender: string, data: T) {
      client.send<DataPayload<T>>(`data::${sender}`, { sender, data })
    },
  }
}
