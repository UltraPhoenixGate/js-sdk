import type { WebSocketService } from '@/ws'
import type { HttpService } from '@/http'

export * from './client'
export * from './alert'

/**
 * Represents a HubClient.
 */
export interface BaseClient {
  setToken: (token: string) => void
  /**
   * The WebSocket instance used by the HubClient.
   */
  ws: WebSocketService
  http: HttpService
  /**
   * Registers a callback function to be called when a message is received on the specified topic.
   * @param topic - The topic to listen for.
   * @param callback - The callback function to be called.
   */
  on: <T>(topic: string, callback: MessageCallback<T>) => void

  /**
   * Sends a message with the specified payload on the specified topic.
   * @param topic - The topic to send the message to.
   * @param payload - The payload of the message.
   */
  send: <T>(topic: string, payload: T) => void

  /**
   * Applies a plugin to the HubClient.
   * @param plugin - The plugin function to apply.
   * @returns A new HubClient instance with the applied plugin.
   */
  use: (plugin: Plugin) => this
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
