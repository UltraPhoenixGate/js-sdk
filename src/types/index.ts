import type { WebSocketService } from '@/ws'
import type { HttpService } from '@/http'

export * from './client'
export * from './alert'
export * from './shared'
export * from './camera'
export * from './system'

/**
 * Represents a HubClient.
 */
export interface BaseClient {
  setToken: (token: string) => void
  setBaseUrl: (baseUrl: string) => void
  /**
   * The WebSocket instance used by the HubClient.
   */
  ws: WebSocketService
  http: HttpService
  /**
   * Applies a plugin to the HubClient.
   * @param plugin - The plugin function to apply.
   * @returns A new HubClient instance with the applied plugin.
   */
  use: (plugin: Plugin) => this
  cleanup: () => void
}

export interface Message<T = any> {
  topic: string
  payload: T
}

/**
 * Represents a callback function for handling messages.
 * @template T The type of the message payload.
 * @param message The message object to be handled.
 */
export type MessageCallback<T = any> = (message: Message<T>) => void

export type Plugin = (client: BaseClient) => any
