import WebSocket from 'isomorphic-ws'
import type { BaseClientOptions } from './sdk'
import type { MessageCallback } from './types'

export class WebSocketService {
  private ws: WebSocket | null = null
  private connectHandler: () => void = () => {}
  private disconnectHandler: () => void = () => {}
  private onConnectError: (error: WebSocket.ErrorEvent) => void = () => {}
  private debug = false

  constructor(private opt: BaseClientOptions) {
    this.reconnect()
    this.debug = opt.debug || false
  }

  private topics = new Map<string, MessageCallback[]>()

  private reconnect() {
    this.ws = new WebSocket(`${this.opt.baseUrl}/auth/ws`, {
      headers: {
        Authorization: `Bearer ${this.opt.token || ''}`,
      },
    })

    this.ws.onopen = () => {
      console.log('WebSocket connection established')
      this.connectHandler()
    }

    this.ws.onclose = () => {
      console.log('WebSocket connection closed')
      this.disconnectHandler()
      setTimeout(() => {
        console.log('Reconnecting...')
        this.reconnect()
      }, 1000)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.onConnectError(error)
    }

    this.ws.onmessage = (message) => {
      // 这里处理接收到的消息
      console.log('Received:', message.data)
      const { topic, payload } = JSON.parse(message.data.toString())
      const callbacks = this.topics.get(topic) || []
      callbacks.forEach(callback => callback(payload))
    }
  }

  on<T>(topic: string, callback: MessageCallback<T>) {
    const callbacks = this.topics.get(topic) || []
    callbacks.push(callback)
    this.topics.set(topic, callbacks)
  }

  send<T>(topic: string, payload: T) {
    if (!this.ws)
      throw new Error('WebSocket connection is not established')

    if (this.ws.readyState !== this.ws.OPEN)
      throw new Error('WebSocket connection is not established')

    return new Promise<void>((resolve, reject) => {
      this.ws?.send(JSON.stringify({ topic, payload }), (err) => {
        if (err) {
          this.debug && console.error('🚀 [WS] send error', err)
          reject(err)
        }
        else {
          this.debug && console.log('🚀 [WS] send', topic, payload)
          resolve()
        }
      })
    })
  }

  setToken(t: string) {
    this.opt.token = t
    this.ws = new WebSocket(this.opt.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.opt.token || ''}`,
      },
    })
  }

  get isReady() {
    if (!this.ws)
      return false
    return this.ws.readyState === this.ws.OPEN
  }

  get status() {
    if (!this.ws)
      return 'error'

    switch (this.ws.readyState) {
      case this.ws.CONNECTING:
        return 'connecting'
      case this.ws.OPEN:
        return 'connected'
      case this.ws.CLOSED:
        return 'closed'
      default:
        return 'error'
    }
  }

  onDisconnect(callback: any) {
    this.disconnectHandler = callback
  }

  onConnect(callback: any) {
    this.connectHandler = callback
  }

  onError(callback: any) {
    this.onConnectError = callback
  }
}
