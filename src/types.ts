import type WebSocket from 'ws'
import type { WebSocketService } from './ws'
import type { HttpService } from './http'

/**
 * Represents a HubClient.
 */
export interface BaseClient {
  /**
   * Indicates whether the HubClient is ready.
   */
  isReady: boolean

  /**
   * The status of the HubClient.
   */
  status: 'connecting' | 'connected' | 'closed' | 'error'

  setToken: (token: string) => void

  /**
   * Registers a callback function to be called when the HubClient is disconnected.
   * @param callback - The callback function to be called.
   */
  onDisconnect: (callback: () => void) => void

  /**
   * Registers a callback function to be called when the HubClient is connected.
   * @param callback - The callback function to be called.
   */
  onConnect: (callback: () => void) => void

  /**
   * Registers a callback function to be called when an error occurs.
   * @param callback - The callback function to be called.
   */
  onError: (callback: (error: WebSocket.ErrorEvent) => void) => void

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

export interface BaseModel {
  id: string
  createdAt: string
  updatedAt: string
}
