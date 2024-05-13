import { HttpService } from './http'
import type { BaseClient, Plugin } from './types'
import { WebSocketService } from './ws'

export interface BaseClientOptions {
  baseUrl: string
  token?: string
  debug?: boolean
}

export interface BaseClientOptions {
  baseUrl: string
  token?: string
}

export function createBaseSdkClient(opt: BaseClientOptions): BaseClient {
  const ws = new WebSocketService(opt)
  const http = new HttpService(opt)

  const hubClient: BaseClient = {
    setToken(t: string) {
      ws.setToken(t)
      http.setToken(t)
    },
    ws,
    http,
    use(plugin: Plugin) {
      return Object.assign(this, plugin(this))
    },
  }

  return hubClient
}

export class ClientWithPlugins<T extends BaseClient> {
  constructor(private client: T) {}

  use<U>(plugin: (client: T) => U): ClientWithPlugins<T & U> {
    const pluginResult = plugin(this.client)
    this.client = { ...this.client, ...pluginResult } as T & U
    return this as unknown as ClientWithPlugins<T & U>
  }

  build() {
    return this.client
  }
}
